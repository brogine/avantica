import Axios from "axios";

export const getRequest = (
  dispatch,
  APIUrl,
  APIParams,
  search_type,
  receive_type,
  page
) => {
  dispatch({ type: search_type, page: page });

  Axios.get(APIUrl, APIParams)
    .then((response) => {
      return dispatch({
        type: receive_type,
        payload: response,
        page,
        error: null,
      });
    })
    .catch((error) => {
      console.log(error);
      return dispatch({
        type: receive_type,
        payload: [],
        error: "Search failed",
      });
    });
};
