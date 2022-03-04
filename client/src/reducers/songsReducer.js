import { FETCH_SONGS, SET_SELECTED_SONG, GET_TOP_10_QUERIES, CLEAR_SONGS } from '../actions/types';

const initialState = {
    songs: [],
    selectedSong: {},
    resultCount: null,
    top10Queries: [],
    isShowingTop10: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_SONGS:
            return {
                ...state,
                songs: action.payload.results,
                resultCount: action.payload.resultCount,
                isShowingTop10: false
            }
        case SET_SELECTED_SONG:
            return {
                ...state,
                selectedSong: action.payload
            }
        case GET_TOP_10_QUERIES:
            return {
                ...state,
                top10Queries: action.payload,
                isShowingTop10: true
            }
        case CLEAR_SONGS:
            return {
                ...state,
                songs: [],
                selectedSong: {},
                resultCount: null,
                top10Queries: [],
                isShowingTop10: null
            }
        default:
            return state;
    }
}