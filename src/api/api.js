import axios from 'axios';

const baseURL = "https://itunes.apple.com/";

export const searchItem = searchedQuery => {
  return axios.post(`${baseURL}search?term=${searchedQuery}&limit=25`)
    .then(searchResults => {
      return searchResults.data;
    })
    .catch(error => {
      console.log(error);
    })
}