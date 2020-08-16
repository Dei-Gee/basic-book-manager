import React, { useState, useEffect } from 'react';
import { Alert, Form, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { isUndefined, isNull } from 'util';

const AddBook = (props) => {
    const [authors, setAuthors] = useState([]);
    const [name, setName] = useState('');
    const [isbn, setISBN] = useState('');
    const [author, setAuthor] = useState('');
    const [show, setShow] = useState(false);

    // get all authors
    useEffect(() => {        
        if(props.location.state === undefined)
        {
            console.log('state is undefined');
        }
        else {
            console.log(props.location.state);
            setAuthors(props.location.state.authors);
        }
    }, [props]);

    // adds a new book
    const handleAddBook = async (e) => {
        e.preventDefault();
        let newBook = {};
        console.log(name, isbn, author);
        
        newBook = {
            name: name, 
            isbn: isbn, 
            author: author
        }

        await axios
        .post('/book', newBook)
        .then(response => {
            console.log(response);
            if(!isNull(response.data) && response.status === 200)
            {
                setShow(true);

                setTimeout (() => {
                    setShow(false);
                }, 2000);
            }
        })
        .catch(err => console.log(err));
        
        
    }

    return ( 
        <div>
            <Form className="w-75 my-5 mx-auto">
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Book Name</Form.Label>
                        <Form.Control type="text" placeholder="What is the name of the book?" onChange={(e) => setName(e.target.value)} required />
                    </Form.Group>
                
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>ISBN</Form.Label>
                        <Form.Control type="text" placeholder="What is the ISBN number?" onChange={(e) => setISBN(e.target.value)} required />
                    </Form.Group>
                </Form.Row>
            
                <Form.Row>                    
                    <Form.Label>Author</Form.Label>
                    <Form.Control as="select" defaultValue="Choose..." onChange={(e) => setAuthor(e.target.value)} required>
                        <option>Choose...</option>
                        {
                            authors.map((author, index) => {
                                return <option key={index} value={author._id}>{author.firstName} {author.lastName}</option>
                            })
                        }
                    </Form.Control>
                </Form.Row>
                
                {
                    show == true ? 
                    <Alert variant="success" onClose={() => setShow(false)}>
                        {name} added to database!
                    </Alert> : <br />
                }

                <Button variant="primary" type="submit" onClick={handleAddBook}>
                    Submit
                </Button>
                <Button variant="primary" href="/" className="ml-2 text-white">
                    Back to Homepage
                </Button>
            </Form>
        </div>
     );
}
 
export default AddBook;