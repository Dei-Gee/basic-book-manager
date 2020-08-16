import React, { useState, useEffect } from 'react';
import { ListGroup, Nav, Navbar, Button } from 'react-bootstrap';
import { getAllAuthors } from '../actions/actions';


const Authors = (props) => {
    const [allAuthors, setAllAuthors] = useState([]);

    /* FUNCTIONS */
    //  load all data
    const loadAllData = async () => {
        const a = await getAllAuthors();

        // set data to state
        setAllAuthors(a);
    }

    /* USE EFFECT HOOK */
    useEffect(() => {
        const timer = setInterval(() => {
            loadAllData();
        }, 1000);

        // cleanup
        return () => clearInterval(timer);
    }, [props]);

    // Function to handle when you click the button to edit an author
    const handleEditAuthorClick = async (e) => {
        e.preventDefault();

        // get author id from user defined target attribute
        let authorId = e.target.getAttribute('authorid');
        
        // pass props to next component 
        props.history.push(`author/${authorId}`);
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
                    allAuthors.map((author, index) => {
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