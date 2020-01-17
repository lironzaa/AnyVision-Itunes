import axios from 'axios';

export const searchItems = searchedQuery => {
  return axios.post(`${process.env.REACT_APP_API_URL}search?term=${searchedQuery}&limit=25`)
    .then(searchResults => {
      return searchResults.data;
    })
    .catch(error => {
      console.log(error);
    })
}