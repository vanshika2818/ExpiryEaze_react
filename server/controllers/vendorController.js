const User = require("../models/User");
const Product = require('../models/Product');

// @desc      Handle medicine authentication for vendors
// @route     POST /api/v1/vendors/medicine-auth
// @access    Private (for vendors)
exports.medicineAuth = async (req, res) => {
  try {
    const { pharmacyLicenseNumber, businessName, documentUrl } = req.body;
    if (!pharmacyLicenseNumber || !businessName) {
      return res
        .status(400)
        .json({
          success: false,
          error: "All required fields must be provided.",
        });
    }
    const vendor = await User.findById(req.user.id);
    if (!vendor || vendor.role !== "vendor") {
      return res
        .status(404)
        .json({ success: false, error: "Vendor not found." });
    }
    vendor.isMedicineVerified = true;
    vendor.pharmacyLicenseNumber = pharmacyLicenseNumber;
    vendor.businessName = businessName;
    vendor.documentUrl = documentUrl || "";
    await vendor.save();
    res
      .status(200)
      .json({
        success: true,
        message: "Vendor medicine authentication successful.",
      });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc      Get current vendor profile
// @route     GET /api/v1/vendors/profile
// @access    Private (for vendors)
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user || user.role !== "vendor") {
      return res
        .status(404)
        .json({ success: false, error: "Vendor not found." });
    }
    res.status(200).json({ success: true, profile: user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc      Update vendor profile
// @route     PUT /api/v1/vendors/profile
// @access    Private (for vendors)
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found. Please log in again." });
    }
    user.role = 'vendor'; // Always set role to vendor
    const { name, phone, location, aadhar, email, profileImage } = req.body;
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (location) user.location = location;
    if (aadhar) user.aadhar = aadhar;
    if (email) user.email = email;
    if (profileImage) user.profileImage = profileImage;
    user.profileCompleted = !!(
      user.name &&
      user.email &&
      user.phone &&
      user.location &&
      user.aadhar
    );
    await user.save();
    res.status(200).json({ success: true, profile: user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc      Get all vendors with their products
// @route     GET /api/v1/vendors/all-with-products
// @access    Public
exports.getAllVendorsWithProducts = async (req, res) => {
  try {
    // Find all users with role 'vendor'
    const vendors = await User.find({ role: 'vendor' }).select('-password');
    // For each vendor, get their products
    const vendorsWithProducts = await Promise.all(
      vendors.map(async (vendor) => {
        const products = await Product.find({ vendor: vendor._id });
        return {
          vendor,
          products,
        };
      })
    );
    res.status(200).json({ success: true, data: vendorsWithProducts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc      Check medicine verification status
// @route     GET /api/v1/vendors/medicine-verification-status
// @access    Private (for vendors)
exports.getMedicineVerificationStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user || user.role !== "vendor") {
      return res
        .status(404)
        .json({ success: false, error: "Vendor not found." });
    }
    
    // Check if vendor is verified for medicine sales
    const isVerified = user.isMedicineVerified === true;
    
    res.status(200).json({ 
      success: true, 
      isVerified: isVerified,
      message: isVerified ? "Vendor is verified for medicine sales" : "Vendor needs verification for medicine sales"
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
