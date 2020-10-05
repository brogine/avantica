import { combineReducers } from "redux";
import {
  SEARCH_GOOGLE_REQUEST,
  SEARCH_GOOGLE_RECEIVE,
  SEARCH_BING_REQUEST,
  SEARCH_BING_RECEIVE,
} from "../actions/searchTypes";

const INITIAL_STATE = {
  googleResults: {
    itemsCount: 0,
    loading: false,
    error: null,
    page: 1,
    data: [],
  },
  bingResults: {
    itemsCount: 0,
    loading: false,
    error: null,
    page: 1,
    data: [],
  },
};

const search = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_GOOGLE_REQUEST:
      return {
        ...state,
        googleResults: {
          ...state.googleResults,
          loading: true,
          page: action.page,
        },
      };
    case SEARCH_GOOGLE_RECEIVE:
      const {
        payload: googlePayload,
        error: googleError,
        page: googlePage,
      } = action;
      let googleResults = {};
      if (googleError) {
        googleResults = Object.assign({}, state.googleResults, {
          data: googlePayload,
          itemsCount: 0,
          error: googleError,
          page: googlePage,
          loading: false,
        });
      } else {
        googleResults = Object.assign({}, state.googleResults, {
          data: googlePayload.data.items,
          itemsCount: googlePayload.data.searchInformation.totalResults,
          error: googleError,
          page: googlePage,
          loading: false,
        });
      }
      return {
        ...state,
        googleResults,
      };
    case SEARCH_BING_REQUEST:
      return {
        ...state,
        bingResults: { ...state.bingResults, loading: true, page: action.page },
      };
    case SEARCH_BING_RECEIVE:
      const { payload: bingPayload, error: bingError, page: bingPage } = action;
      const bingResults = Object.assign({}, state.bingResults, {
        data: bingPayload,
        itemsCount: 0,
        error: bingError,
        page: bingPage,
        loading: false,
      });
      return {
        ...state,
        bingResults,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  search,
});

export default rootReducer;
