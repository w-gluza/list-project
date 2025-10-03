import UserForm from "../components/user-form/UserForm";
import UsersList from "../components/users-list/UsersList";

const Users = () => {
  return (
    <div>
      <UsersList />

      {/* TODO: Needs to be in a modal */}
      <UserForm />
    </div>
  );
};
export default Users;
