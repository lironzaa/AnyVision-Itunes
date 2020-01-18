const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  searchedQuery: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
});

module.exports = Query = mongoose.model('queries', UserSchema);