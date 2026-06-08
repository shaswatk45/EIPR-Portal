const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

// Helper to format a single quiz with questions
const formatQuiz = (quiz) => {
  if (!quiz) return null;
  return {
    ...quiz,
    _id: quiz.id,
    questions: quiz.questions ? quiz.questions.map(q => {
      let options = [];
      try {
        options = typeof q.options === 'string' ? JSON.parse(q.options) : (q.options || []);
      } catch (e) {
        options = [];
      }
      return {
        ...q,
        _id: q.id,
        options
      };
    }) : undefined
  };
};

// @route   GET /api/quiz
// @desc    List all quizzes (without questions for listing)
// @access  Protected
router.get('/', protect, async (req, res) => {
  try {
    const quizzes = await prisma.quiz.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    // Map to include _id for frontend compatibility
    const formatted = quizzes.map(q => ({
      ...q,
      _id: q.id
    }));
    
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/quiz/attempts/me
// @desc    Get current user's quiz attempts
// @access  Protected
router.get('/attempts/me', protect, async (req, res) => {
  try {
    const attempts = await prisma.quizAttempt.findMany({
      where: { userId: req.user.id },
      include: {
        quiz: {
          select: {
            title: true,
            category: true
          }
        }
      },
      orderBy: { attemptedAt: 'desc' }
    });

    const formatted = attempts.map(a => {
      let answers = [];
      try {
        answers = typeof a.answers === 'string' ? JSON.parse(a.answers) : (a.answers || []);
      } catch (e) {
        answers = [];
      }
      return {
        ...a,
        _id: a.id,
        answers,
        quizId: a.quiz ? { ...a.quiz, _id: a.quizId } : null
      };
    });

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/quiz/:id
// @desc    Get single quiz with questions
// @access  Protected
router.get('/:id', protect, async (req, res) => {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: req.params.id },
      include: { questions: true }
    });
    
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    
    res.json(formatQuiz(quiz));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/quiz
// @desc    Create a quiz [Admin]
// @access  Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const { title, category, description, questions } = req.body;

    const quiz = await prisma.quiz.create({
      data: {
        title,
        category,
        description: description || '',
        questions: {
          create: Array.isArray(questions) ? questions.map(q => ({
            questionText: q.questionText,
            options: Array.isArray(q.options) ? JSON.stringify(q.options) : JSON.stringify([]),
            correctAnswer: parseInt(q.correctAnswer, 10),
            explanation: q.explanation || ''
          })) : []
        }
      },
      include: { questions: true }
    });

    res.status(201).json(formatQuiz(quiz));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/quiz/:id
// @desc    Update a quiz [Admin]
// @access  Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const { title, category, description, questions } = req.body;

    const existing = await prisma.quiz.findUnique({
      where: { id: req.params.id }
    });
    if (!existing) return res.status(404).json({ message: 'Quiz not found' });

    // We do a transaction to delete all old questions and update/recreate questions
    const updated = await prisma.$transaction(async (tx) => {
      if (questions !== undefined) {
        // Delete all old questions
        await tx.question.deleteMany({
          where: { quizId: req.params.id }
        });
      }

      const updateData = {};
      if (title !== undefined) updateData.title = title;
      if (category !== undefined) updateData.category = category;
      if (description !== undefined) updateData.description = description;
      
      if (questions !== undefined && Array.isArray(questions)) {
        updateData.questions = {
          create: questions.map(q => ({
            questionText: q.questionText,
            options: Array.isArray(q.options) ? JSON.stringify(q.options) : JSON.stringify([]),
            correctAnswer: parseInt(q.correctAnswer, 10),
            explanation: q.explanation || ''
          }))
        };
      }

      return await tx.quiz.update({
        where: { id: req.params.id },
        data: updateData,
        include: { questions: true }
      });
    });

    res.json(formatQuiz(updated));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/quiz/:id
// @desc    Delete a quiz [Admin]
// @access  Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const existing = await prisma.quiz.findUnique({
      where: { id: req.params.id }
    });
    if (!existing) return res.status(404).json({ message: 'Quiz not found' });

    await prisma.quiz.delete({
      where: { id: req.params.id }
    });

    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/quiz/:id/attempt
// @desc    Submit a quiz attempt
// @access  Protected
router.post('/:id/attempt', protect, async (req, res) => {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: req.params.id },
      include: { questions: true }
    });
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    const { answers } = req.body; // Array of selected answer indices

    if (!answers || !Array.isArray(answers) || answers.length !== quiz.questions.length) {
      return res.status(400).json({ message: 'Please answer all questions' });
    }

    // Calculate score
    let score = 0;
    quiz.questions.forEach((q, idx) => {
      let parsedOptions = [];
      try {
        parsedOptions = typeof q.options === 'string' ? JSON.parse(q.options) : q.options;
      } catch (e) {
        parsedOptions = [];
      }
      if (answers[idx] === q.correctAnswer) {
        score++;
      }
    });

    const attempt = await prisma.quizAttempt.create({
      data: {
        userId: req.user.id,
        quizId: quiz.id,
        quizTitle: quiz.title,
        score,
        totalQuestions: quiz.questions.length,
        answers: JSON.stringify(answers)
      }
    });

    // Return detailed result
    const result = {
      score,
      totalQuestions: quiz.questions.length,
      percentage: Math.round((score / quiz.questions.length) * 100),
      attemptId: attempt.id,
      questions: quiz.questions.map((q, idx) => {
        let options = [];
        try {
          options = typeof q.options === 'string' ? JSON.parse(q.options) : q.options;
        } catch (e) {
          options = [];
        }
        return {
          questionText: q.questionText,
          options,
          correctAnswer: q.correctAnswer,
          selectedAnswer: answers[idx],
          isCorrect: answers[idx] === q.correctAnswer,
          explanation: q.explanation
        };
      })
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
