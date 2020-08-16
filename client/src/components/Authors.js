import React, { useState, useEffect } from 'react';
import { ListGroup, Nav, Navbar, Button } from 'react-bootstrap';
import axios from 'axios';
import { isNull } from 'util';


const Authors = (props) => {
    const [authors, setAuthors] = useState([]);

    // get all authors
    useEffect(() => {
        const timer = setInterval(() => {
            axios
            .get('/authors')
            .then((response) => {
                setAuthors(response.data);
            })
            .catch((err) => console.log(err));
            }, 1000);

            // cleanup
            return () => clearInterval(timer);
    }, [props]);

    // Function to handle when you click the button to edit an author
    const handleEditAuthorClick = async (e) => {
        e.preventDefault();
        console.log(e.target.getAttribute('authorid'));

        let authorId = e.target.getAttribute('authorid');

        // get specific author
        let thisAuthor= authors.find((a) => a._id === authorId);



            props.history.push(`author/${authorId}`, 
            {
                author: thisAuthor
            });
    }


    // Function to handle when you click the button to add a new book
    const handleAddBookClick = async (e) => {
        e.preventDefault();
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
            <h4 className="sub-header">List of Authors</h4>
            <Navbar bg="secondary" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="w-100 bg-secondary">
                        <Nav.Link href="/book" className="text-light" onClick={handleAddBookClick}>Add Book</Nav.Link>
                        <Nav.Link href="/author" className="text-light">Add Author</Nav.Link>
                        <Nav.Link href="/" className="text-light">View Books</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <ListGroup variant="flush">
                {
                    authors.map((author, index) => {
                        console.log(author);
                        return  <ListGroup.Item className="d-flex text-success justify-content-between" key={index}>
                                    <div className="bg-transparent text-success py-2">{author.firstName} {author.lastName}</div>
                                    <Button variant="outline-primary" href="/" authorid={author._id} onClick={handleEditAuthorClick}>Edit Author</Button>
                                </ListGroup.Item>
                    })
                }
            </ListGroup>
        </div>
    );
}

export default Authors;