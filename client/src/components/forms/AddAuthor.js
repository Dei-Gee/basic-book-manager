import React, { useState, useEffect } from 'react';
import { Form, Col, Button, Alert } from 'react-bootstrap';
import { createAuthor } from '../../actions/actions';

const AddAuthor = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);

    // adds a new author
    const handleAddAuthor = async (e) => {
        e.preventDefault();

        // new author data
        let newAuthor = {
            firstName: firstName, 
            lastName: lastName
        }

        // send request
        const createNewAuthor = await createAuthor(newAuthor);

        // check if request succeeded
        if(createNewAuthor === true) {
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
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="What is your first name?" onChange={(e) => setFirstName(e.target.value)} required />
                    </Form.Group>
                
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="What is the your last name?" onChange={(e) => setLastName(e.target.value)} required />
                    </Form.Group>
                </Form.Row>

                {
                    // conditional render of user feedback
                    show === true ? 
                        success === true ?
                            <Alert variant="success" onClose={() => setShow(true)}>
                                Author {firstName} {lastName} added to database!
                            </Alert> : 
                            <Alert variant="danger" onClose={() => setShow(true)}>
                                Error! {firstName} {lastName} could not be added to database!
                            </Alert>
                     : <br />
                }
            
                <Button variant="primary" type="submit" onClick={handleAddAuthor}>
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
 
export default AddAuthor;