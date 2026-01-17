import React, { useState, useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import { categories } from '../data/dummyData';

const Expenses = () => {
  const { state, dispatch } = useContext(ExpenseContext);
  const [expenseForm, setExpenseForm] = useState({
    amount: '',
    category: 'Food',
    description: '',
    paidBy: state.group.currentUser,
    participants: [...state.group.members]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleParticipantToggle = (member) => {
    setExpenseForm(prev => ({
      ...prev,
      participants: prev.participants.includes(member)
        ? prev.participants.filter(p => p !== member)
        : [...prev.participants, member]
    }));
  };

  const calculateSplit = () => {
    const amount = parseFloat(expenseForm.amount);
    if (isNaN(amount) || expenseForm.participants.length === 0) return 0;
    return (amount / expenseForm.participants.length).toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(expenseForm.amount);
    if (!amount || !expenseForm.description.trim()) return;

    const newExpense = {
      id: Date.now(),
      amount,
      category: expenseForm.category,
      description: expenseForm.description.trim(),
      paidBy: expenseForm.paidBy,
      date: new Date().toISOString().split('T')[0],
      participants: expenseForm.participants
    };

    dispatch({
      type: 'ADD_EXPENSE',
      payload: newExpense
    });

    // Reset form
    setExpenseForm({
      amount: '',
      category: 'Food',
      description: '',
      paidBy: state.group.currentUser,
      participants: [...state.group.members]
    });
  };

  return (
    <div className="expenses-container">
      <h2>Add New Expense</h2>

      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label>Amount ($)</label>
          <input
            type="number"
            name="amount"
            value={expenseForm.amount}
            onChange={handleInputChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={expenseForm.category}
            onChange={handleInputChange}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={expenseForm.description}
            onChange={handleInputChange}
            placeholder="What was this expense for?"
            required
          />
        </div>

        <div className="form-group">
          <label>Paid by</label>
          <select
            name="paidBy"
            value={expenseForm.paidBy}
            onChange={handleInputChange}
          >
            {state.group.members.map(member => (
              <option key={member} value={member}>{member}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Split between</label>
          <div className="participants">
            {state.group.members.map(member => (
              <label key={member} className="participant-checkbox">
                <input
                  type="checkbox"
                  checked={expenseForm.participants.includes(member)}
                  onChange={() => handleParticipantToggle(member)}
                />
                {member}
              </label>
            ))}
          </div>
        </div>

        {expenseForm.amount && (
          <div className="split-preview">
            <p>Each person pays: ${calculateSplit()}</p>
          </div>
        )}

        <button type="submit" className="submit-btn">Add Expense</button>
      </form>
    </div>
  );
};

export default Expenses;
