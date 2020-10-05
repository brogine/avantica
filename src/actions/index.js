import {
  SEARCH_GOOGLE_REQUEST,
  SEARCH_GOOGLE_RECEIVE,
  SEARCH_BING_REQUEST,
  SEARCH_BING_RECEIVE,
} from "./searchTypes";

import { getRequest } from "../helpers/getRequestHelper";

export const performGoogleSearch = (query, page = 1, items_per_page = 10) => {
  return (dispatch) => {
    const key = process.env.REACT_APP_GOOGLE_KEY;
    const cid = process.env.REACT_APP_GOOGLE_CID;
    const start = (page - 1) * items_per_page;
    const googleAPIUrl = `https://www.googleapis.com/customsearch/v1?key=${key}&cx=${cid}&start=${start}&q=${query}`;
    const googleAPIParams = {};

    getRequest(
      dispatch,
      googleAPIUrl,
      googleAPIParams,
      SEARCH_GOOGLE_REQUEST,
      SEARCH_GOOGLE_RECEIVE,
      page
    );
  };
};

export const performBingSearch = (query, page = 1, items_per_page = 10) => {
  return (dispatch) => {
    const key = process.env.REACT_APP_BING_KEY;
    const cid = process.env.REACT_APP_BING_CID;
    const offset = (page - 1) * items_per_page;
    const bingAPIUrl = `https://api.cognitive.microsoft.com/bingcustomsearch/v7.0/search?customconfig=${cid}&q=${query}&offset=${offset}`;
    const bingAPIParams = { headers: { "Ocp-Apim-Subscription-Key": key } };

    getRequest(
      dispatch,
      bingAPIUrl,
      bingAPIParams,
      SEARCH_BING_REQUEST,
      SEARCH_BING_RECEIVE,
      page
    );
  };
};
