import useSWR from "swr";
import type { User } from "../../types/user";

type Props = {
  onEditUser: (user: User) => void;
};

export default function UsersList({ onEditUser }: Props) {
  const { data: users, error, isLoading } = useSWR<User[]>("/api/users");

  if (error) return <p style={{ color: "red" }}>Failed to load users.</p>;
  if (isLoading) return <p>Please wait. Loading users...</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>FIRST NAME</th>
          <th>LAST NAME</th>
          <th>AGE</th>
          <th>COUNTRY</th>
          <th>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {(users ?? []).map((u) => (
          <tr key={u.id}>
            <td>{u.firstName}</td>
            <td>{u.lastName}</td>
            <td>{u.age}</td>
            <td>{u.country}</td>
            <td>
              <button onClick={() => onEditUser(u)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
