'use strict';
require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
module.exports = router;
const commentModel = require('../models/comment-model');
const registerModel = require('../models/register-model');
const loginModel = require('../models/login-model');
const movieModel = require('../models/movie-model');
const deleteModel = require('../models/delete-model');

const generateToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

router.post('/authUser', (req, res) => {
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
    res.status(200).json({ id:user._id, name: user.name, email: user.email, token: token });
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});


router.post('/postMessage', async (req, res) => {
  console.log('req.body', req.body);
  const data = new commentModel({
    name: req.body.name,
    title: req.body.title,
    rating: req.body.rating,
    comment: req.body.comment,
    senderEmail: req.body.senderEmail
  });
  const token = req.headers['x-access-token'];
  const authResult = verifyToken(token);
  if (!authResult) {
    return res.status(500).json({message: 'Invalid credentials'});
  }
  try {
    await data.save();
    res.status(200).json({message: 'Message sent successfully'});
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

router.delete('/deleteMessage', async (req, res) => {
  const data = new deleteModel({
    senderEmail: req.body.senderEmail,
    userId: req.body.userId,
    messageId : req.body.messageId
  });
  const token = req.headers['x-access-token'];
  const authResult = verifyToken(token);
  if (!authResult) {
    return res.status(500).json({message: 'Invalid credentials'});
  }
  try {
    const user = await registerModel.findOne({email: req.body.senderEmail});
    if (user._id.toString() !== req.body.userId) {
      return res.status(500).json({message: 'Invalid credentials'});
    }
    await commentModel.deleteOne({ _id: req.body.messageId });
    res.status(200).json({message: 'Message deleted successfully'})
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});


router.get('/getAllMessages', async (req, res) => {
  try {
    const messages = await commentModel.find();
    res.status(200).json(messages);
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
  });
  const token = req.headers['x-access-token'];
  const authResult = verifyToken(token);
  if (!authResult) {
    return res.status(500).json({message: 'Invalid credentials'});
  }
  try {
    await data.save();
    res.status(200).json({message: 'Movie added successfully'});
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});