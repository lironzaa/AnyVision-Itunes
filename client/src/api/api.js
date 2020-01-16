import axios from 'axios';

const baseURL = "https://itunes.apple.com/";

export const searchItems = searchedQuery => {
  return axios.post(`${baseURL}search?term=${searchedQuery}&limit=25`)
    .then(searchResults => {
      return searchResults.data;
    })
    .catch(error => {
      console.log(error);
    })
}

export const getItem = selectedItemID => {
  return axios.post(`${baseURL}search?track/${selectedItemID}`)
    .then(searchResults => {
      console.log(searchResults);
      return searchResults;
    })
    .catch(error => {
      console.log(error);
    })
}