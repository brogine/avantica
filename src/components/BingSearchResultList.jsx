import React from "react";
import SearchResult from "./SearchResult";
import Loader from "./Loader";

function BingSearchResultList({ results, handlePageChange }) {
  if (results.data.length === 0) return null;

  const { webPages } = results.data.data;

  return (
    <div>
      <h2>Bing results</h2>
      <p>Total matches: {webPages.totalEstimatedMatches}</p>

      {results.loading && <Loader />}

      <ul>
        {webPages.value.map((res, index) => {
          return (
            <li key={`B${index}`}>
              <SearchResult
                title={res.name}
                link={res.url}
                snippet={res.snippet}
              />
            </li>
          );
        })}
      </ul>

      {results.page > 1 && (
        <button onClick={() => handlePageChange("bing", false)}>
          Previous Page
        </button>
      )}
      <button onClick={() => handlePageChange("bing", true)}>Next page</button>
    </div>
  );
}

export default BingSearchResultList;
