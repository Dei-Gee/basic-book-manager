import React, { useState, useEffect } from 'react';
import { Form, Col, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { isNull } from 'util';

const AddAuthor = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [show, setShow] = useState(false);

    // adds a new author
    const handleAddAuthor = async (e) => {
        e.preventDefault();
        let newAuthor = {};
        console.log(firstName, lastName);
        
        newAuthor = {
            firstName: firstName, 
            lastName: lastName
        }

        await axios
        .post('/author', newAuthor)
        .then(response => {
            if(!isNull(response.data) && response.status === 200)
            {
                setShow(true);

                setTimeout(() => {
                    setShow(false);
                }, 2000);
            }
        })
        .catch(err => console.log(err));
        
        
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
                    show == true ? 
                    <Alert variant="success" onClose={() => setShow(false)}>
                        Author {firstName} {lastName} added to database!
                    </Alert> : <br />
                }
            
                <Button variant="success" type="submit" onClick={handleAddAuthor}>
                    Submit
                </Button>
                <Button variant="outline-success" href="/" className="ml-2 text-white">
                    Back to Homepage
                </Button>
            </Form>
        </div>
     );
}
 
export default AddAuthor;