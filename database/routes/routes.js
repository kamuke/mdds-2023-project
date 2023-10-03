const express = require('express');
const router = express.Router();
module.exports = router;
const Model = require('../models/model');

router.post('/post', async (req, res) => {
  const data = new Model({
    name: req.body.name,
    rating: req.body.rating,
    comment: req.body.comment
  })
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave)
  }
  catch (error) {
    res.status(400).json({message: error.message})
  }
})

router.get('/getPosts', async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data)
  }
  catch (error) {
    res.status(500).json({message: error.message})
  }
})