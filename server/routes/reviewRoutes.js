const express = require('express');
const router = express.Router();
const {
  createReview,
  getVendorReviews,
  getMyReview,
  updateReview,
  deleteReview,
  markHelpful,
  getAllReviews
} = require('../controllers/reviewController');

// Import auth middleware
const { authMiddleware } = require('../middleware/authMiddleware');

// Public routes
router.get('/vendor/:vendorId', getVendorReviews);

// Protected routes
router.use(authMiddleware); // All routes below this require authentication

router.post('/', createReview);
router.get('/vendor/:vendorId/my-review', getMyReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);
router.post('/:id/helpful', markHelpful);

// Admin routes (you can add admin middleware later)
router.get('/', getAllReviews);

module.exports = router;
