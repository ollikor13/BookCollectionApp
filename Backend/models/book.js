/* eslint-disable no-undef */
const mongoose = require('mongoose')
//mongoose.set('useFindAndModify', false)
//const uniqueValidator = require('mongoose-unique-validator')

const url = 'mongodb+srv://OlliFullstack:1234@cluster0.df9ln.mongodb.net/book-collection-db?retryWrites=true&w=majority'

console.log('connecting to url')

mongoose
  .connect(url, { useNewUrlParser: true })
  // eslint-disable-next-line no-unused-vars
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const bookSchema = new mongoose.Schema({
  name: { type: String,required: true},
  author: { type: String },
  desc: { type: String },
  id: { type: Number },
})
//bookSchema.plugin(uniqueValidator)

bookSchema.set('toJSON', {
  transform: (book, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Book', bookSchema)