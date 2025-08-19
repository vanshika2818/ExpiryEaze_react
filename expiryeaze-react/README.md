# ExpiryEaze React App

A comprehensive React.js application for managing expiring products and medicines with a modern, professional UI. This app allows users to buy and sell discounted groceries and medicines while helping vendors manage their inventory.

## 🚀 Features

### For Users
- **Product Browsing**: Browse groceries and medicines with detailed information
- **Advanced Filtering**: Filter by city, category, prescription type, and search terms
- **Shopping Cart**: Add products to cart with quantity management
- **Wishlist**: Save favorite products for later
- **Product Reviews**: View and read customer reviews with ratings
- **Secure Checkout**: Complete purchase process with payment forms
- **Order Tracking**: View order history and status

### For Vendors
- **Product Management**: Add, edit, and delete products
- **Inventory Tracking**: Monitor stock levels and expiry dates
- **Sales Analytics**: View revenue, orders, and performance metrics
- **Category Management**: Organize products by categories
- **Bulk Operations**: Manage multiple products efficiently

### General Features
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Professional Bootstrap-based interface with custom styling
- **Real-time Updates**: Dynamic cart and inventory management
- **Local Storage**: Persistent data across browser sessions
- **Toast Notifications**: User-friendly feedback messages
- **Professional Styling**: Custom CSS with animations and hover effects

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Routing**: React Router v6
- **Styling**: Bootstrap 5 + Custom CSS
- **Icons**: Bootstrap Icons
- **State Management**: React Hooks (useState, useEffect)
- **Build Tool**: Create React App
- **Package Manager**: npm

## 📁 Project Structure

```
expiryeaze-react/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   ├── UserDashboard.tsx
│   │   ├── VendorDashboard.tsx
│   │   ├── Cart.tsx
│   │   ├── Checkout.tsx
│   │   ├── CheckoutSuccess.tsx
│   │   ├── MedicinesDashboard.tsx
│   │   ├── UserCategorySelection.tsx
│   │   ├── VendorCategorySelection.tsx
│   │   ├── MedicineVendorVerification.tsx
│   │   ├── JoinWaitlist.tsx
│   │   ├── Terms.tsx
│   │   ├── Privacy.tsx
│   │   └── TestPage.tsx
│   ├── App.tsx
│   ├── App.css
│   └── index.tsx
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd expiryeaze-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3001` to view the application

### Alternative: Using the Batch File
On Windows, you can use the provided batch file:
```bash
start-react-app.bat
```

## 📱 Available Routes

### Main Pages
- `/` - Homepage with hero section and features
- `/login` - User login page
- `/signup` - User registration page
- `/join-waitlist` - Join the platform waitlist

### User Pages
- `/user-category-selection` - Choose between groceries or medicines
- `/user-dashboard` - Browse and purchase products
- `/medicines-dashboard` - Browse medicines specifically
- `/cart` - Shopping cart management
- `/checkout` - Payment and checkout process
- `/checkout-success` - Order confirmation page

### Vendor Pages
- `/vendor-category-selection` - Choose vendor category
- `/vendor-dashboard` - Product management and analytics
- `/medicine-vendor-verification` - Medicine vendor verification

### Legal Pages
- `/terms` - Terms of service
- `/privacy` - Privacy policy

### Test Page
- `/test` - Test page for development

## 🎨 UI Components

### Product Cards
- Product images with discount badges
- Price comparison (original vs discounted)
- Rating system with star display
- Add to cart and wishlist functionality
- Expandable product details

### Dashboard Features
- Analytics cards with key metrics
- Filterable product tables
- Search functionality
- Category and city filters
- Sort options (price, discount, expiry)

### Cart Management
- Quantity adjustment
- Item removal
- Price calculation
- Order summary
- Secure checkout process

## 🔧 Customization

### Styling
The app uses custom CSS variables for easy theming:
```css
:root {
  --primary-green: #198754;
  --secondary-green: #20c997;
  --dark-green: #146c43;
  --light-green: #d1e7dd;
  /* ... more variables */
}
```

### Adding New Products
To add new products, modify the `PRODUCTS` array in the respective dashboard files:
```javascript
const PRODUCTS = [
  {
    id: 1,
    name: "Product Name",
    vendor: "Vendor Name",
    originalPrice: 10.99,
    discountedPrice: 5.99,
    discount: "45%",
    expiryDate: "2025-12-31",
    quantity: 20,
    image: "image-url",
    description: "Product description",
    city: "City Name",
    category: "category",
    reviews: [...]
  }
];
```

## 📊 Data Management

### Local Storage
The app uses localStorage for:
- Shopping cart items (`groceryCart`, `medicineCart`)
- User preferences
- Session data

### State Management
- React hooks for component state
- Props for component communication
- Context API for global state (if needed)

## 🎯 Key Features Explained

### Product Filtering
- **City Filter**: Filter products by location
- **Category Filter**: Filter by product type (groceries/medicines)
- **Prescription Filter**: Filter medicines by prescription requirement
- **Search**: Text-based search across product names and vendors
- **Sorting**: Sort by name, price, discount, or expiry date

### Cart System
- **Add to Cart**: One-click product addition
- **Quantity Management**: Adjust quantities in cart
- **Remove Items**: Remove individual items or clear entire cart
- **Price Calculation**: Automatic subtotal, shipping, and tax calculation
- **Persistent Storage**: Cart data persists across browser sessions

### Vendor Dashboard
- **Product Management**: CRUD operations for products
- **Analytics**: Revenue, orders, and performance metrics
- **Inventory Tracking**: Monitor stock levels and expiry dates
- **Sales Data**: Track sold quantities and revenue per product

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Serve Production Build
```bash
npm install -g serve
serve -s build -l 3001
```

## 🔍 Troubleshooting

### Common Issues

1. **Port Already in Use**
   - The app runs on port 3001 by default
   - If port is busy, change the port in `package.json` start script

2. **Missing Dependencies**
   ```bash
   npm install
   ```

3. **TypeScript Errors**
   ```bash
   npm run build
   ```

4. **Bootstrap Icons Not Loading**
   - Ensure `bootstrap-icons` is installed
   - Check import in `App.tsx`

### Development Tips

1. **Hot Reload**: Changes automatically reflect in browser
2. **Console Logs**: Check browser console for errors
3. **React DevTools**: Install browser extension for debugging
4. **Local Storage**: Use browser dev tools to inspect localStorage

## 📈 Performance Optimization

- **Image Optimization**: Use compressed images
- **Lazy Loading**: Implement for large product lists
- **Code Splitting**: Split routes for better loading
- **Memoization**: Use React.memo for expensive components

## 🔒 Security Considerations

- **Input Validation**: Validate all user inputs
- **XSS Prevention**: Sanitize user-generated content
- **CSRF Protection**: Implement for forms
- **Secure Storage**: Use secure storage for sensitive data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Check the troubleshooting section
- Review the code comments
- Create an issue in the repository

## 🎉 Acknowledgments

- Bootstrap for the UI framework
- React team for the amazing framework
- Unsplash for placeholder images
- Bootstrap Icons for the icon set

---

**Happy Coding! 🚀**
