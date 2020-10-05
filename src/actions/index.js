import {
  SEARCH_GOOGLE_REQUEST,
  SEARCH_GOOGLE_RECEIVE,
  SEARCH_BING_REQUEST,
  SEARCH_BING_RECEIVE,
} from "./searchTypes";

import { getRequest } from "../helpers/getRequestHelper";

export const performGoogleSearch = (query, page = 1, items_per_page = 10) => {
  return (dispatch) => {
    const key = "AIzaSyC6vqd0kt22ExwoqoXOhCIawp7nOkIY8FU";
    const cid = "2a0053a2d4dc8fc3f";
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
    const key = "1514244b143b413b936a3360dc0d8f39";
    const cid = "5c08670c-c6d2-4d31-a092-5345bf8ca56b";
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
