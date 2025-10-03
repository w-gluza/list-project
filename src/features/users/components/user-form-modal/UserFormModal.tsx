import useSWR from "swr";
import { fetcher } from "../../../../common/utils/fetcher";
import type { User } from "../../types/user";
import type { UserFormValues } from "../../validation/userSchema";
import UserForm from "../user-form/UserForm";

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
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          padding: 16,
          borderRadius: 8,
          minWidth: 360,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <h3 style={{ margin: 0 }}>
            {mode === "create" ? "Add user" : "Edit user"}
          </h3>
          <button onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {mode === "edit" && isLoading && <p>Loading…</p>}
        {mode === "edit" && error && (
          <p style={{ color: "red" }}>Failed to load user.</p>
        )}

        {(mode === "create" || initial) && (
          <UserForm mode={mode} initialValues={initial} onClose={onClose} />
        )}
      </div>
    </div>
  );
}
