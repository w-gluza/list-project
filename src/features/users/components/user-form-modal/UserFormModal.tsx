import { useUser } from "../../hooks/useUser";
import type { User } from "../../types/user";
import type { UserFormValues } from "../../validation/userSchema";
import UserForm from "../user-form/UserForm";
import { Modal } from "../../../../common/components";

function toFormValues(user: User): UserFormValues {
  return {
    country: user.country,
    firstName: user.firstName,
    lastName: user.lastName,
    age: user.age,
  };
}

interface UserFormModalProps {
  onClose: () => void;
  userId?: string;
}

export default function UserFormModal({ userId, onClose }: UserFormModalProps) {
  const mode = userId ? "edit" : "create";
  const { data: user, isLoading, isError } = useUser(userId);

  const initial =
    mode === "edit" && user
      ? { id: user.id, ...toFormValues(user) }
      : undefined;

  return (
    <Modal
      open
      onOpenChange={(isOpen) => !isOpen && onClose()}
      title={mode === "create" ? "Add User" : "Edit User"}
      ariaDescription={
        mode === "create"
          ? "Fill out the form to create a new user."
          : "Update the information for the existing user."
      }
      loading={isLoading}
      error={isError ? "Something went wrong" : undefined}
    >
      {(mode === "create" || initial) && (
        <UserForm mode={mode} initialValues={initial} onClose={onClose} />
      )}
    </Modal>
  );
}
