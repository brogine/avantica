import React from "react";
import PropTypes from "prop-types";

function SearchResult({ title, link, snippet }) {
  return (
    <div>
      <a target="_blank" rel="noopener noreferrer" href={link}>
        {title}
      </a>
      <p>{snippet}</p>
    </div>
  );
}

SearchResult.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  snippet: PropTypes.string.isRequired,
};

export default SearchResult;
