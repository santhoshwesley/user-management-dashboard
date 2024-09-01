import React, { useState } from "react";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import UserEdit from "./components/UserEdit";
import "./styles/App.css";

const App = () => {
  const [userToEdit, setUserToEdit] = useState(null);
  const [reloadUsers, setReloadUsers] = useState(false);

  const handleUserAdded = () => {
    setUserToEdit(null);
    setReloadUsers(!reloadUsers);
  };

  const handleUserEdited = () => {
    setUserToEdit(null);
    setReloadUsers(!reloadUsers);
  };

  const handleEdit = (user) => {
    setUserToEdit(user);
  };

  return (
    <div className="app-container">
      <h1>User Management Dashboard</h1>
      {userToEdit ? (
        <UserEdit
          userId={userToEdit.id}
          onUserEdited={handleUserEdited}
          onCancel={() => setUserToEdit(null)}
        />
      ) : (
        <UserForm onUserAdded={handleUserAdded} />
      )}
      <UserList onEdit={handleEdit} key={reloadUsers} />
    </div>
  );
};

export default App;
