import { useState, useEffect } from 'react'
import BookList from './booklist'
import BookForm from './bookform'
import bookService from '../services/books'
import './App.css'

const App = () => {
  const [books, setBooks] = useState({})
  const [selectedBook, setSelectedBook] = useState("")

  useEffect(() => {
    bookService
      .getAll()
      .then(initialBooklist => {
      setBooks(initialBooklist)
      })
  }, [])

  const selectBook = (id) => {
    setSelectedBook(id)
  }

  const unselectBook = () => {
    setSelectedBook('')
  }
  
  const addNewBook = (newBook) => {
    const newList = books.concat(newBook);
    setBooks(newList);
  }

  const deleteBook = (id) => {
    const remainingItems = books.filter(book => book.id !== id);
    
    setBooks(remainingItems);
  }

  const updateBookList = (updatedBook) => {
    const newList = books.map((item) => {
      if (item.id === updatedBook.id) {
        const updatedItem = {
          name: updatedBook.name,
          author: updatedBook.author,
          desc: updatedBook.desc
        };
 
        return updatedItem;
      }
 
      return item;
    });
 
    setBooks(newList);
  }

  return (
    <div className="App">
      <h1>Book collection</h1>
      <div className="wrapper">
        <BookList books={books} onBookSelect={selectBook}></BookList>
        <BookForm selectedId={selectedBook} newBookToList={addNewBook} updateBookList={updateBookList} deleteBook={deleteBook} setSelectedBook={setSelectedBook}></BookForm>
      </div>
    </div>
  );
}

export default App;
