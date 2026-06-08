const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

// Helper to format learning content for the response
const formatContent = (item) => {
  if (!item) return null;
  let examples = [];
  let keyPoints = [];
  try {
    examples = typeof item.examples === 'string' ? JSON.parse(item.examples) : (item.examples || []);
  } catch (e) {
    examples = [];
  }
  try {
    keyPoints = typeof item.keyPoints === 'string' ? JSON.parse(item.keyPoints) : (item.keyPoints || []);
  } catch (e) {
    keyPoints = [];
  }
  return {
    ...item,
    _id: item.id,
    examples,
    keyPoints
  };
};

// @route   GET /api/learning
// @desc    Get all learning content (optional ?category= filter)
// @access  Protected
router.get('/', protect, async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }

    const content = await prisma.learningContent.findMany({
      where: filter,
      orderBy: [
        { order: 'asc' },
        { createdAt: 'asc' }
      ]
    });

    // Get progress for this user
    const progress = await prisma.learningProgress.findMany({
      where: { userId: req.user.id }
    });
    const completedIds = progress.map((p) => p.contentId);

    const contentWithProgress = content.map((item) => {
      const formatted = formatContent(item);
      return {
        ...formatted,
        completed: completedIds.includes(item.id)
      };
    });

    res.json(contentWithProgress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/learning/:id
// @desc    Get single learning content
// @access  Protected
router.get('/:id', protect, async (req, res) => {
  try {
    const content = await prisma.learningContent.findUnique({
      where: { id: req.params.id }
    });
    if (!content) return res.status(404).json({ message: 'Content not found' });

    const progress = await prisma.learningProgress.findUnique({
      where: {
        userId_contentId: {
          userId: req.user.id,
          contentId: req.params.id
        }
      }
    });

    res.json({
      ...formatContent(content),
      completed: !!progress
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/learning
// @desc    Create learning content [Admin]
// @access  Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const { title, category, content, examples, keyPoints, order } = req.body;

    const newContent = await prisma.learningContent.create({
      data: {
        title,
        category,
        content,
        examples: Array.isArray(examples) ? JSON.stringify(examples) : JSON.stringify([]),
        keyPoints: Array.isArray(keyPoints) ? JSON.stringify(keyPoints) : JSON.stringify([]),
        order: order !== undefined ? parseInt(order, 10) || 0 : 0
      }
    });

    res.status(201).json(formatContent(newContent));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/learning/:id
// @desc    Update learning content [Admin]
// @access  Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const { title, category, content, examples, keyPoints, order } = req.body;
    
    // Check if content exists
    const existing = await prisma.learningContent.findUnique({
      where: { id: req.params.id }
    });
    if (!existing) return res.status(404).json({ message: 'Content not found' });

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (category !== undefined) updateData.category = category;
    if (content !== undefined) updateData.content = content;
    if (examples !== undefined) {
      updateData.examples = Array.isArray(examples) ? JSON.stringify(examples) : JSON.stringify([]);
    }
    if (keyPoints !== undefined) {
      updateData.keyPoints = Array.isArray(keyPoints) ? JSON.stringify(keyPoints) : JSON.stringify([]);
    }
    if (order !== undefined) {
      updateData.order = parseInt(order, 10) || 0;
    }

    const updatedContent = await prisma.learningContent.update({
      where: { id: req.params.id },
      data: updateData
    });

    res.json(formatContent(updatedContent));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/learning/:id
// @desc    Delete learning content [Admin]
// @access  Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const existing = await prisma.learningContent.findUnique({
      where: { id: req.params.id }
    });
    if (!existing) return res.status(404).json({ message: 'Content not found' });

    await prisma.learningContent.delete({
      where: { id: req.params.id }
    });

    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/learning/:id/complete
// @desc    Mark content as completed
// @access  Protected
router.post('/:id/complete', protect, async (req, res) => {
  try {
    const content = await prisma.learningContent.findUnique({
      where: { id: req.params.id }
    });
    if (!content) return res.status(404).json({ message: 'Content not found' });

    // Upsert to avoid duplicates using composite unique key
    await prisma.learningProgress.upsert({
      where: {
        userId_contentId: {
          userId: req.user.id,
          contentId: req.params.id
        }
      },
      update: {
        completedAt: new Date()
      },
      create: {
        userId: req.user.id,
        contentId: req.params.id,
        completedAt: new Date()
      }
    });

    res.json({ message: 'Marked as completed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
