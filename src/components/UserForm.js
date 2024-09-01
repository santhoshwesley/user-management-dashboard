import React, { useState } from "react";
import { addUser, editUser } from "../services/userService";

const UserForm = ({ userToEdit, onUserAdded, onCancel }) => {
  const [user, setUser] = useState(
    userToEdit || { firstName: "", lastName: "", email: "", department: "" }
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, department } = user;

    if (!firstName || !lastName || !email || !department) {
      setError("Please fill in all fields.");
      setSuccess("");
      return;
    }

    try {
      if (userToEdit) {
        await editUser(userToEdit.id, user);
      } else {
        await addUser(user);
      }
      setSuccess("User added successfully.");
      setError("");
      setUser({ firstName: "", lastName: "", email: "", department: "" });
      setTimeout(() => {
        setSuccess("");
        onUserAdded();
      }, 3000);
    } catch {
      setError("Failed to save user.");
      setSuccess("");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="user-form">
        {error && <div className="snackbar error show">{error}</div>}
        {success && <div className="snackbar success show">{success}</div>}
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
          <button className="submit" type="submit">
            {userToEdit ? "Update" : "Add"} User
          </button>
          {onCancel && (
            <button className="cancel" type="button" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default UserForm;
