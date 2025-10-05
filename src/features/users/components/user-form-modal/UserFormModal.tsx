import useSWR from "swr";
import { fetcher } from "../../../../common/utils/fetcher";
import type { User } from "../../types/user";
import type { UserFormValues } from "../../validation/userSchema";
import UserForm from "../user-form/UserForm";
import { Modal } from "../../../../common/components";

function toFormValues(u: User): UserFormValues {
  return {
    country: u.country,
    firstName: u.firstName,
    lastName: u.lastName,
    age: u.age,
  };
}

type UserFormModalProps = {
  open: boolean;
  onClose: () => void;
  userId?: string;
};

export default function UserFormModal({
  open,
  onClose,
  userId,
}: UserFormModalProps) {
  if (!open) return null;
  const mode: "create" | "edit" = userId ? "edit" : "create";
  const {
    data: user,
    isLoading,
    error,
  } = useSWR<User>(userId ? `/api/users/${userId}` : null, fetcher);

  const initial =
    mode === "edit" && user
      ? { id: user.id, ...toFormValues(user) }
      : undefined;

  return (
    <Modal
      open={open}
      onOpenChange={(o) => !o && onClose()}
      title={mode === "create" ? "Add user" : "Edit user"}
      ariaDescription={
        mode === "create"
          ? "Fill out the form to create a new user."
          : "Update the information for the existing user."
      }
    >
      {mode === "edit" && isLoading && <p>Loading…</p>}
      {mode === "edit" && error && (
        <p style={{ color: "$danger" }}>Failed to load user.</p>
      )}

      {(mode === "create" || initial) && (
        <UserForm mode={mode} initialValues={initial} onClose={onClose} />
      )}
    </Modal>
  );
}
