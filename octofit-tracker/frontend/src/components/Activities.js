import DataTablePage from './DataTablePage';

function Activities() {
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  return <DataTablePage title="Activities" endpoint={endpoint} emptyMessage="No activities found." />;
}

export default Activities;
