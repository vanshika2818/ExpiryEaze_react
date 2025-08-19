import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { Trash2, ShoppingCart, ArrowLeft, Truck, MessageCircle } from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, removeFromCart, loading, error } = useCart();
  const [shippingOption, setShippingOption] = useState('self'); // 'self' or 'platform'
  const [shippingFee, setShippingFee] = useState(0);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product?.discountedPrice || item.product?.price || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + shippingFee;
  };

  const handleShippingOptionChange = (option) => {
    setShippingOption(option);
    if (option === 'platform') {
      // Calculate shipping fee based on subtotal or number of items
      const subtotal = calculateSubtotal();
      const itemCount = cartItems.length;
      // Simple shipping calculation: $5 base + $2 per item, max $15
      const calculatedFee = Math.min(5 + (itemCount * 2), 15);
      setShippingFee(calculatedFee);
    } else {
      setShippingFee(0);
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    // Pass shipping information to checkout
    const checkoutData = {
      shippingOption,
      shippingFee,
      total: calculateTotal()
    };
    navigate('/checkout', { state: { checkoutData } });
  };

  const handleContinueShopping = () => {
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-warning">
          Please sign in to view your cart.
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/login')}>
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-3">
          <button 
            className="btn btn-outline-secondary" 
            onClick={handleContinueShopping}
          >
            <ArrowLeft size={18} className="me-2" />
            Continue Shopping
          </button>
          <h1 className="mb-0 fw-bold">Shopping Cart</h1>
        </div>
        <div className="text-muted">
          {cartItems.length} item{cartItems.length !== 1 ? 's' : ''}
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-5">
          <div className="bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" 
               style={{width: '100px', height: '100px'}}>
            <ShoppingCart size={48} className="text-muted" />
          </div>
          <h3 className="text-muted mb-3">Your cart is empty</h3>
          <p className="text-muted mb-4">Looks like you haven't added any products to your cart yet.</p>
          <button className="btn btn-success btn-lg" onClick={handleContinueShopping}>
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-8">
            <div className="card shadow-sm">
              <div className="card-body p-0">
                                 {cartItems.map((item) => (
                   <div key={item._id || item.id} className="border-bottom p-4">
                    <div className="row align-items-center">
                      <div className="col-md-2">
                                               <img
                         src={item.product?.images?.[0] || item.product?.imageUrl || 'https://via.placeholder.com/100'}
                         alt={item.product?.name || 'Product'}
                         className="img-fluid rounded"
                         style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                       />
                      </div>
                                             <div className="col-md-6">
                         <h5 className="fw-bold mb-1">{item.product?.name || 'Product'}</h5>
                         <p className="text-muted mb-2">{item.product?.description || 'No description available'}</p>
                         <div className="d-flex align-items-center gap-2">
                           <span className="badge bg-success">{item.product?.category || 'Unknown'}</span>
                           {item.product?.discountedPrice && (
                             <span className="badge bg-danger">
                               {Math.round(((item.product.price - item.product.discountedPrice) / item.product.price) * 100)}% OFF
                             </span>
                           )}
                         </div>
                       </div>
                                             <div className="col-md-2 text-center">
                         <div className="fw-bold text-success">
                           ${((item.product?.discountedPrice || item.product?.price || 0) * item.quantity).toFixed(2)}
                         </div>
                         {item.product?.discountedPrice && (
                           <div className="text-muted text-decoration-line-through small">
                             ${(item.product.price * item.quantity).toFixed(2)}
                           </div>
                         )}
                       </div>
                      <div className="col-md-1 text-center">
                        <span className="fw-semibold">Qty: {item.quantity}</span>
                      </div>
                      <div className="col-md-1 text-end">
                                                 <button
                           className="btn btn-outline-danger btn-sm"
                           onClick={() => removeFromCart(item._id || item.id)}
                           title="Remove from cart"
                         >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
                     <div className="col-lg-4">
             <div className="card shadow-sm position-sticky" style={{top: '2rem'}}>
               <div className="card-body p-4">
                 <h5 className="card-title fw-bold mb-4">Order Summary</h5>
                 
                 <div className="d-flex justify-content-between mb-3">
                   <span>Subtotal ({cartItems.length} items)</span>
                   <span className="fw-semibold">${calculateSubtotal().toFixed(2)}</span>
                 </div>
                 
                 {/* Shipping Options */}
                 <div className="mb-4">
                   <h6 className="fw-bold mb-3">Shipping Options</h6>
                   
                   <div className="form-check mb-3">
                     <input
                       className="form-check-input"
                       type="radio"
                       name="shippingOption"
                       id="selfShipping"
                       value="self"
                       checked={shippingOption === 'self'}
                       onChange={() => handleShippingOptionChange('self')}
                     />
                     <label className="form-check-label d-flex align-items-center gap-2" htmlFor="selfShipping">
                       <MessageCircle size={16} className="text-primary" />
                       <div>
                         <div className="fw-semibold">Self-Managed Shipping</div>
                         <small className="text-muted">Contact vendor directly for pickup/delivery</small>
                       </div>
                     </label>
                   </div>
                   
                   <div className="form-check">
                     <input
                       className="form-check-input"
                       type="radio"
                       name="shippingOption"
                       id="platformShipping"
                       value="platform"
                       checked={shippingOption === 'platform'}
                       onChange={() => handleShippingOptionChange('platform')}
                     />
                     <label className="form-check-label d-flex align-items-center gap-2" htmlFor="platformShipping">
                       <Truck size={16} className="text-success" />
                       <div>
                         <div className="fw-semibold">Platform Shipping</div>
                         <small className="text-muted">We handle delivery for you</small>
                       </div>
                     </label>
                   </div>
                 </div>
                 
                 <div className="d-flex justify-content-between mb-3">
                   <span>Shipping Fee</span>
                   <span className={shippingFee > 0 ? "fw-semibold text-success" : "text-success"}>
                     {shippingFee > 0 ? `$${shippingFee.toFixed(2)}` : 'Free'}
                   </span>
                 </div>
                 
                 <hr />
                 
                 <div className="d-flex justify-content-between align-items-center mb-4">
                   <span className="fw-bold fs-5">Total</span>
                   <span className="fw-bold fs-5 text-success">${calculateTotal().toFixed(2)}</span>
                 </div>
                
                <button
                  className="btn btn-success w-100 btn-lg"
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </button>
                
                                 <div className="text-center mt-3">
                   <small className="text-muted">
                     Secure checkout powered by our trusted payment partners
                   </small>
                 </div>
                 
                 {shippingOption === 'self' && (
                   <div className="alert alert-info mt-3 mb-0">
                     <small>
                       <strong>Self-Managed Shipping:</strong> After checkout, you'll receive vendor contact details to arrange pickup or delivery directly.
                     </small>
                   </div>
                 )}
                 
                 {shippingOption === 'platform' && (
                   <div className="alert alert-success mt-3 mb-0">
                     <small>
                       <strong>Platform Shipping:</strong> We'll handle the delivery process and keep you updated on shipping status.
                     </small>
                   </div>
                 )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
