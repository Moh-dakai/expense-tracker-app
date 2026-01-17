import React, { useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';

const Balances = () => {
  const { state } = useContext(ExpenseContext);

  const getBalanceDisplay = (member, balance) => {
    if (balance > 0) {
      return `${member} owes $${balance.toFixed(2)}`;
    } else if (balance < 0) {
      return `${member} is owed $${Math.abs(balance).toFixed(2)}`;
    } else {
      return `${member} is settled up`;
    }
  };

  const getPersonalBalance = () => {
    const balance = state.balances[state.group.currentUser] || 0;
    if (balance > 0) {
      return `You owe $${balance.toFixed(2)}`;
    } else if (balance < 0) {
      return `You are owed $${Math.abs(balance).toFixed(2)}`;
    } else {
      return 'You are settled up';
    }
  };

  return (
    <div className="balances-container">
      <h2>Balances</h2>

      <div className="personal-balance">
        <h3>Your Balance</h3>
        <p className={`balance-amount ${state.balances[state.group.currentUser] > 0 ? 'owe' : state.balances[state.group.currentUser] < 0 ? 'owed' : 'settled'}`}>
          {getPersonalBalance()}
        </p>
      </div>

      <div className="group-balances">
        <h3>Group Balances</h3>
        <ul className="balance-list">
          {state.group.members.map(member => (
            <li key={member} className="balance-item">
              {getBalanceDisplay(member, state.balances[member] || 0)}
            </li>
          ))}
        </ul>
      </div>

      <div className="gamification-summary">
        <h3>Gamification</h3>
        <p>Points: {state.gamification.points}</p>
        <p>Badges: {state.gamification.badges.join(', ')}</p>
        <p>Streaks: Logging {state.gamification.streaks.logging}, Settling {state.gamification.streaks.settling}, No-Spend {state.gamification.streaks.noSpend}</p>
      </div>
    </div>
  );
};

export default Balances;
