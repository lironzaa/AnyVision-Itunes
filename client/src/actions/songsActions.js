import axios from 'axios';

import { FETCH_SONGS, GET_ERRORS, SET_SELECTED_SONG, CLEAR_ERRORS, GET_TOP_10_QUERIES } from './types';

export const fetchSongs = searchedQuery => dispatch => {
  dispatch(clearErrors());
  axios.post(`${process.env.REACT_APP_API_URL}search?term=${searchedQuery}&limit=25`)
    .then(searchResults => dispatch({
      type: FETCH_SONGS,
      payload: searchResults.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err
    }));
  const searchedQueryObject = {
    searchedQuery
  };
  axios.post(`${process.env.REACT_APP_BACKEND_URL}queries/search`, searchedQueryObject)
    .then(response => {

    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: {
          message: 'Search field is required'
        }
      })
    });
}

export const setSelectedSong = songData => {
  return {
    type: SET_SELECTED_SONG,
    payload: songData
  }
}

export const getTop10Queries = () => dispatch => {
  axios.get(`${process.env.REACT_APP_BACKEND_URL}queries/getTop10`)
    .then(top10QueriesResults => dispatch({
      type: GET_TOP_10_QUERIES,
      payload: top10QueriesResults.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err
    }));
}

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}