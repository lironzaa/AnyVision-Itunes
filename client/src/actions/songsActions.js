import axios from 'axios';

import { FETCH_SONGS, GET_ERRORS, SET_SELECTED_SONG } from './types';

export const fetchSongs = searchedQuery => dispatch => {
  axios.post(`${process.env.REACT_APP_API_URL}search?term=${searchedQuery}&limit=25`)
    .then(searchResults => dispatch({
      type: FETCH_SONGS,
      payload: searchResults.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err
    }));
}

export const setSelectedSong = songData => {
  return {
    type: SET_SELECTED_SONG,
    payload: songData
  }
}