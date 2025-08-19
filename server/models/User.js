const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false, // Do not return password by default
  },
  role: {
    type: String,
    enum: ["user", "vendor"],
    default: "user",
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  aadhar: {
    type: String,
    required: false,
  },
  profileImage: {
    type: String,
    required: false,
  },
  profileCompleted: {
    type: Boolean,
    default: false,
  },
  isVendor: {
    type: Boolean,
    default: false,
  },
  // Medicine authentication fields
  isMedicineVerified: {
    type: Boolean,
    default: false,
  },
  pharmacyLicenseNumber: {
    type: String,
  },
  businessName: {
    type: String,
  },
  documentUrl: {
    type: String,
  },
  // Rating and review fields for vendors
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  numReviews: {
    type: Number,
    default: 0
  },
  ratingDistribution: {
    1: { type: Number, default: 0 },
    2: { type: Number, default: 0 },
    3: { type: Number, default: 0 },
    4: { type: Number, default: 0 },
    5: { type: Number, default: 0 }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Virtual for profile completion percentage
UserSchema.virtual("profileCompletion").get(function () {
  let completed = 0;
  const requiredFields = [
    this.name,
    this.email,
    this.phone,
    this.location,
    this.aadhar,
    this.profileImage,
  ];
  requiredFields.forEach((f) => {
    if (f) completed += 1;
  });
  return Math.round((completed / requiredFields.length) * 100);
});

module.exports = mongoose.model("User", UserSchema);
