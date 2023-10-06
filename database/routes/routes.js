const express = require('express');
require('dotenv').config();
const router = express.Router();
module.exports = router;
const commentModel = require('../models/comment-model');
const registerModel = require('../models/register-model');
const loginModel = require('../models/login-model');

router.post('/post', async (req, res) => {
  const data = new commentModel({
    name: req.body.name,
    title: req.body.title,
    rating: req.body.rating,
    comment: req.body.comment
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave)
  }
  catch (error) {
    res.status(400).json({message: error.message});
  }
});

router.get('/getPosts', async (req, res) => {
  try {
    const data = await commentModel.find();
    res.status(200).json(data);
  }
  catch (error) {
    res.status(400).json({message: error.message});
  }
});

router.post('/register', async (req, res) => {
  const data = new registerModel({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  }
  catch (error) {
    if (error.message.includes('E11000')) {
      res.status(400).json({message: 'Use unique email address'});
    } else {
      res.status(400).json({message: error.message});
    }
  }
});

router.post('/login', async (req, res) => {
  const data = new loginModel({
    email: req.body.email,
    password: req.body.password
  });
  try {
    const user = await loginModel.findOne({ 'email': data.email, 'password': data.password });
    console.log('user login', user);
    if (!user) {
      res.status(500).json({message: 'Invalid credentials'});
    }  else {
      const userWithoutPassword = { ...user._doc };
      delete userWithoutPassword.password; 
      res.status(200).json(userWithoutPassword);
    }
  }
  catch (error) {
    res.status(400).json({message: error.message});
  }
});

router.post('/authUser', async (req, res) => {
  try {
    const user = await registerModel.findById(req.body._id);
    console.log('user auth', user);
    if (!user) {
      res.status(500).json({message: 'Invalid credentials'});
    } else {
      const userWithoutPassword = { ...user._doc };
      delete userWithoutPassword.password; 
      res.status(200).json(userWithoutPassword);
    }
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});
