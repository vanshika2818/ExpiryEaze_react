import React from 'react';

const TestPage = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h1 className="display-4 fw-bold text-success mb-4">✅ React App Working!</h1>
          <div className="card shadow-sm">
            <div className="card-body p-5">
              <div className="display-1 mb-4">🎉</div>
              <h2 className="h3 fw-bold mb-3">ExpiryEaze React Version</h2>
              <p className="lead text-muted mb-4">
                Your React application is running successfully on port 3001!
              </p>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="card bg-success bg-opacity-10">
                    <div className="card-body">
                      <h5 className="card-title">✅ Bootstrap Working</h5>
                      <p className="card-text">Styling is applied correctly</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card bg-success bg-opacity-10">
                    <div className="card-body">
                      <h5 className="card-title">✅ React Router Working</h5>
                      <p className="card-text">Navigation is functional</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <a href="/" className="btn btn-success btn-lg">
                  Go to Home Page
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
