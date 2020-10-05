import React, { useState } from "react";
import { connect } from "react-redux";

import { performGoogleSearch, performBingSearch } from "../actions/index";
import GoogleSearchResultList from "../components/GoogleSearchResultList";
import BingSearchResultList from "../components/BingSearchResultList";

function SearchView(props) {
  let searchInput = React.createRef();
  const [searchType, setSearchType] = useState("all");
  const handleSearch = () => {
    const searchQuery = searchInput.current.value;
    if (searchQuery === "") return;

    switch (searchType) {
      case "all":
        props.dispatch(performGoogleSearch(searchQuery));
        props.dispatch(performBingSearch(searchQuery));
        break;
      case "bing":
        props.dispatch(performBingSearch(searchQuery));
        break;
      case "google":
        props.dispatch(performGoogleSearch(searchQuery));
        break;
      default:
        break;
    }
  };
  const handlePageChange = (type, increment) => {
    switch (type) {
      case "bing":
        const googlePage = increment
          ? props.googleResults.page + 1
          : props.googleResults.page - 1;
        props.dispatch(
          performBingSearch(searchInput.current.value, googlePage)
        );
        break;
      case "google":
        const bingPage = increment
          ? props.bingResults.page + 1
          : props.bingResults.page - 1;
        props.dispatch(
          performGoogleSearch(searchInput.current.value, bingPage)
        );
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div className="wrap">
        <form
          onSubmit={(e) => e.preventDefault()}
          role="search"
          className="search"
        >
          <input
            type="text"
            placeholder="Search"
            ref={searchInput}
            className="searchTerm"
          />
          <select
            className="custom-select sources"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="all">All</option>
            <option value="bing">Bing</option>
            <option value="google">Google</option>
          </select>
          <button onClick={() => handleSearch()} className="searchButton">
            Search
          </button>
          <label>{props.error ? props.error : ""}</label>
        </form>
      </div>
      <div className="search-container">
        <div className="search-child">
          <GoogleSearchResultList
            results={props.googleResults}
            handlePageChange={handlePageChange}
          />
        </div>
        <div className="search-child">
          <BingSearchResultList
            results={props.bingResults}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { googleResults, bingResults } = state.search;
  return {
    googleResults,
    bingResults,
  };
};

export default connect(mapStateToProps)(SearchView);
