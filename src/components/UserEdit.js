import React, { useState, useEffect } from "react";
import { getUser, editUser } from "../services/userService";

const UserEdit = ({ userId, onUserEdited, onCancel }) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    loadUser();
  }, [userId]);

  const loadUser = async () => {
    try {
      const response = await getUser(userId);
      setUser(response.data);
    } catch {
      setError("Failed to load user.");
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editUser(userId, user);
      onUserEdited();
    } catch {
      setError("Failed to update user.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      {error && <p className="error">{error}</p>}

      <input
        type="text"
        name="firstName"
        value={user.firstName}
        onChange={handleChange}
        placeholder="First Name"
      />
      <input
        type="text"
        name="lastName"
        value={user.lastName}
        onChange={handleChange}
        placeholder="Last Name"
      />
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="text"
        name="department"
        value={user.department}
        onChange={handleChange}
        placeholder="Department"
      />
      <div className="user-form-buttons">
        <button type="submit" className="submit">
          Save
        </button>
        <button type="button" className="cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UserEdit;
