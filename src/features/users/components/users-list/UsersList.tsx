import { useUsers } from "../../hooks/useUsers";
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

interface UsersListProps {
  onEditUser: (user: User) => void;
}

export default function UsersList({ onEditUser }: UsersListProps) {
  const { data: users, isLoading } = useUsers();

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

        <TableBody
          isLoading={isLoading}
          isEmpty={!isLoading && users?.length === 0}
          colSpan={5}
        >
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.country}</TableCell>
              <TableCell align="right">{user.age}</TableCell>
              <TableCell align="right">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onEditUser(user)}
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
