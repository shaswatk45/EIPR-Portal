const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

// Helper to format project output
const formatProject = (project) => {
  if (!project) return null;
  return {
    ...project,
    _id: project.id
  };
};

// @route   GET /api/projects
// @desc    Get current user's projects
// @access  Protected
router.get('/', protect, async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });
    
    res.json(projects.map(formatProject));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/projects
// @desc    Submit a new project
// @access  Protected
router.post('/', protect, async (req, res) => {
  try {
    const { title, description, category, iprSuggestion } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ message: 'Title, description and category are required' });
    }

    const project = await prisma.project.create({
      data: {
        userId: req.user.id,
        title,
        description,
        category,
        iprSuggestion: iprSuggestion || ''
      }
    });

    res.status(201).json(formatProject(project));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/projects/:id
// @desc    Delete a project
// @access  Protected (owner only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: req.params.id }
    });
    
    if (!project) return res.status(404).json({ message: 'Project not found' });

    if (project.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this project' });
    }

    await prisma.project.delete({
      where: { id: req.params.id }
    });

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/projects/all
// @desc    Get all projects [Admin]
// @access  Admin
router.get('/all', protect, admin, async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Populate userId as object with name, email and _id for Mongoose compatibility
    const formatted = projects.map(p => ({
      ...formatProject(p),
      userId: p.user ? { ...p.user, _id: p.userId } : null
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
