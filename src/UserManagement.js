import React, { useState, useEffect } from 'react';

function UserManagement({ initialUsers = [], handleEditProduct }) {
  const [users, setUsers] = useState(initialUsers);
  const [editingUser, setEditingUser] = useState(null);
  const [newUsername, setNewUsername] = useState('');

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  const handleEditClick = (user) => {
    setEditingUser(user);
    setNewUsername(user.username);
  };

  const handleDeleteClick = (username) => {
    setUsers(users.filter(user => user.username !== username));
  };

  const handleSaveEdit = () => {
    if (newUsername.trim()) {
      const updatedUser = { ...editingUser, username: newUsername };
      handleEditProduct(updatedUser); // Call the edit function passed from props
      setUsers(users.map(user => (user.username === editingUser.username ? updatedUser : user)));
      setEditingUser(null);
      setNewUsername('');
    } else {
      alert("Username cannot be empty");
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setNewUsername('');
  };

  return (
    <section id="userManagementSection">
      <div className="card">
        <h2>User Management</h2>
        <table id="userTable">
          <thead>
            <tr>
              <th>Username</th>
              <th>Login Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index}>
                  <td>
                    {editingUser && editingUser.username === user.username ? (
                      <input 
                        type="text" 
                        value={newUsername} 
                        onChange={(e) => setNewUsername(e.target.value)} 
                      />
                    ) : (
                      user.username
                    )}
                  </td>
                  <td>{user.loginTime}</td>
                  <td>
                    {editingUser && editingUser.username === user.username ? (
                      <>
                        <button onClick={handleSaveEdit}>Save</button>
                        <button onClick={handleCancelEdit}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEditClick(user)}>Edit</button>
                        <button onClick={() => handleDeleteClick(user.username)}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No users available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default UserManagement;