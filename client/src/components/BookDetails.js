import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Col, Alert } from 'react-bootstrap';
import { getAllAuthors, getAuthorById, updateBookById, getBookById } from '../actions/actions';

const BookDetails = (props) => {
    // set state
    const [book, setBook] = useState({});
    const [author, setAuthor] = useState({});
    const [showCard, setShowCard] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [authorId, setAuthorId] = useState('');
    const [name, setName] = useState('');
    const [isbn, setISBN] = useState('');
    const [allAuthors, setAllAuthors] = useState([]);
    const [success, setSuccess] = useState(false);

    /* FUNCTIONS */
    //  load all data
    const loadAllData = async () => {
        const a = await getAllAuthors();
        const bookById = await getBookById(props.match.params.id);
        const authorById = await getAuthorById(props.location.state.author._id);

        // set data to state
        setAllAuthors(a);
        setBook(bookById);
        setAuthor(authorById);
        setAuthorId(authorById._id);
        setName(props.location.state.book.name);
        setISBN(props.location.state.book.isbn);
    }

    // get details of book
    useEffect(() => {
        loadAllData();
    }, [props]);

    // edit this specific book
    const handleUpdateBook = async (e) => {
        e.preventDefault();

        // data for updating the book
        let newBook = {
            name: name, 
            isbn: isbn, 
            author: authorId
        }

        // send request to update
        const updateBook = await updateBookById(props.match.params.id, newBook);

        // check if update was successful
        if(updateBook === true)
        {
            setShowAlert(true);
            setSuccess(true);

            setTimeout (() => {
                setShowAlert(false);
            }, 2000);

            // get updated book
            const updated = await getBookById(book._id);
            // get new author of the book
            const updatedA = await getAuthorById(updated.author);

            console.log(updated);
            // push data as props to next component
            props.history.push(`/book/${book._id}`, 
            {
                book: updated, 
                author: updatedA
            });
            setShowCard(true);

        }
        else
        {
            setShowAlert(true);
            setSuccess(false);

            setTimeout (() => {
                setShowAlert(false);
            }, 2000);
        }        
    }

    return(
        <div className="container">
            {
                showCard === true ? 
                <Card style={{ width: '20rem', margin: '0 auto' }}>
                    <Card.Body>
                        <Card.Title>{book.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{book.isbn}</Card.Subtitle>
                        <Card.Text>
                            This book was written by {author.firstName} {author.lastName}
                        </Card.Text>

                        <Button variant="outline-primary text-white" onClick={() => setShowCard(false)}>Edit</Button>
                        <Button variant="outline-success text-white ml-2" href="/">Back to Homepage</Button>
                    </Card.Body>
                </Card> : 
                <Form className="w-75 my-5 mx-auto">
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Book Name</Form.Label>
                            <Form.Control type="text" placeholder="What is the name of the book?" onChange={(e) => setName(e.target.value)} defaultValue={book.name} required />
                        </Form.Group>
                    
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>ISBN</Form.Label>
                            <Form.Control type="text" placeholder="What is the ISBN number?" onChange={(e) => setISBN(e.target.value)} defaultValue={book.isbn} required />
                        </Form.Group>
                    </Form.Row>
                
                    <Form.Row>                    
                        <Form.Label>Author</Form.Label>
                        <Form.Control as="select" onChange={(e) => setAuthorId(e.target.value)} defaultValue={author._id} required>
                            <option>Choose...</option>
                            {
                                allAuthors.map((author, index) => {
                                    return <option key={index} value={author._id}>{author.firstName} {author.lastName}</option>
                                })
                            }
                        </Form.Control>
                    </Form.Row>
                    {
                        // conditional render of user feedback
                        showAlert == true ? 
                            success === true ?
                                <Alert variant="success" onClose={() => setShowAlert(true)}>
                                    {name} updated!
                                </Alert> : 
                                <Alert variant="danger" onClose={() => setShowAlert(true)}>
                                    Error! {name} could not be updated!
                                </Alert>
                         : <br />
                    }
                
                    <Button variant="success" type="submit" onClick={handleUpdateBook}>
                        Submit
                    </Button>
                    <Button variant="outline-danger"onClick= {() => setShowCard(true)} className="ml-2 text-white">
                        Cancel
                    </Button>
                    <Button variant="outline-success" href="/" className="ml-2 text-white">
                        Go Back
                    </Button>
                </Form>
            }

            
        </div>
    );
}

export default BookDetails;