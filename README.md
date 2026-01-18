# 💰 Expense Tracker App

A modern, responsive expense tracking application built with React that helps you manage shared expenses with friends and family. Keep track of who owes what, split bills fairly, and visualize your spending patterns with beautiful charts.

![Expense Tracker Preview](https://via.placeholder.com/800x400/667eea/FFFFFF?text=Expense+Tracker+App)

## ✨ Features

### 🎯 **Core Functionality**
- **Group Management**: Create and manage groups of people for shared expenses
- **Expense Tracking**: Add expenses with categories, descriptions, and custom splits
- **Balance Calculation**: Automatic calculation of who owes what to whom
- **Expense History**: Complete history with filtering and search capabilities
- **Visual Analytics**: Interactive charts showing spending patterns by category

### 🎨 **Modern UI/UX**
- Clean, intuitive interface with card-based design
- Fully responsive design that works on all devices
- Smooth animations and hover effects
- Dark/light theme support (expandable)
- Accessibility-focused design

### 📊 **Data Visualization**
- Pie charts for spending breakdown by category
- Interactive data filtering
- Summary statistics and insights
- Export capabilities (future feature)

### 🔧 **Technical Features**
- Built with React 19.2.3 and modern hooks
- React Router for seamless navigation
- Chart.js for beautiful data visualization
- Context API for state management
- Progressive Web App capabilities

## 🚀 Tech Stack

- **Frontend**: React 19.2.3
- **Routing**: React Router DOM 7.12.0
- **Charts**: Chart.js 4.5.1 & React Chart.js 2 5.3.1
- **Styling**: CSS3 with modern features
- **State Management**: React Context API
- **Build Tool**: Create React App
- **Testing**: Jest & React Testing Library

## 📋 Prerequisites

Before running this application, make sure you have:
- Node.js (version 14 or higher)
- npm or yarn package manager

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/expense-tracker-app.git
   cd expense-tracker-app
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

The app will automatically reload when you make changes to the code.

## 📖 Usage Guide

### Getting Started
1. **Create a Group**: Start by adding members to your expense group on the Group page
2. **Add Expenses**: Record expenses with amounts, categories, and select who participated
3. **Track Balances**: View individual and group balances on the Balances page
4. **View History**: Check all expenses with filtering options on the History page
5. **Analyze Spending**: See visual breakdowns on the Charts page

### Key Workflows

#### Adding an Expense
- Navigate to the "Expenses" tab
- Enter the expense amount and description
- Select a category (Food, Transportation, Entertainment, etc.)
- Choose who paid and who participated in the expense
- The app automatically calculates fair splits

#### Managing Group Balances
- Go to the "Balances" tab to see:
  - Your personal balance status
  - How much each group member owes or is owed
  - Settlement suggestions

#### Viewing Expense History
- Use the "History" tab to:
  - See all expenses chronologically
  - Filter by category or person
  - View total spending summaries

#### Analyzing Spending Patterns
- Check the "Charts" tab for:
  - Pie chart breakdown by spending category
  - Visual representation of your expense distribution

## 🎯 Available Scripts

```bash
# Start development server
npm start

# Run test suite
npm test

# Build for production
npm run build

# Eject from Create React App (irreversible)
npm run eject
```

## 📁 Project Structure

```
expense-tracker-app/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Balances.js      # Balance tracking component
│   │   ├── Charts.js        # Data visualization component
│   │   ├── Expenses.js      # Expense input component
│   │   ├── Group.js         # Group management component
│   │   └── History.js       # Expense history component
│   ├── context/
│   │   └── ExpenseContext.js # Global state management
│   ├── data/
│   │   └── dummyData.js     # Sample data and categories
│   ├── App.css              # Main application styles
│   ├── App.js               # Main application component
│   ├── App.test.js          # Application tests
│   ├── index.css            # Global styles
│   ├── index.js             # Application entry point
│   ├── logo.svg             # React logo
│   ├── reportWebVitals.js   # Performance monitoring
│   └── setupTests.js        # Test configuration
├── package.json
├── README.md
└── .gitignore
```

## 🎨 Customization

### Adding New Categories
Edit `src/data/dummyData.js` to add new expense categories:

```javascript
export const categories = [
  'Food',
  'Transportation',
  'Entertainment',
  'Utilities',
  'Healthcare',
  'Other',
  // Add your custom categories here
];
```

### Styling Customization
Modify `src/App.css` to customize the appearance:
- Color schemes
- Layout adjustments
- Animation timings
- Responsive breakpoints

### Feature Extensions
Add new components in the `src/components/` directory and update the routing in `App.js`.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow React best practices and hooks patterns
- Write meaningful commit messages
- Add tests for new features
- Update documentation for API changes
- Ensure responsive design for all new components

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized production build in the `build` folder.

### Deploy to GitHub Pages
```bash
npm install -g gh-pages
npm run deploy
```

### Other Deployment Options
- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag & drop the build folder or connect via Git
- **Firebase**: Use Firebase Hosting for fast, secure hosting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Create React App](https://github.com/facebook/create-react-app)
- Charts powered by [Chart.js](https://www.chartjs.org/)
- Icons and UI inspiration from modern design trends
- React community for excellent documentation and support

## 📞 Support

If you have any questions, suggestions, or need help:

- Open an issue on GitHub
- Check the documentation in this README
- Review the code comments for implementation details

---

**Happy expense tracking! 🎉**
