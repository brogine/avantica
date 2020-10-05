import React from "react";
import SearchResult from "./SearchResult";
import Loader from "./Loader";

function GoogleSearchResultList({ results, handlePageChange }) {
  if (results.data.length === 0) return null;

  return (
    <div>
      <h2>Google results</h2>
      <p>Total matches: {results.itemsCount}</p>

      {results.loading && <Loader />}

      <ul>
        {results.data.map((res, index) => {
          return (
            <li key={`G${index}`}>
              <SearchResult
                title={res.title}
                link={res.title}
                snippet={res.snippet}
              />
            </li>
          );
        })}
      </ul>

      {results.page > 1 && (
        <button onClick={() => handlePageChange("google", false)}>
          Previous Page
        </button>
      )}
      <button onClick={() => handlePageChange("google", true)}>
        Next page
      </button>
    </div>
  );
}

export default GoogleSearchResultList;
