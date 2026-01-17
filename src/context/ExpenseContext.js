import React, { createContext, useReducer, useContext } from 'react';
import { dummyExpenses, dummyGamification, categories } from '../data/dummyData';

const ExpenseContext = createContext();

// Function to calculate balances from expenses
const calculateBalances = (expenses, members) => {
  const balances = {};
  members.forEach(member => balances[member] = 0);

  expenses.forEach(expense => {
    const splitAmount = expense.amount / expense.participants.length;
    expense.participants.forEach(participant => {
      if (participant !== expense.paidBy) {
        balances[participant] -= splitAmount;
        balances[expense.paidBy] += splitAmount;
      }
    });
  });

  return balances;
};

const initialMembers = ['Alice', 'Bob', 'Charlie'];

const initialState = {
  group: {
    name: 'Flat 3B',
    members: initialMembers,
    currentUser: 'Alice'
  },
  expenses: dummyExpenses,
  balances: calculateBalances(dummyExpenses, initialMembers),
  gamification: dummyGamification,
  categories
};

const expenseReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      const newExpense = action.payload;
      const updatedExpenses = [...state.expenses, newExpense];

      // Calculate new balances
      const newBalances = { ...state.balances };
      const splitAmount = newExpense.amount / newExpense.participants.length;

      newExpense.participants.forEach(participant => {
        if (participant !== newExpense.paidBy) {
          newBalances[participant] = (newBalances[participant] || 0) - splitAmount;
          newBalances[newExpense.paidBy] = (newBalances[newExpense.paidBy] || 0) + splitAmount;
        }
      });

      // Update gamification
      const updatedGamification = { ...state.gamification };
      updatedGamification.points += 10; // Points for logging expense
      updatedGamification.streaks.logging += 1;

      return {
        ...state,
        expenses: updatedExpenses,
        balances: newBalances,
        gamification: updatedGamification
      };

    case 'SETTLE_BALANCE':
      // Simple settle: assume settling with one person
      const { from, to, amount } = action.payload;
      const settledBalances = { ...state.balances };
      settledBalances[from] += amount;
      settledBalances[to] -= amount;

      const settledGamification = { ...state.gamification };
      settledGamification.points += 15; // Points for settling
      settledGamification.streaks.settling += 1;

      return {
        ...state,
        balances: settledBalances,
        gamification: settledGamification
      };

    case 'ADD_MEMBER':
      const newMember = action.payload;
      const updatedMembers = [...state.group.members, newMember];
      const updatedBalances = { ...state.balances };
      updatedBalances[newMember] = 0;

      return {
        ...state,
        group: {
          ...state.group,
          members: updatedMembers
        },
        balances: updatedBalances
      };

    case 'REMOVE_MEMBER':
      const memberToRemove = action.payload;
      const filteredMembers = state.group.members.filter(m => m !== memberToRemove);
      const { [memberToRemove]: removed, ...remainingBalances } = state.balances;

      return {
        ...state,
        group: {
          ...state.group,
          members: filteredMembers
        },
        balances: remainingBalances
      };

    default:
      return state;
  }
};

export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  return (
    <ExpenseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
};

export { ExpenseContext };
