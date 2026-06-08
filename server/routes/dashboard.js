const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const { protect } = require('../middleware/auth');

// @route   GET /api/dashboard
// @desc    Get dashboard summary for current user
// @access  Protected
router.get('/', protect, async (req, res) => {
  try {
    const userId = req.user.id;

    // Total learning content
    const totalContent = await prisma.learningContent.count();

    // Completed content count
    const completedContent = await prisma.learningProgress.count({
      where: { userId }
    });

    // All quiz attempts
    const attempts = await prisma.quizAttempt.findMany({
      where: { userId },
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

    // Format attempts for mongoose compatibility
    const formattedAttempts = attempts.map(a => {
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

    // Best scores per quiz
    const quizScores = {};
    formattedAttempts.forEach((attempt) => {
      const qId = attempt.quizId?._id || attempt.quizId;
      if (qId) {
        if (!quizScores[qId] || attempt.score > quizScores[qId].score) {
          quizScores[qId] = attempt;
        }
      }
    });

    // Recent 5 attempts
    const recentAttempts = formattedAttempts.slice(0, 5).map((a) => ({
      _id: a._id,
      quizTitle: a.quizTitle || a.quizId?.title || 'Unknown Quiz',
      score: a.score,
      totalQuestions: a.totalQuestions,
      percentage: Math.round((a.score / a.totalQuestions) * 100),
      attemptedAt: a.attemptedAt
    }));

    // Projects
    const projects = await prisma.project.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    const formattedProjects = projects.map(p => ({
      ...p,
      _id: p.id
    }));

    const recentProjects = formattedProjects.slice(0, 3);

    // Average quiz score
    const avgScore =
      formattedAttempts.length > 0
        ? Math.round(
            (formattedAttempts.reduce((sum, a) => sum + (a.score / a.totalQuestions) * 100, 0) /
              formattedAttempts.length)
          )
        : 0;

    res.json({
      learning: {
        total: totalContent,
        completed: completedContent,
        percentage: totalContent > 0 ? Math.round((completedContent / totalContent) * 100) : 0
      },
      quiz: {
        totalAttempts: formattedAttempts.length,
        averageScore: avgScore,
        recentAttempts
      },
      projects: {
        total: formattedProjects.length,
        recentProjects
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
