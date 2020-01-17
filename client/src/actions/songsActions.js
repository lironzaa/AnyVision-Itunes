import axios from 'axios';

import { FETCH_SONGS } from './types';

export const fetchSongs = searchedQuery => dispatch => {
  axios.post(`${process.env.REACT_APP_API_URL}search?term=${searchedQuery}&limit=25`)
    .then(searchResults => dispatch({
      type: FETCH_SONGS,
      payload: searchResults.data
    }))
    .catch(err => dispatch({
      type: FETCH_SONGS,
      payload: err.response.data
    }));
}

/* export const searchItems = searchedQuery => {
  return axios.post(`${process.env.REACT_APP_API_URL}search?term=${searchedQuery}&limit=25`)
    .then(searchResults => {
      return searchResults.data;
    })
    .catch(error => {
      console.log(error);
    })
} */