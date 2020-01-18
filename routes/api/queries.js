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

  Query.findOne({ searchedQuery: req.body.searchedQuery, user: req.user })
    .then(query => {
      if (query) {
        Query.updateOne(
          { searchedQuery: query.searchedQuery, user: req.user },
          { $inc: { count: 1, } })
          .then(query => res.json(query))
          .catch(err => res.json(err));
      } else {
        const newQuery = new Query({
          searchedQuery: req.body.searchedQuery,
          count: 1,
          user: req.user
        })
        newQuery.save()
          .then(query => res.json(query))
          .catch(err => res.json(err));
      }
    })
});

router.get('/getTop10', [auth], (req, res) => {
  Query.find({ user: req.user })
    .sort({ count: -1 })
    .limit(10)
    .then(queries => res.json(queries))
    .catch(err => res.json(err))
});

module.exports = router;