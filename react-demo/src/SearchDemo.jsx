import { useState } from 'react';
import { useDebouncedCallback } from './useDebouncedCallback';
import './SearchDemo.css';

function SearchDemo() {
  const [searchValue, setSearchValue] = useState('');

  // Simulate API call - debounced to avoid excessive calls
  const handleSearch = useDebouncedCallback(
    (value) => {
      console.log('Searching for:', value);
    },
    500, // Wait 500ms after user stops typing
    { trailing: true } // Fire after user stops typing
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    handleSearch(value);
  };

  const handleCancel = () => {
    handleSearch.cancel();
    console.log('Search cancelled');
  };

  const handleFlush = () => {
    handleSearch.flush();
    console.log('Search flushed (executed immediately)');
  };

  return (
    <div className="search-demo">
      <h1>Debounced Search Demo</h1>
      <p className="description">
        Type in the search box below. The search will be triggered 500ms after you stop typing.
        <br />
        Check the console to see the debounced search calls.
      </p>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Start typing to search..."
          value={searchValue}
          onChange={handleInputChange}
        />
        <div className="button-group">
          <button className="btn btn-cancel" onClick={handleCancel}>
            Cancel Pending Search
          </button>
          <button className="btn btn-flush" onClick={handleFlush}>
            Search Now (Flush)
          </button>
        </div>
      </div>

      <div className="current-value">
        <strong>Current value:</strong> {searchValue || <em>(empty)</em>}
      </div>

      <div className="info-box">
        <h3>How it works:</h3>
        <ul>
          <li>Type in the search box</li>
          <li>Search executes 500ms after you stop typing</li>
          <li>Click "Cancel" to prevent pending search</li>
          <li>Click "Flush" to execute search immediately</li>
          <li>Open browser console to see the logs</li>
        </ul>
      </div>
    </div>
  );
}

export default SearchDemo;
