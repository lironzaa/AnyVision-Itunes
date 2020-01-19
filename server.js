const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const distDir = __dirname + "/dist/";
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const queries = require('./routes/api/queries');

const app = express();
app.use(express.static(distDir));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth-token, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
})

const db = require('./config/keys').mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log('mongoDB connect'))
  .catch(err => console.log(err));

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/queries', queries);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);