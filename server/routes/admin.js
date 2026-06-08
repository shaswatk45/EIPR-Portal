const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

// Helper to format user output
const formatUser = (user) => {
  if (!user) return null;
  return {
    ...user,
    _id: user.id
  };
};

// @route   GET /api/admin/stats
// @desc    Get platform-wide statistics [Admin]
// @access  Admin
router.get('/stats', protect, admin, async (req, res) => {
  try {
    const [userCount, contentCount, quizCount, attemptCount, projectCount] = await Promise.all([
      prisma.user.count({ where: { role: 'user' } }),
      prisma.learningContent.count(),
      prisma.quiz.count(),
      prisma.quizAttempt.count(),
      prisma.project.count()
    ]);

    res.json({ userCount, contentCount, quizCount, attemptCount, projectCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users [Admin]
// @access  Admin
router.get('/users', protect, admin, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: { createdAt: 'desc' }
    });
    
    res.json(users.map(formatUser));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/admin/users/:id/role
// @desc    Change user role [Admin]
// @access  Admin
router.put('/users/:id/role', protect, admin, async (req, res) => {
  try {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Role must be user or admin' });
    }

    const existing = await prisma.user.findUnique({
      where: { id: req.params.id }
    });
    if (!existing) return res.status(404).json({ message: 'User not found' });

    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    res.json(formatUser(user));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete a user [Admin]
// @access  Admin
router.delete('/users/:id', protect, admin, async (req, res) => {
  try {
    if (req.params.id === req.user.id) {
      return res.status(400).json({ message: 'Cannot delete yourself' });
    }

    const existing = await prisma.user.findUnique({
      where: { id: req.params.id }
    });
    if (!existing) return res.status(404).json({ message: 'User not found' });

    await prisma.user.delete({
      where: { id: req.params.id }
    });

    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
