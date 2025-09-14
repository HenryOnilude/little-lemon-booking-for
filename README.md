# Little Lemon Restaurant Booking System

A professional table reservation system built with React for the Little Lemon restaurant. This project demonstrates modern web development practices including form validation, accessibility, responsive design, and comprehensive testing.

## 🌟 Features

### Core Functionality
- **Complete Booking Form** - Date, time, party size, customer details, and special requests
- **Real-time Validation** - Comprehensive form validation with instant feedback
- **Responsive Design** - Optimised for mobile, tablet, and desktop devices
- **Accessibility** - WCAG compliant with proper ARIA labels and keyboard navigation
- **Professional UI** - Clean, modern design matching Little Lemon branding

### Validation Features
- **Date Validation** - Future dates only, no Sundays (restaurant closed), 90-day advance limit
- **Email Validation** - RFC-compliant email format checking
- **Phone Validation** - Flexible format supporting UK and international numbers
- **Name Validation** - Proper character validation and length requirements
- **Time Validation** - Prevents booking past times for current day

### Technical Features
- **React Hooks** - Modern functional components with useState for state management
- **Component Architecture** - Modular, reusable components following React best practices
- **Form State Management** - Controlled components with centralized state
- **Error Handling** - Graceful error states with user-friendly messaging
- **Debug Mode** - Real-time form state visualization for development

## 🛠 Technology Stack

- **React 19.1.1** - Frontend framework
- **React DOM 19.1.1** - React rendering
- **React Scripts 5.0.1** - Build tools and configuration
- **React Testing Library** - Unit testing framework
- **Jest** - Test runner
- **CSS3** - Styling with modern CSS features
- **ES6+** - Modern JavaScript features

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd littlelemon
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
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

This project includes comprehensive unit tests covering all form functionality:

```bash
# Run all tests
npm test

# Run tests with coverage report
npm test -- --coverage --watchAll=false

# Run tests in watch mode
npm test
```

### Test Coverage
- **15 comprehensive test cases** covering all form functionality
- **Form validation testing** - All validation rules tested
- **User interaction testing** - Click, type, and form submission flows
- **Accessibility testing** - ARIA attributes and screen reader compatibility
- **Error state testing** - Invalid input handling and error messages
- **Success state testing** - Valid form submission flows

## 🎨 Styling and Design

### Responsive Breakpoints
- **Desktop**: > 768px - Full layout with optimal spacing
- **Tablet**: 768px - 481px - Adapted layout for medium screens
- **Mobile**: ≤ 480px - Compact layout with touch-friendly controls

### Accessibility Features
- **ARIA Labels** - Proper labeling for screen readers
- **Focus Management** - Clear focus indicators and logical tab order
- **Error Announcements** - Screen reader announcements for validation errors
- **High Contrast Support** - Enhanced visibility for users with visual impairments
- **Reduced Motion Support** - Respects user's motion preferences

### Colour Palette
- **Primary Green**: #495E57 (Little Lemon brand color)
- **Accent Yellow**: #F4CE14 (Little Lemon highlight color)
- **Success Green**: #28a745 (Valid input states)
- **Error Red**: #dc3545 (Error states and messages)

## 📁 Project Structure

```
src/
├── components/
│   └── BookingForm/
│       ├── BookingForm.js          # Main form component
│       ├── BookingForm.css         # Component styles
│       └── BookingForm.test.js     # Unit tests
├── App.js                          # Main app component
├── App.css                         # Global styles
└── index.js                        # Application entry point
```

## 🚀 Available Scripts

### Development
- **`npm start`** - Start development server at http://localhost:3000
- **`npm test`** - Run test suite with watch mode
- **`npm run build`** - Create production build
- **`npm run eject`** - Eject from Create React App (one-way operation)

### Production
- **`npm run build`** - Optimized production build
- **`npm run build && serve -s build`** - Build and serve production version

## 🌐 Browser Support

- **Chrome** - Latest 2 versions
- **Firefox** - Latest 2 versions  
- **Safari** - Latest 2 versions
- **Edge** - Latest 2 versions
- **Mobile Safari** - iOS 12+
- **Chrome Mobile** - Android 8+

## ♿ Accessibility Compliance

This application follows WCAG 2.1 AA guidelines:
- ✅ Keyboard navigation support
- ✅ Screen reader compatibility
- ✅ Proper color contrast ratios
- ✅ Focus management
- ✅ Error identification and description
- ✅ Form labels and instructions

## 🔧 Development Notes

### Form Validation Strategy
The application uses a hybrid validation approach:
1. **Real-time validation** - Validates fields as user types
2. **Submit validation** - Comprehensive validation before form submission
3. **Visual feedback** - Color-coded inputs and clear error messages

### State Management
- Uses React's `useState` hook for local component state
- Centralized form data object for easy management
- Separate error state tracking for each field

### Performance Considerations
- Debounced validation to prevent excessive re-renders
- Controlled components for predictable behavior
- Minimal re-renders through strategic state updates

## 🚧 Future Enhancements

- [ ] Integration with backend API for form submission
- [ ] Email confirmation system
- [ ] Calendar integration for availability checking
- [ ] Multiple language support (i18n)
- [ ] Advanced booking features (recurring reservations)
- [ ] Integration with payment systems
- [ ] SMS confirmation system

## 📄 License

This project is created for educational purposes as part of the Meta Front-End Developer Capstone project.

## 👨‍💻 Author

**Henry Onilude**  
Meta Front-End Developer Capstone Project

---

**Note**: This is a demonstration project created for the Meta Front-End Developer Professional Certificate program. It showcases modern React development practices and responsive web design principles.
