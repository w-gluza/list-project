import { useState } from "react";
import UserForm from "../components/user-form/UserForm";
import UsersList from "../components/users-list/UsersList";
import type { User } from "../types/user";

const Users = () => {
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isFormOpen, setFormOpen] = useState(false);

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormOpen(true);
  };

  const handleCreateUser = () => {
    setEditingUser(null);
    setFormOpen(true);
  };

  return (
    <div>
      <UsersList onEditUser={handleEditUser} />
      <button onClick={handleCreateUser}>Add User</button>
      <br />
      <br />
      <br />
      {/* TODO: Needs to be in a modal */}
      {isFormOpen && (
        <div>
          <UserForm
            mode={editingUser ? "edit" : "create"}
            initialValues={editingUser ?? undefined}
            onClose={() => setFormOpen(false)}
          />
        </div>
      )}
    </div>
  );
};
export default Users;
