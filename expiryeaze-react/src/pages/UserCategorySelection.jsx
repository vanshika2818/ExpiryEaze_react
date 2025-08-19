import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserCategorySelection = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setTimeout(() => {
      if (category === 'groceries') {
        navigate('/user-dashboard');
      } else {
        navigate('/medicines');
      }
    }, 1000);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-success bg-opacity-10 py-5">
      <div className="container">
        <h1 className="display-4 fw-bold text-center mb-5">Select Your Interest</h1>
        
        <div className="row g-4 justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm text-center p-4">
              <div className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{width: '80px', height: '80px'}}>
                <span className="display-6">🍎</span>
              </div>
              <h2 className="h3 fw-bold mb-3">Groceries</h2>
              <p className="text-muted mb-4">Find deals on fresh food and groceries</p>
              <button
                onClick={() => handleCategorySelect("groceries")}
                className="btn btn-success fw-semibold px-4 py-2"
              >
                Browse Groceries
              </button>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm text-center p-4">
              <div className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{width: '80px', height: '80px'}}>
                <span className="display-6">💊</span>
              </div>
              <h2 className="h3 fw-bold mb-3">Medicines</h2>
              <p className="text-muted mb-4">Access discounted medicines and health products</p>
              <button
                onClick={() => handleCategorySelect("medicines")}
                className="btn btn-success fw-semibold px-4 py-2"
              >
                Browse Medicines
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCategorySelection;
