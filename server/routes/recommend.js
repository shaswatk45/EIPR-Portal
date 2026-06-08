const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Rule-based IPR recommendation logic
const iprRules = {
  'Software / App': {
    suggestions: ['Copyright', 'Patent'],
    explanation:
      'Software code is automatically protected by Copyright. If your app contains a novel technical process or algorithm, you may also file a Patent.',
    primary: 'Copyright',
    secondary: 'Patent'
  },
  'Mechanical Device': {
    suggestions: ['Patent', 'Industrial Design'],
    explanation:
      'A novel mechanical device can be protected by a Patent for its function. If the device also has a unique visual appearance, an Industrial Design registration protects its look.',
    primary: 'Patent',
    secondary: 'Industrial Design'
  },
  'Logo / Brand Name': {
    suggestions: ['Trademark'],
    explanation:
      'Logos, brand names, and slogans are protected through Trademark registration. This prevents others from using a confusingly similar mark in the same industry.',
    primary: 'Trademark',
    secondary: null
  },
  'Artwork / Writing': {
    suggestions: ['Copyright'],
    explanation:
      'Original artistic works, writings, illustrations, and creative content are automatically protected by Copyright from the moment of creation.',
    primary: 'Copyright',
    secondary: null
  },
  'Circuit / Electronics': {
    suggestions: ['Patent'],
    explanation:
      'Novel electronic circuits, PCB layouts, and hardware inventions can be protected through a Patent if they are new, non-obvious, and have utility.',
    primary: 'Patent',
    secondary: null
  },
  'Product Design': {
    suggestions: ['Industrial Design', 'Patent'],
    explanation:
      'The visual appearance (shape, color, texture) of a product is protected by Industrial Design. If the product also works in a novel way, a Patent covers the functional aspect.',
    primary: 'Industrial Design',
    secondary: 'Patent'
  },
  'Business Method': {
    suggestions: ['Patent'],
    explanation:
      'Novel and non-obvious business methods or processes can be filed as a Patent, though eligibility varies by jurisdiction. Consider consulting an IP attorney.',
    primary: 'Patent',
    secondary: null
  },
  'Music / Media': {
    suggestions: ['Copyright'],
    explanation:
      'Musical compositions, recordings, films, and other media are protected automatically by Copyright. You may also register with your national copyright office for stronger legal standing.',
    primary: 'Copyright',
    secondary: null
  },
  'Other': {
    suggestions: ['Copyright', 'Patent', 'Trademark'],
    explanation:
      'For general innovations, consider Copyright for creative works, Patent for novel inventions, and Trademark for brand identity. Consult an IP professional for the best advice.',
    primary: 'Copyright',
    secondary: 'Patent'
  }
};

// @route   POST /api/recommend
// @desc    Get IPR recommendation based on project type
// @access  Protected
router.post('/', protect, async (req, res) => {
  try {
    const { category } = req.body;

    if (!category) {
      return res.status(400).json({ message: 'Project category is required' });
    }

    const recommendation = iprRules[category];

    if (!recommendation) {
      return res.status(400).json({ message: 'Unknown project category' });
    }

    res.json({
      category,
      ...recommendation
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/recommend/categories
// @desc    Get list of available project categories
// @access  Protected
router.get('/categories', protect, (req, res) => {
  res.json({ categories: Object.keys(iprRules) });
});

module.exports = router;
