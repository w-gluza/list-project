import { useState } from "react";
import { Button, Header, Heading, Main } from "../../../common/components";
import UsersList from "../components/users-list/UsersList";
import UserFormModal from "../components/user-form-modal/UserFormModal";
import type { User } from "../types/user";
import { PlusIcon } from "@radix-ui/react-icons";

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
    <>
      <Header>
        <Heading level={1}>User List</Heading>
        <Button onClick={handleCreateUser} rounded="full" icon={<PlusIcon />}>
          Add User
        </Button>
      </Header>
      <Main>
        <UsersList onEditUser={handleEditUser} />
      </Main>
      <UserFormModal
        open={open}
        userId={editingId}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
