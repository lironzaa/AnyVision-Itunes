import { FETCH_SONGS, SET_SELECTED_SONG } from '../actions/types';

const initialState = {
  songs: [],
  selectedSong: {},
  resultCount: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_SONGS:
      return {
        ...state,
        songs: action.payload.results,
        resultCount: action.payload.resultCount
      }
    case SET_SELECTED_SONG:
      return {
        ...state,
        selectedSong: action.payload
      }
    default:
      return state;
  }
}