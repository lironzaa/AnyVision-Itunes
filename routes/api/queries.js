const express = require('express');
const router = express.Router();
const Query = require('../../models/Query');
const validateSearchInput = require('../../validation/query');
const auth = require('../../middleware/auth');

router.post('/search', [auth], (req, res) => {
  const { errors, isValid } = validateSearchInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Query.findOne({ searchedQuery: req.body.searchedQuery })
    .then(query => {
      if (query) {
        Query.updateOne(
          { searchedQuery: query.searchedQuery },
          { $inc: { count: 1, } })
          .then(query => res.json(query))
          .catch(err => console.log(err));
      } else {
        const newQuery = new Query({
          searchedQuery: req.body.searchedQuery,
          count: 1,
          user: req.user
        })
        newQuery.save()
          .then(query => res.json(query))
          .catch(err => console.log(err));
      }
    })
});

router.get('/getTop10', [auth], (req, res) => {
  Query.find()
    .sort({ count: -1 })
    .limit(10)
    .then(query => res.json(query))
    .catch(err => console.log(err))
});

module.exports = router;