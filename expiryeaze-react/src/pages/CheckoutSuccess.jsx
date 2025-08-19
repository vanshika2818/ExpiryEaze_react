import React from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutSuccess = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/user-dashboard');
  };

  const handleViewOrders = () => {
    navigate('/user-dashboard');
  };

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-sm border-0 text-center">
              <div className="card-body p-5">
                {/* Success Icon */}
                <div className="mb-4">
                  <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center" 
                       style={{ width: '100px', height: '100px' }}>
                    <i className="fas fa-check-circle text-success" style={{ fontSize: '3rem' }}></i>
                  </div>
                </div>

                {/* Success Message */}
                <h1 className="h2 fw-bold text-success mb-3">Payment Successful!</h1>
                <p className="text-muted mb-4">
                  Thank you for your purchase. Your order has been confirmed and will be processed shortly.
                </p>

                {/* Order Details */}
                <div className="bg-light rounded p-4 mb-4">
                  <h5 className="fw-bold mb-3">Order Details</h5>
                  <div className="row text-start">
                    <div className="col-6">
                      <small className="text-muted d-block">Order Number</small>
                      <span className="fw-semibold">#EXP-{Date.now().toString().slice(-8)}</span>
                    </div>
                    <div className="col-6">
                      <small className="text-muted d-block">Order Date</small>
                      <span className="fw-semibold">{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="row text-start mt-2">
                    <div className="col-6">
                      <small className="text-muted d-block">Payment Method</small>
                      <span className="fw-semibold">Credit Card</span>
                    </div>
                    <div className="col-6">
                      <small className="text-muted d-block">Status</small>
                      <span className="badge bg-success">Confirmed</span>
                    </div>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="mb-4">
                  <h6 className="fw-bold mb-3">What's Next?</h6>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <div className="p-3 bg-light rounded">
                        <i className="fas fa-envelope text-primary fs-4 mb-2"></i>
                        <small className="d-block fw-semibold">Email Confirmation</small>
                        <small className="text-muted">Check your email for order details</small>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="p-3 bg-light rounded">
                        <i className="fas fa-truck text-primary fs-4 mb-2"></i>
                        <small className="d-block fw-semibold">Shipping</small>
                        <small className="text-muted">Your order will ship within 24 hours</small>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="p-3 bg-light rounded">
                        <i className="fas fa-headset text-primary fs-4 mb-2"></i>
                        <small className="d-block fw-semibold">Support</small>
                        <small className="text-muted">Contact us if you need help</small>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="d-grid gap-2">
                  <button
                    onClick={handleContinueShopping}
                    className="btn btn-success btn-lg"
                  >
                    <i className="fas fa-store me-2"></i>
                    Continue Shopping
                  </button>
                  <button
                    onClick={handleViewOrders}
                    className="btn btn-outline-secondary"
                  >
                    <i className="fas fa-list me-2"></i>
                    View My Orders
                  </button>
                </div>

                {/* Additional Info */}
                <div className="mt-4 p-3 bg-light rounded">
                  <h6 className="fw-bold mb-2">
                    <i className="fas fa-info-circle text-primary me-2"></i>
                    Need Help?
                  </h6>
                  <p className="text-muted small mb-0">
                    If you have any questions about your order, please contact our customer support team. 
                    We're here to help you 24/7.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
