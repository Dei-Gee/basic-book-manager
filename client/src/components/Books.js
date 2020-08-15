import React, { useState, useEffect } from 'react';
import { ListGroup, Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';
import { isNull } from 'util';

const Books = (props) => {
    // set state
    const [allBooks, setAllBooks] = useState([]);

    
    useEffect(() => {
        // get all books
        const timer = setInterval(() => {
            axios
            .get('books')
            .then(response => {
                setAllBooks(response.data);
            })
            .catch(err => console.log(err));
          }, 1000);

        // clearing interval
        return () => clearInterval(timer);
    }, []);

    // display details about book

    const handleClick = async (e) => {
        e.preventDefault();
        console.log(e.target.getAttribute('_id'));

        let bookId = e.target.getAttribute('_id');
        let authorId = e.target.getAttribute('authorid');

        let thisBook = {};
        let thisBookAuthor = {};

        await axios
            .get(`author/${authorId}`)
            .then(response => {
                thisBookAuthor = {
                    firstName: response.data.firstName, 
                    lastName: response.data.lastName
                }
            })
            .catch(err => console.log(err));

        // get specific book
        await axios
            .get(`book/${bookId}`)
            .then(response => {
                thisBook = {
                    name: response.data.name, 
                    isbn: response.data.isbn, 
                }
            })
            .catch(err => console.log(err));


            props.history.push(`book/${bookId}`, 
            {
                book: thisBook, 
                author: thisBookAuthor
            });
    }

    const handleAddBookClick = async (e) => {
        e.preventDefault();
        // let authorsArray = [];
        await axios
            .get('authors')
            .then(response => {
                if(!isNull(response.data) && response.status === 200)
                {
                    props.history.push({
                        pathname: 'book', 
                        state: {
                         authors: response.data
                        }
                    })
                }
            })
            .catch(err => console.log(err))

            
    }

    return(
        <div className="container">
            <h4 className="sub-header">List of Books</h4>
            <Navbar bg="secondary" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="w-100 bg-secondary">
                        <Nav.Link href="/book" className="text-light" onClick={handleAddBookClick}>Add Book</Nav.Link>
                        <Nav.Link href="/author" className="text-light">Add Author</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <ListGroup variant="flush">
                {
                    allBooks.map((book, index) => {
                        return <ListGroup.Item className="text-success" key={index} _id={book._id} authorid={book.author} action onClick={handleClick}>{book.name}</ListGroup.Item>
                    })
                }
            </ListGroup>
        </div>
    );
}

export default Books;