const express = require('express')
// const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;


// app.use(morgan('dev'));
// app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/listings/:id/', express.static(path.join(__dirname, 'public')));

//bryan
app.use('/reviews', (req, res) => {
  console.log(req.originalUrl);
  axios.get(`http://reviews:3001${req.originalUrl}`)
    .then(res => res.data)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send();
    });
});

//eric
app.use('/overview', (req, res) => {
  console.log(req.originalUrl);
  axios.get(`http://overview:3002${req.originalUrl}`)
    .then(res => res.data)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send();
    });
});

//kirk
app.use('/nearby', (req, res) => {
  console.log(req.originalUrl);
  axios.get(`http://nearby:3003${req.originalUrl}`)
    .then(res => res.data)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send();
    });
});

//kyle
app.use('/q-and-a', (req, res) => {
  axios.get(`http://localhost:3004/bundle.js`)
    .then(res => res.data)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      // console.log(err);
      res.send();
    });
});

//zack
app.use('/recommendations', (req, res) => {
  console.log(req.originalUrl);
  axios.get(`http://recommendations:3005${req.originalUrl}`)
    .then(res => res.data)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send();
    });
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`)
});