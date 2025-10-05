import useSWR from "swr";
import type { User } from "../../types/user";
import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableWrapper,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "../../../../common/components";

type Props = {
  onEditUser: (user: User) => void;
};

export default function UsersList({ onEditUser }: Props) {
  const { data: users, error, isLoading } = useSWR<User[]>("/api/users");

  if (error) return <p style={{ color: "$danger" }}>Failed to load users.</p>;
  if (isLoading) return <p>Please wait. Loading users...</p>;

  return (
    <TableWrapper>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>First Name</TableHeaderCell>
            <TableHeaderCell>Last Name</TableHeaderCell>
            <TableHeaderCell>Age</TableHeaderCell>
            <TableHeaderCell>Country</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {(users ?? []).map((u) => (
            <TableRow key={u.id}>
              <TableCell>{u.firstName}</TableCell>
              <TableCell>{u.lastName}</TableCell>
              <TableCell>{u.age}</TableCell>
              <TableCell>{u.country}</TableCell>
              <TableCell>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onEditUser(u)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableWrapper>
  );
}
