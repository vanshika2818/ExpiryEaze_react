const Review = require('../models/Review');
const User = require('../models/User');

// @desc    Create a review
// @route   POST /api/v1/reviews
// @access  Private
const createReview = async (req, res) => {
  try {
    const { vendorId, rating, title, comment, images } = req.body;
    const userId = req.user.id;

    // Check if user has already reviewed this vendor
    const existingReview = await Review.findOne({
      user: userId,
      vendor: vendorId
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        error: 'You have already reviewed this vendor'
      });
    }

    // Check if vendor exists and is actually a vendor
    const vendor = await User.findOne({ _id: vendorId, role: 'vendor' });
    if (!vendor) {
      return res.status(404).json({
        success: false,
        error: 'Vendor not found'
      });
    }

    // Create review
    const review = await Review.create({
      user: userId,
      vendor: vendorId,
      rating,
      title,
      comment,
      images: images || []
    });

    // Populate user details
    await review.populate('user', 'name profileImage');

    res.status(201).json({
      success: true,
      data: review
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get all reviews for a vendor
// @route   GET /api/v1/reviews/vendor/:vendorId
// @access  Public
const getVendorReviews = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const { page = 1, limit = 10, sort = '-createdAt' } = req.query;

    const skip = (page - 1) * limit;

    const reviews = await Review.find({ vendor: vendorId })
      .populate('user', 'name profileImage')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Review.countDocuments({ vendor: vendorId });

    // Get vendor rating stats
    const vendor = await User.findById(vendorId);
    const ratingStats = {
      averageRating: vendor?.averageRating || 0,
      numReviews: vendor?.numReviews || 0,
      ratingDistribution: vendor?.ratingDistribution || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    };

    res.json({
      success: true,
      data: {
        reviews,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / limit),
          hasNext: skip + reviews.length < total,
          hasPrev: page > 1
        },
        ratingStats
      }
    });
  } catch (error) {
    console.error('Get vendor reviews error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get user's review for a vendor
// @route   GET /api/v1/reviews/vendor/:vendorId/my-review
// @access  Private
const getMyReview = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const userId = req.user.id;

    const review = await Review.findOne({
      user: userId,
      vendor: vendorId
    }).populate('user', 'name profileImage');

    if (!review) {
      return res.status(404).json({
        success: false,
        error: 'Review not found'
      });
    }

    res.json({
      success: true,
      data: review
    });
  } catch (error) {
    console.error('Get my review error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Update a review
// @route   PUT /api/v1/reviews/:id
// @access  Private
const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, title, comment, images } = req.body;
    const userId = req.user.id;

    let review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        error: 'Review not found'
      });
    }

    // Check if user owns the review
    if (review.user.toString() !== userId) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update this review'
      });
    }

    review = await Review.findByIdAndUpdate(
      id,
      { rating, title, comment, images: images || review.images },
      { new: true, runValidators: true }
    ).populate('user', 'name profileImage');

    res.json({
      success: true,
      data: review
    });
  } catch (error) {
    console.error('Update review error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Delete a review
// @route   DELETE /api/v1/reviews/:id
// @access  Private
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        error: 'Review not found'
      });
    }

    // Check if user owns the review
    if (review.user.toString() !== userId) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to delete this review'
      });
    }

    await review.deleteOne();

    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Mark review as helpful
// @route   POST /api/v1/reviews/:id/helpful
// @access  Private
const markHelpful = async (req, res) => {
  try {
    const { id } = req.params;
    const { helpful } = req.body;
    const userId = req.user.id;

    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        error: 'Review not found'
      });
    }

    // Check if user already marked this review
    const existingHelpful = review.helpful.find(h => h.user.toString() === userId);

    if (existingHelpful) {
      // Update existing helpful mark
      existingHelpful.helpful = helpful;
    } else {
      // Add new helpful mark
      review.helpful.push({ user: userId, helpful });
    }

    await review.save();

    res.json({
      success: true,
      data: review
    });
  } catch (error) {
    console.error('Mark helpful error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get all reviews (admin)
// @route   GET /api/v1/reviews
// @access  Private/Admin
const getAllReviews = async (req, res) => {
  try {
    const { page = 1, limit = 20, vendor, rating, sort = '-createdAt' } = req.query;

    const skip = (page - 1) * limit;
    const filter = {};

    if (vendor) filter.vendor = vendor;
    if (rating) filter.rating = parseInt(rating);

    const reviews = await Review.find(filter)
      .populate('user', 'name email')
      .populate('vendor', 'name email businessName')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Review.countDocuments(filter);

    res.json({
      success: true,
      data: {
        reviews,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / limit),
          hasNext: skip + reviews.length < total,
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get all reviews error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

module.exports = {
  createReview,
  getVendorReviews,
  getMyReview,
  updateReview,
  deleteReview,
  markHelpful,
  getAllReviews
};
