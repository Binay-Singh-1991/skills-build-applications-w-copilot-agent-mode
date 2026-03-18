import DataTablePage from './DataTablePage';

function Teams() {
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  return <DataTablePage title="Teams" endpoint={endpoint} emptyMessage="No teams found." />;
}

export default Teams;
