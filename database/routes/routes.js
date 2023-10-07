const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const router = express.Router();
module.exports = router;
const commentModel = require('../models/comment-model');
const registerModel = require('../models/register-model');
const loginModel = require('../models/login-model');
const movieModel = require('../models/movie-model');

const generateToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

router.post('/authUser', async (req, res) => {
  const token = req.headers['x-access-token'];
  const authResult = verifyToken(token);
  if (!authResult) {
    return res.status(500).json({message: 'Invalid credentials'});
  } 
  res.status(200).json({message: 'Authorized'});
});

router.post('/register', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const data = new registerModel({
    email: req.body.email,
    name: req.body.name,
    password: hashedPassword
  });
  try {
    await data.save();
    res.status(200).json({message: 'Account created successfully'});
  } catch (error) {
    if (error.message.includes('E11000')) {
      return res.status(400).json({message: 'Email already exists'});
    }
    res.status(500).json({message: error.message});
  }
});

router.post('/login', async (req, res) => {
  const data = new loginModel({
    email: req.body.email,
    password: req.body.password
  });
  try {
    const user = await registerModel.findOne({ 'email': req.body.email });
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }
    const passwordMatch = bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    const token = generateToken(user);
    res.status(200).json({ name: user.name, email: user.email, token: token });
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});


router.post('/post', async (req, res) => {
  console.log('req.body', req.body);
  const data = new commentModel({
    name: req.body.name,
    title: req.body.title,
    rating: req.body.rating,
    comment: req.body.comment,
  });
  const token = req.headers['x-access-token'];
  const authResult = verifyToken(token);
  if (!authResult) {
    return res.status(500).json({message: 'Invalid credentials'});
  }
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave)
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

/* WIP delete post
router.delete('/post', async (req, res) => {
  const data = new commentModel({
    name: req.body.name,
    title: req.body.title,
    rating: req.body.rating,
    comment: req.body.comment,
    senderID: req.body.senderID
  });

  try {
    const user = await registerModel.findById(req.body.senderID);
    if (!user) {
      res.status(500).json({message: 'Invalid credentials'});
    } else {
      const dataToSave = await data.save();
      res.status(200).json(dataToSave)
    }
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});
*/

router.get('/getPosts', async (req, res) => {
  try {
    const data = await commentModel.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

router.get('/getMovies', async (req, res) => {
  try {
    const movies = await movieModel.find();
    movies.reverse();
    res.status(200).json(movies);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

router.post('/addMovie', async (req, res) => {
  const data = new movieModel({
    name: req.body.name,
    time: req.body.time,
    endTime: req.body.endTime,
    length: req.body.length,
    rating: req.body.rating,
    genre: req.body.genre,
    summary: req.body.summary,
    director: req.body.director,
    senderID: req.body.senderID
  });
  const token = req.headers['x-access-token'];
  const authResult = verifyToken(token);
  if (!authResult) {
    return res.status(500).json({message: 'Invalid credentials'});
  }
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});