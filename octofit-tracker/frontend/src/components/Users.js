import DataTablePage from './DataTablePage';

function Users() {
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  return <DataTablePage title="Users" endpoint={endpoint} emptyMessage="No users found." />;
}

export default Users;
