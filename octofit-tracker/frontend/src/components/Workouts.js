import DataTablePage from './DataTablePage';

function Workouts() {
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  return <DataTablePage title="Workouts" endpoint={endpoint} emptyMessage="No workouts found." />;
}

export default Workouts;
