import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ExpenseProvider } from './context/ExpenseContext';
import Group from './components/Group';
import Expenses from './components/Expenses';
import Balances from './components/Balances';
import History from './components/History';
import Charts from './components/Charts';
import './App.css';

function App() {
  return (
    <ExpenseProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <h1>Expense Tracker</h1>
            <nav>
              <Link to="/">Group</Link>
              <Link to="/expenses">Expenses</Link>
              <Link to="/balances">Balances</Link>
              <Link to="/history">History</Link>
              <Link to="/charts">Charts</Link>
            </nav>
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Group />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/balances" element={<Balances />} />
              <Route path="/history" element={<History />} />
              <Route path="/charts" element={<Charts />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ExpenseProvider>
  );
}

export default App;
