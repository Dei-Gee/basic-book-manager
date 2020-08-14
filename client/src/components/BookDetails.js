import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { isNull } from 'util';

const BookDetails = (props) => {
    // set state
    const [book, setBook] = useState({});
    const [author, setAuthor] = useState({});

    // get details of book
    useEffect(() => {

        let isMounted = true; // note this flag denote mount status
        if(isMounted)
        {
            setBook(props.location.state.book);
            setAuthor(props.location.state.author);
        }
        return () => { isMounted = false }; // use effect cleanup to set flag false, if unmounted

        
    }, []);

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

                    <Button variant="outline-success text-white" href="/">Back to Homepage</Button>
                </Card.Body>
            </Card>
        </div>
    );
}

export default BookDetails;