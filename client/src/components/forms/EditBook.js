import React, { useState, useEffect } from 'react';
import { Form, Col, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { isNull } from 'util';

const EditBook = (props) => {
    const [thisBook, setThisBook] = useState({});
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (props.location.state === undefined) {
            console.log('state is uendefined');
        } else {
            console.log(props.location.state);
            setThisBook(props.location.state.book);
            setName(props.location.state.book.name);
            setISBN(props.location.state.book.isbn);
            setAuthor(props.location.state.book.author);
            setAuthors(props.location.state.authors);
        }
    }, [props])

    

    return ( 
        <div>
            
        </div>
     );
}
 
export default EditBook;