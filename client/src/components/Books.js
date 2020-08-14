import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import axios from 'axios';

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
                console.log(response.data);
            })
            .catch(err => console.log(err));
          }, 1000);
        
    }, []);

    // display details about book

    const handleClick = async (e) => {
        console.log(e.target.getAttribute('_id'));

        let bookId = e.target.getAttribute('_id');
        let authorId = e.target.getAttribute('authorid');

        let thisBook = {};
        let thisBookAuthor = {};

        axios
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

    return(
        <div className="container">
            <h4 className="sub-header">List of Books</h4>

            <ListGroup variant="flush">
                {
                    allBooks.map((book, index) => {
                        return <ListGroup.Item key={index} _id={book._id} authorid={book.author} action onClick={handleClick}>{book.name}</ListGroup.Item>
                    })
                }
            </ListGroup>
        </div>
    );
}

export default Books;