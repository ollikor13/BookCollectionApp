import { useState, useEffect } from "react";
import bookService from "../services/books";
import { Col, Form, Button, Row,ButtonGroup } from "react-bootstrap";
const BookForm = (props) => {
  const { selectedId,newBookToList,updateBookList,deleteBook,setSelectedBook } = props;
  const [bookName, setBookName] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookDesc, setBookDesc] = useState("");
  const [bookId, setBookId] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (props.selectedId) {
      bookService.getBook(props.selectedId).then((bookInfo) => {
        setBookName(bookInfo.name);
        setBookAuthor(bookInfo.author);
        setBookDesc(bookInfo.desc);
        setBookId(bookInfo.id);
      });
    }
  }, [props.selectedId]);

  const onNameChange = (event) => {
    setBookName(event.target.value);
  };

  const onAuthorChange = (event) => {
    setBookAuthor(event.target.value);
  };

  const onDescChange = (event) => {
    setBookDesc(event.target.value);
  };

  const emptyForm = () => {
    setBookName('');
    setBookAuthor('');
    setBookDesc('');
    setBookId('');
    setSelectedBook();
  }

  const saveNew = () => {
    const newBook = { name: bookName, author: bookAuthor, desc: bookDesc };
    bookService.create(newBook).then((bookInfo) => {
      newBookToList(bookInfo);
      emptyForm();
    });
  };

  const save = () => {
    const updatedBook = { name: bookName, author: bookAuthor, desc: bookDesc };
    bookService.update(bookId, updatedBook).then((bookInfo) => {
      updateBookList(bookInfo);
      emptyForm();
    });
  };

  const remove = () => {
      bookService.remove(bookId);
      deleteBook(props.selectedId);
      emptyForm();
  };

  return (
    <div className="BookFormWrapper">

<Form>
      <Row className="mb-3">
        <Form.Group as={Col} >
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" value={bookName} onChange={(event) => onNameChange(event)} />
        </Form.Group>
        <Form.Group as={Col} >
            <Form.Label>Author</Form.Label>
            <Form.Control type="text" value={bookAuthor} onChange={(event) => onAuthorChange(event)}/>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} >
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} value={bookDesc} onChange={(event) => onDescChange(event)} />
        </Form.Group>
      </Row>
    </Form>
    <ButtonGroup>
      <Button variant="outline-secondary mr-5" disabled={!bookName} onClick={() => saveNew()} >
          Save New
        </Button>
        <Button className="mr-5" variant="outline-secondary" disabled={!bookId} onClick={() => save()} >
          Save
        </Button>
        <Button className="ml-5" variant="outline-secondary" disabled={!bookId} onClick={() => remove()} >
          Delete
        </Button>
        <Button className="ml-5" variant="outline-secondary" onClick={() => emptyForm()} >
          Clear
        </Button>
</ButtonGroup>

    </div>
  );
};

export default BookForm;
