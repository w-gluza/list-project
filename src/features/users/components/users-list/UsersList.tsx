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
            <TableHeaderCell>Country</TableHeaderCell>
            <TableHeaderCell align="right">Age</TableHeaderCell>
            <TableHeaderCell align="right">Actions</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {(users ?? []).map((u) => (
            <TableRow key={u.id}>
              <TableCell>{u.firstName}</TableCell>
              <TableCell>{u.lastName}</TableCell>
              <TableCell>{u.country}</TableCell>
              <TableCell align="right">{u.age}</TableCell>
              <TableCell align="right">
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
