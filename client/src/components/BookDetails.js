import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import { isNull } from 'util';
import AuthorDetails from './AuthorDetails';

const BookDetails = (props) => {
    // set state
    const [book, setBook] = useState({});
    const [author, setAuthor] = useState({});

    // get details of book
    useEffect(() => {
        setBook(props.location.state.book);
        setAuthor(props.location.state.author);
        
    }, []);
    console.log(book.name);

    if(book != {} || book != null || !isNull(book))
    {
        
    }

    return(
        <div className="container">
            <Card style={{ width: '20rem', margin: '0 auto' }}>
                <Card.Body>
                    <Card.Title>{book.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{book.isbn}</Card.Subtitle>
                    <Card.Text>
                        This book was written by {author.firstName} {author.lastName}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default BookDetails;