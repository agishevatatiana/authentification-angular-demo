const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const mongoose = require('mongoose');
const db = "mongodb+srv://test:123@cluster0.hkmbv.mongodb.net/project0?retryWrites=true&w=majority";

const User = require('../models/users.js');

mongoose.connect(db, {useNewUrlParser: true}, err => {
  if (err) {
    throw err;
  } else {
    console.log('success');
  }
});

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  const isTokenInvalid = !token
    || (token && (token.split(' ')[1] === 'null'
    || !jwt.verify(token.split(' ')[1], 'secretKey')));
  if (isTokenInvalid) {
    return res.status(401).send('Unauthorized request');
  }
  if (token) {
    const payload = jwt.verify(token.split(' ')[1], 'secretKey');
    req.userId = payload.subject;
  }
  next();
}

router.get('/', (req, res) => {
  res.send('my first express api');
});

// to check that this works you may send post request
// to 'localhost:3000/api/register' using Postman
// with data: {"email": "a@gmail.com", "password": "123Aa@56"}
router.post('/register', (req, res) => {
  let userData = req.body;
  let user = new User(userData);

  user.save((error, registeredUser) => {
    if (error) {
      console.log('Error! ' + error);
    } else {
      let payload = {subject: registeredUser._id};
      let token = jwt.sign(payload, 'secretKey');
      res.status(200).send({token});
    }
  })
});

// to check that this works you may send post request
// to 'localhost:3000/api/login' using Postman
// with data {"email": "a@gmail.com", "password": "123Aa@56"}
// to get 200 and user data
// ***
// and other data in this format to get 401 with diff kind of errors
router.post('/login', (req, res) => {
  let userData = req.body;

  User.findOne({email: userData.email}, (error, user) => {
    const errorMessage = !user
      ? 'User with such email not found!'
      : (user && user.password !== userData.password)
      ? 'Invalid password!'
      : null;

    if (error) {
      console.log('Error! ' + error);
    } else if (errorMessage) {
      res.status(401).send(errorMessage);
    } else if (user && user.password === userData.password) {
      let payload = {subject: user._id};
      let token = jwt.sign(payload, 'secretKey');
      res.status(200).send({token});
    }
  })
});

router.get('/events', verifyToken, (req,res) => {
  let events = [
    {
      "_id": "1",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ]
  res.json({ status: 200, data: events })
})

router.get('/special', verifyToken, (req, res) => {
  let specialEvents = [
    {
      "_id": "1",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ]
  res.json({ status: 200, data: specialEvents })
})




module.exports = router;
