import React, { useState, useEffect } from 'react';
import { Alert, Form, Col, Button } from 'react-bootstrap';
import { getAllAuthors, createBook } from '../../actions/actions';

const AddBook = (props) => {
    const [authors, setAuthors] = useState([]);
    const [name, setName] = useState('');
    const [isbn, setISBN] = useState('');
    const [author, setAuthor] = useState('');
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);

    // load all data
    const loadAllData = async () => {
        let allAuthors = await getAllAuthors();

        // set data to state
        setAuthors(allAuthors);
    }

    /* USE EFFECT HOOK */
    useEffect(() => {        
        loadAllData();
    }, [props]);

    // adds a new book
    const handleAddBook = async (e) => {
        e.preventDefault();

        // new book data
        let newBook = {
            name: name, 
            isbn: isbn, 
            author: author
        }

        // send request
        const createNewBook = await createBook(newBook);
        
        // check if request succeeded
        if(createNewBook === true) {
            setShow(true);
            setSuccess(true);
            setTimeout (() => {
                setShow(false);
            }, 2000);
        }
        else{
            setShow(true);
            setSuccess(false);
            setTimeout (() => {
                setShow(false);
            }, 2000);
        }
        
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
                    // conditional render of user feedback
                    show === true ? 
                        success === true ?
                            <Alert variant="success" onClose={() => setShow(true)}>
                                {name} added to database!
                            </Alert> : 
                            <Alert variant="danger" onClose={() => setShow(true)}>
                                Error! {name} could not be added to database!
                            </Alert>
                     : <br />
                }

                <Button variant="primary" type="submit" onClick={handleAddBook}>
                    Submit
                </Button>
                <Button variant="outline-primary" href="/authors" className="ml-2 text-white">
                    View Authors
                </Button>
                <Button variant="outline-primary" href="/" className="ml-2 text-white">
                    View Books
                </Button>
            </Form>
        </div>
     );
}
 
export default AddBook;