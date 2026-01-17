import React, { useState, useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';

const Group = () => {
  const { state, dispatch } = useContext(ExpenseContext);
  const [newMember, setNewMember] = useState('');

  const addMember = () => {
    if (newMember.trim() && !state.group.members.includes(newMember.trim())) {
      dispatch({
        type: 'ADD_MEMBER',
        payload: newMember.trim()
      });
      setNewMember('');
    }
  };

  const removeMember = (member) => {
    if (state.group.members.length > 1) {
      dispatch({
        type: 'REMOVE_MEMBER',
        payload: member
      });
    }
  };

  return (
    <div className="group-container">
      <h2>Group Management</h2>

      <div className="group-info">
        <h3>Group: {state.group.name}</h3>
        <p>Current User: {state.group.currentUser}</p>
      </div>

      <div className="members-list">
        <h3>Members</h3>
        <ul>
          {state.group.members.map(member => (
            <li key={member}>
              {member}
              {member !== state.group.currentUser && (
                <button onClick={() => removeMember(member)}>Remove</button>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="add-member">
        <input
          type="text"
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
          placeholder="New member name"
        />
        <button onClick={addMember}>Add Member</button>
      </div>
    </div>
  );
};

export default Group;
