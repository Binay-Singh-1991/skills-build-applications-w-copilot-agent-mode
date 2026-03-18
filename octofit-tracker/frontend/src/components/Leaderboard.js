import DataTablePage from './DataTablePage';

function Leaderboard() {
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  return (
    <DataTablePage
      title="Leaderboard"
      endpoint={endpoint}
      emptyMessage="No leaderboard data found."
    />
  );
}

export default Leaderboard;
