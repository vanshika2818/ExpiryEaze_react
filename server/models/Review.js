const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  comment: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  helpful: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    helpful: {
      type: Boolean,
      default: true
    }
  }],
  images: [{
    type: String,
    trim: true
  }],
  verified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Prevent multiple reviews from same user for same vendor
reviewSchema.index({ user: 1, vendor: 1 }, { unique: true });

// Calculate average rating for vendor
reviewSchema.statics.getAverageRating = async function(vendorId) {
  const stats = await this.aggregate([
    {
      $match: { vendor: vendorId }
    },
    {
      $group: {
        _id: '$vendor',
        averageRating: { $avg: '$rating' },
        numReviews: { $sum: 1 },
        ratingDistribution: {
          $push: '$rating'
        }
      }
    }
  ]);

  if (stats.length > 0) {
    const ratingDistribution = {
      1: 0, 2: 0, 3: 0, 4: 0, 5: 0
    };
    
    stats[0].ratingDistribution.forEach(rating => {
      ratingDistribution[rating]++;
    });

    return {
      averageRating: Math.round(stats[0].averageRating * 10) / 10,
      numReviews: stats[0].numReviews,
      ratingDistribution
    };
  }

  return {
    averageRating: 0,
    numReviews: 0,
    ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  };
};

// Update vendor's average rating after review save/update/delete
reviewSchema.post('save', async function() {
  const Review = this.constructor;
  const stats = await Review.getAverageRating(this.vendor);
  
  // Update vendor's rating stats
  const Vendor = mongoose.model('Vendor');
  await Vendor.findByIdAndUpdate(this.vendor, {
    averageRating: stats.averageRating,
    numReviews: stats.numReviews,
    ratingDistribution: stats.ratingDistribution
  });
});

reviewSchema.post('findOneAndUpdate', async function() {
  const Review = this.constructor;
  const stats = await Review.getAverageRating(this.vendor);
  
  const Vendor = mongoose.model('Vendor');
  await Vendor.findByIdAndUpdate(this.vendor, {
    averageRating: stats.averageRating,
    numReviews: stats.numReviews,
    ratingDistribution: stats.ratingDistribution
  });
});

reviewSchema.post('findOneAndDelete', async function() {
  const Review = this.constructor;
  const stats = await Review.getAverageRating(this.vendor);
  
  const Vendor = mongoose.model('Vendor');
  await Vendor.findByIdAndUpdate(this.vendor, {
    averageRating: stats.averageRating,
    numReviews: stats.numReviews,
    ratingDistribution: stats.ratingDistribution
  });
});

module.exports = mongoose.model('Review', reviewSchema);
