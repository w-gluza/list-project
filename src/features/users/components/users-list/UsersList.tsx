import useSWR from "swr";

type User = {
  id: string;
  name: string;
  email: string;
};

export default function UsersList() {
  const { data: users, error, isLoading } = useSWR<User[]>("/api/users");

  if (error) return <p style={{ color: "red" }}>Failed to load users.</p>;
  if (isLoading) return <p>Please wait. Loading users...</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>EMAIL</th>
        </tr>
      </thead>
      <tbody>
        {(users ?? []).map((u) => (
          <tr key={u.id}>
            <td>{u.id}</td>
            <td>{u.name}</td>
            <td>{u.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
