const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
  author_name: String,
  title: String,
  cover_image: String,
  pages: Number,
  releaseDate: String,
  quantity: Number
});

module.exports = mongoose.model('livros', BookSchema)