import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Col, Alert } from 'react-bootstrap';
import { isNull } from 'util';
import axios from 'axios';

const BookDetails = (props) => {
    // set state
    const [book, setBook] = useState({});
    const [author, setAuthor] = useState({});
    const [showCard, setShowCard] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [authorId, setAuthorId] = useState('');
    const [name, setName] = useState('');
    const [isbn, setISBN] = useState('');
    const [authors, setAuthors] = useState([]);

    // get details of book
    useEffect(() => {

        let isMounted = true; // note this flag denote mount status
        if(isMounted)
        {
            setBook(props.location.state.book);
            setAuthor(props.location.state.author);
            setAuthorId(props.location.state.author._id);
            setName(props.location.state.book.name);
            setISBN(props.location.state.book.isbn);

            axios
            .get('/authors')
            .then((response) => {
                setAuthors(response.data);
            })
            .catch((err) => console.log(err));
        }
        return () => { isMounted = false }; // use effect cleanup to set flag false, if unmounted

        
    }, [props]);

    // edit this specific book
    const handleUpdateBook = async (e) => {
        e.preventDefault();
        let newBook = {};
        console.log(name, isbn, authorId);
        
        newBook = {
            name: name, 
            isbn: isbn, 
            author: authorId
        }

        await axios
        .put(`/book/${props.match.params.id}`, newBook)
        .then(response => {
            if(!isNull(response.data) && response.status === 200)
            {
                setShowAlert(true);

                setTimeout(() => {
                    setShowAlert(false);
                    setShowCard(true);
                }, 2000);
            }
        })
        .catch(err => console.log(err));
        
        
    }
    console.log(author);

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
                                authors.map((author, index) => {
                                    return <option key={index} value={author._id}>{author.firstName} {author.lastName}</option>
                                })
                            }
                        </Form.Control>
                    </Form.Row>
                    {
                        showAlert == true ? 
                        <Alert variant="success" onClose={() => setShowAlert(false)}>
                            ({name}) updated!
                        </Alert> : <br />
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