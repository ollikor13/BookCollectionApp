const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Book = require('./models/book')
const cors = require('cors')

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(cors())

//Get all books
app.get('/api/books', (request, response) => {
  response.header('Access-Control-Allow-Origin', '*')
  Book.find({}).then(books => {
    response.json(books)
  })
})

//Save new book
app.post('/api/books', (request, response, next) => {
  //Post
  response.header('Access-Control-Allow-Origin', '*')
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'Name missing' })
  }

  const newBook = new Book({
    name: body.name,
    author: body.author,
    desc: body.desc
  })

  console.log('Attempting to post: ', newBook)
  if (newBook.name !== null) {
    newBook
      .save()
      .then(newBook => {
        response.json(newBook.toJSON())
      })
      .catch(error => console.log("Save new book Error!: ", error))
  } else {
    console.log('Posting failed', newBook)
  }
})

//Get one book
app.get('/api/books/:id', (request, response) => {
  response.header('Access-Control-Allow-Origin', '*')
  if(request.params.id != undefined){
    Book.findById(request.params.id)
    .then(bookInfo => {
      if (bookInfo) {
        response.json(bookInfo.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => console.log("Get book Error!: ", error))
  }
})

//Remove book
app.delete('/api/books/:id', (request, response) => {
  //Delete
  if(request.params.id != undefined){
    Book.findByIdAndRemove(request.params.id)
    // eslint-disable-next-line no-unused-vars
    .then(result => {
      response.status(204).end()
    })
    // eslint-disable-next-line no-undef
    .catch(error => console.log("Remove book Error!: ", error))
  }
})

//Update book
app.put('/api/books/:id', (request, response, next) => {
  const body = request.body

  Book.findById(request.params.id)
    .then(book => {
      if (book) {
        const updatedBook = {
          name: body.name,
          author: body.author,
          desc: body.desc
        }
        Book.findByIdAndUpdate(request.params.id, updatedBook, { new: true })
          .then(updatedBook => {
            response.json(updatedBook.toJSON())
          })
          .catch(error => next(error))
      } else {
        response.status(404).end()
      }
    })
    .catch(error => console.log("Update book Error!: ", error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// eslint-disable-next-line no-undef
const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

app.use(unknownEndpoint)