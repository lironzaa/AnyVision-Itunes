import { FETCH_SONGS } from '../actions/types';

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
    default:
      return state;
  }
}