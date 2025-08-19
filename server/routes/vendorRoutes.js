const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, medicineAuth, getAllVendorsWithProducts, getMedicineVerificationStatus } = require('../controllers/vendorController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Get current vendor profile
router.get('/profile', authMiddleware, getProfile);
// Update vendor profile (support both PUT and POST)
router.put('/profile', authMiddleware, updateProfile);
router.post('/profile', authMiddleware, updateProfile);
// Get all vendors with their products (public)
router.get('/all-with-products', getAllVendorsWithProducts);
// Medicine authentication (already present)
router.post('/medicine-auth', authMiddleware, medicineAuth);
// Check medicine verification status
router.get('/medicine-verification-status', authMiddleware, getMedicineVerificationStatus);

module.exports = router; 