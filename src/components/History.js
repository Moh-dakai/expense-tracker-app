import React, { useState, useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import { categories } from '../data/dummyData';

const History = () => {
  const { state } = useContext(ExpenseContext);
  const [filter, setFilter] = useState({
    category: 'All',
    person: 'All'
  });

  const filteredExpenses = state.expenses.filter(expense => {
    const categoryMatch = filter.category === 'All' || expense.category === filter.category;
    const personMatch = filter.person === 'All' ||
      expense.paidBy === filter.person ||
      expense.participants.includes(filter.person);
    return categoryMatch && personMatch;
  });

  const totalSpent = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="history-container">
      <h2>Expense History</h2>

      <div className="filters">
        <div className="filter-group">
          <label>Category:</label>
          <select
            value={filter.category}
            onChange={(e) => setFilter(prev => ({ ...prev, category: e.target.value }))}
          >
            <option value="All">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Person:</label>
          <select
            value={filter.person}
            onChange={(e) => setFilter(prev => ({ ...prev, person: e.target.value }))}
          >
            <option value="All">All People</option>
            {state.group.members.map(member => (
              <option key={member} value={member}>{member}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="summary">
        <p>Showing {filteredExpenses.length} expenses</p>
        <p>Total: ${totalSpent.toFixed(2)}</p>
      </div>

      <div className="expenses-list">
        {filteredExpenses.length === 0 ? (
          <p className="no-expenses">No expenses found matching your filters.</p>
        ) : (
          filteredExpenses
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map(expense => (
              <div key={expense.id} className="expense-item">
                <div className="expense-header">
                  <span className="category">{expense.category}</span>
                  <span className="amount">${expense.amount.toFixed(2)}</span>
                </div>
                <div className="expense-details">
                  <p className="description">{expense.description}</p>
                  <p className="meta">
                    Paid by {expense.paidBy} on {new Date(expense.date).toLocaleDateString()}
                  </p>
                  <p className="participants">
                    Split between: {expense.participants.join(', ')}
                  </p>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default History;
