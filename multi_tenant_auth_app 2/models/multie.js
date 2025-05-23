const mongoose = require('mongoose');

const multieSchema = new mongoose.Schema({
  name: String,
  description: String,
});

module.exports = multieSchema;