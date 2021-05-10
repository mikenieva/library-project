// 1. IMPORTACIONES
const mongoose  = require('mongoose')
const { Schema, model } = mongoose


// 2. SCHEMA
const bookSchema = new Schema(
  {
    title: String,
    description: String,
    author: String,
    rating: Number
  },
  {
    timestamps: true
  }
)

// 3. MODELO
const Book = model('Book', bookSchema)

// 4. EXPORTACIONES

module.exports = Book
