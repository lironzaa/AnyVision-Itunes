import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { clearErrors } from './songsActions';

import { GET_ERRORS, SET_CURRENT_USER, CLEAR_SONGS } from './types';

export const registerUser = (userData, history) => dispatch => {
  axios.post(`${process.env.REACT_APP_BACKEND_URL}users/register`, userData)
    .then(res => history.push('/login'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
}

export const loginUser = (userData, history) => dispatch => {
  axios.post(`${process.env.REACT_APP_BACKEND_URL}users/login`, userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      history.push('/');
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

export const clearSongs = () => {
  return {
    type: CLEAR_SONGS
  }
}

export const logoutUser = history => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  dispatch(clearSongs({}));
  dispatch(clearErrors({}));
  history.push('/login');
}