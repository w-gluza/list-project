import { useState } from "react";
import UsersList from "../components/users-list/UsersList";
import UserFormModal from "../components/user-form-modal/UserFormModal";
import type { User } from "../types/user";

export default function Users() {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | undefined>(undefined);

  const handleEditUser = (user: User) => {
    setEditingId(user.id);
    setOpen(true);
  };

  const handleCreateUser = () => {
    setEditingId(undefined);
    setOpen(true);
  };

  return (
    <div>
      <UsersList onEditUser={handleEditUser} />

      <button onClick={handleCreateUser} style={{ marginTop: 16 }}>
        Add User
      </button>

      <UserFormModal
        open={open}
        userId={editingId}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
