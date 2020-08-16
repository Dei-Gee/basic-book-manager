import React, { useState, useEffect } from 'react';
import { ListGroup, Nav, Navbar } from 'react-bootstrap';
import { getAllBooks, getBookById, getAuthorById } from '../actions/actions';
import { isNullOrUndefined } from 'util';

const Books = (props) => {
    // set state
    const [allBooks, setAllBooks] = useState([]);

    /* FUNCTIONS */
    //  load all data
    const loadAllData = async () => {
        const b = await getAllBooks();

        // set data to state
        setAllBooks(b);
    }
    
    /* USE EFFECT HOOK */
    useEffect(() => {

        // get books every second
        const timer = setInterval(() => {
            loadAllData();
        }, 1000);

        // clearing interval
        return () => clearInterval(timer);
    }, []);

    // display details about each book in the next component
    const handleClick = async (e) => {
        e.preventDefault();

        // get IDs
        let bookId = e.target.getAttribute('_id');
        let authorId = e.target.getAttribute('authorid');

        // fetch data using IDs
        const thisBook = await getBookById(bookId);
        const thisBookAuthor = await getAuthorById(authorId);

        if(!isNullOrUndefined(thisBook) && !isNullOrUndefined(thisBookAuthor))
        {
            // push data as props to next component
            props.history.push(`book/${bookId}`, 
            {
                book: thisBook, 
                author: thisBookAuthor
            });
        }

       
    }

    // go to the create book form
    const handleAddBookClick = async (e) => {
        e.preventDefault();
        
        props.history.push({
            pathname: 'book'
        })    
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
                        <Nav.Link href="/authors" className="text-light">View Authors</Nav.Link>
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