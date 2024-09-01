import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/userService";

const UserList = ({ onEdit }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
      setSuccess("");
    } catch {
      setError("Failed to load users.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setSuccess("User deleted successfully.");
      setError("");
      loadUsers();
    } catch {
      setError("Failed to delete user.");
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="user-list">
      {error && <div className="snackbar error show">{error}</div>}
      {success && <div className="snackbar success show">{success}</div>}
      {currentUsers.map((user) => (
        <div key={user.id} className="user-card">
          <p>{user.email}</p>
          <p>{user.department}</p>
          <button className="edit" onClick={() => onEdit(user)}>
            Edit
          </button>
          <button className="delete" onClick={() => handleDelete(user.id)}>
            Delete
          </button>
        </div>
      ))}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            disabled={currentPage === i + 1}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserList;
