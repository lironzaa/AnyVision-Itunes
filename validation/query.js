const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateSearchInput(data) {
  let errors = {};

  data.searchedQuery = !isEmpty(data.searchedQuery) ? data.searchedQuery : '';

  if (Validator.isEmpty(data.searchedQuery)) {
    errors.searchedQuery = 'Search field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }

}