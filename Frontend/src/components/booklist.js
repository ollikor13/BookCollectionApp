import React from "react";
import "./booklist.css";
import Table from 'react-bootstrap/Table';

const BookList = (props) => {
  const { books, onBookSelect } = props;

  const selectBook = (id) => {
    props.onBookSelect(id);
  };

  const tableRows = () => {
    if(books.length > 0 ) {
      return books.map((book) => (
        <tr className="bookTableRow" key={book.id} onClick={() => selectBook(book.id)}>
          <td>{book.name}</td>
          <td>{book.author}</td>
          <td>{book.desc}</td>
        </tr>
      )
    );
  }}

  return (
    <div className="BookListWrapper">
      <Table striped bordered hover>
  <thead>
    <tr>
      <th>Title</th>
      <th>Author</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    {tableRows()}
  </tbody>
</Table>

    </div>
  );
};

export default BookList;
