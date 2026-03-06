import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { dummyExpenses, dummyGamification, categories } from '../data/dummyData';

const ExpenseContext = createContext();

const calculateBalances = (expenses, members) => {
  const balances = {};
  members.forEach(member => balances[member] = 0);
  expenses.forEach(expense => {
    const splitAmount = expense.amount / expense.participants.length;
    expense.participants.forEach(participant => {
      if (participant !== expense.paidBy) {
        balances[participant] = (balances[participant] || 0) - splitAmount;
        balances[expense.paidBy] = (balances[expense.paidBy] || 0) + splitAmount;
      }
    });
  });
  return balances;
};

const initialMembers = ['Alice', 'Bob', 'Charlie'];

const defaultState = {
  group: {
    name: 'Flat 3B',
    members: initialMembers,
    currentUser: 'Alice'
  },
  expenses: dummyExpenses,
  balances: calculateBalances(dummyExpenses, initialMembers),
  gamification: dummyGamification,
  categories,
  budget: { monthly: 500, currency: 'USD' }
};

const loadState = () => {
  try {
    const saved = localStorage.getItem('expenseTrackerState');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Recalculate balances to ensure they are in sync
      parsed.balances = calculateBalances(parsed.expenses, parsed.group.members);
      return parsed;
    }
  } catch (e) {
    console.warn('Could not load saved state', e);
  }
  return defaultState;
};

const initialState = loadState();

const expenseReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE': {
      const newExpense = action.payload;
      const updatedExpenses = [...state.expenses, newExpense];
      const newBalances = calculateBalances(updatedExpenses, state.group.members);
      const updatedGamification = {
        ...state.gamification,
        points: state.gamification.points + 10,
        streaks: { ...state.gamification.streaks, logging: state.gamification.streaks.logging + 1 }
      };
      return { ...state, expenses: updatedExpenses, balances: newBalances, gamification: updatedGamification };
    }

    case 'DELETE_EXPENSE': {
      const updatedExpenses = state.expenses.filter(e => e.id !== action.payload);
      const newBalances = calculateBalances(updatedExpenses, state.group.members);
      return { ...state, expenses: updatedExpenses, balances: newBalances };
    }

    case 'SETTLE_BALANCE': {
      const { from, to } = action.payload;
      // Create a settle-up expense record
      const settleExpense = {
        id: Date.now(),
        amount: Math.abs(state.balances[from]),
        category: 'Settlement',
        description: `${from} settled up with ${to}`,
        paidBy: from,
        date: new Date().toISOString().split('T')[0],
        participants: [from, to],
        isSettlement: true
      };
      const updatedExpenses = [...state.expenses, settleExpense];
      const newBalances = calculateBalances(updatedExpenses, state.group.members);
      const updatedGamification = {
        ...state.gamification,
        points: state.gamification.points + 15,
        streaks: { ...state.gamification.streaks, settling: state.gamification.streaks.settling + 1 }
      };
      return { ...state, expenses: updatedExpenses, balances: newBalances, gamification: updatedGamification };
    }

    case 'ADD_MEMBER': {
      const newMember = action.payload;
      const updatedMembers = [...state.group.members, newMember];
      const newBalances = { ...state.balances, [newMember]: 0 };
      return { ...state, group: { ...state.group, members: updatedMembers }, balances: newBalances };
    }

    case 'REMOVE_MEMBER': {
      const memberToRemove = action.payload;
      const filteredMembers = state.group.members.filter(m => m !== memberToRemove);
      const updatedExpenses = state.expenses.filter(e => e.paidBy !== memberToRemove && !e.participants.includes(memberToRemove));
      const newBalances = calculateBalances(updatedExpenses, filteredMembers);
      return {
        ...state,
        group: { ...state.group, members: filteredMembers },
        expenses: updatedExpenses,
        balances: newBalances
      };
    }

    case 'SET_CURRENT_USER': {
      return { ...state, group: { ...state.group, currentUser: action.payload } };
    }

    case 'SET_BUDGET': {
      return { ...state, budget: { ...state.budget, ...action.payload } };
    }

    case 'SET_GROUP_NAME': {
      return { ...state, group: { ...state.group, name: action.payload } };
    }

    default:
      return state;
  }
};

export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  // Persist state to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem('expenseTrackerState', JSON.stringify(state));
    } catch (e) {
      console.warn('Could not save state', e);
    }
  }, [state]);

  return (
    <ExpenseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) throw new Error('useExpense must be used within an ExpenseProvider');
  return context;
};

export { ExpenseContext };
