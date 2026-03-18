import { useEffect, useMemo, useState } from 'react';

function formatValue(value) {
  if (value === null || value === undefined) {
    return '-';
  }

  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }

  if (Array.isArray(value)) {
    return value.length === 0 ? '-' : value.map((item) => formatValue(item)).join(', ');
  }

  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return String(value);
}

function getLabel(record, index) {
  return (
    record?.name ||
    record?.title ||
    record?.username ||
    record?.email ||
    record?.team_name ||
    record?.activity_type ||
    record?.workout_name ||
    `Item ${index + 1}`
  );
}

function getRecordId(record, index) {
  return record?.id ?? record?.pk ?? `row-${index + 1}`;
}

function getSummary(record, keys) {
  if (!record || keys.length === 0) {
    return '-';
  }

  const values = keys
    .map((key) => formatValue(record[key]))
    .filter((value) => value && value !== '-')
    .slice(0, 3);

  return values.length > 0 ? values.join(' | ') : '-';
}

function DataTablePage({ title, endpoint, emptyMessage }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchItems = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      const nextItems = Array.isArray(data) ? data : Array.isArray(data.results) ? data.results : [];
      setItems(nextItems);
    } catch (fetchError) {
      setError(fetchError.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [endpoint]);

  const detailKeys = useMemo(() => {
    const keySet = new Set();
    items.forEach((item) => {
      Object.keys(item || {}).forEach((key) => {
        if (key !== 'id' && key !== 'pk') {
          keySet.add(key);
        }
      });
    });

    const preferredOrder = [
      'name',
      'title',
      'username',
      'email',
      'team_name',
      'activity_type',
      'workout_name',
      'score',
      'duration',
      'status',
      'date',
      'created_at',
      'updated_at',
    ];

    const preferredKeys = preferredOrder.filter((key) => keySet.has(key));
    const remainingKeys = Array.from(keySet).filter((key) => !preferredKeys.includes(key));

    return [...preferredKeys, ...remainingKeys].slice(0, 3);
  }, [items]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return items;
    }

    return items.filter((item) => JSON.stringify(item).toLowerCase().includes(normalizedQuery));
  }, [items, query]);

  return (
    <section className="container py-4">
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-header bg-white border-0 d-flex flex-wrap justify-content-between align-items-center gap-2 py-3">
          <h2 className="h4 fw-semibold mb-0">{title}</h2>
          <a
            className="link-primary text-decoration-none"
            href={endpoint}
            target="_blank"
            rel="noreferrer"
          >
            Open API endpoint
          </a>
        </div>

        <div className="card-body">
          <form className="row g-2 mb-3" onSubmit={(event) => event.preventDefault()}>
            <div className="col-12 col-md-8">
              <label htmlFor={`${title}-search`} className="form-label">
                Search records
              </label>
              <input
                id={`${title}-search`}
                type="search"
                className="form-control"
                placeholder={`Filter ${title.toLowerCase()}...`}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <div className="col-12 col-md-4 d-flex align-items-end gap-2">
              <button type="button" className="btn btn-primary" onClick={fetchItems}>
                Refresh
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => setQuery('')}>
                Clear
              </button>
            </div>
          </form>

          {error && <div className="alert alert-danger">{error}</div>}

          {!error && isLoading && <div className="alert alert-info mb-0">Loading {title.toLowerCase()}...</div>}

          {!error && !isLoading && filteredItems.length === 0 && (
            <div className="alert alert-light border mb-0">{emptyMessage}</div>
          )}

          {!error && !isLoading && filteredItems.length > 0 && (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col" style={{ width: '70px' }}>
                      #
                    </th>
                    <th scope="col" style={{ width: '120px' }}>
                      ID
                    </th>
                    <th scope="col" style={{ minWidth: '220px' }}>
                      Name
                    </th>
                    <th scope="col">Details</th>
                    <th scope="col" className="text-end" style={{ width: '140px' }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item, index) => (
                    <tr key={getRecordId(item, index)}>
                      <th scope="row">{index + 1}</th>
                      <td>{getRecordId(item, index)}</td>
                      <td>{getLabel(item, index)}</td>
                      <td className="text-muted">{getSummary(item, detailKeys)}</td>
                      <td className="text-end">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => setSelectedItem(item)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {selectedItem && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-lg modal-dialog-scrollable" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title h5 mb-0">{title} record details</h3>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setSelectedItem(null)}
                  />
                </div>
                <div className="modal-body">
                  <pre className="mb-0">{JSON.stringify(selectedItem, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedItem(null)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={() => setSelectedItem(null)} />
        </>
      )}
    </section>
  );
}

export default DataTablePage;