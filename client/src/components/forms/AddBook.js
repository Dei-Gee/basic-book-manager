import React, { useState, useEffect } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { isUndefined } from 'util';

const AddBook = (props) => {
    const [authors, setAuthors] = useState([]);
    const [name, setName] = useState('');
    const [isbn, setISBN] = useState('');
    const [author, setAuthor] = useState('');

    // get all authors
    // This has a massive bug. For some reason the state returns undefined. It eventually resolves on its own but it probably wont work when you run the app at first
    useEffect(() => {
        if(props.location.state !== null || props.location.state !== undefined || !isUndefined(props.location.state))
        {
            console.log(props.location);
            setAuthors(props.location.state.authors);
        }
    }, []);

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

        await axios.post('/book', newBook).then(response => console.log(response)).catch(err => console.log(err));
        
        
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
                    <Form.Label>State</Form.Label>
                    <Form.Control as="select" defaultValue="Choose..." onChange={(e) => setAuthor(e.target.value)}>
                        <option>Choose...</option>
                        {
                            authors.map((author, index) => {
                                return <option key={index} value={author._id}>{author.firstName} {author.lastName}</option>
                            })
                        }
                    </Form.Control>
                </Form.Row>
            
                <Button variant="primary" type="submit" onClick={handleAddBook}>
                    Submit
                </Button>
                <Button variant="primary" href="/">
                    Back to Homepage
                </Button>
            </Form>
        </div>
     );
}
 
export default AddBook;