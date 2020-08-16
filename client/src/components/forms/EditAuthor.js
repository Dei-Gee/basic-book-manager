import React, { useState, useEffect } from 'react';
import { Form, Col, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { isNull } from 'util';

const EditAuthor = (props) => {
    const [thisAuthor, setThisAuthor] = useState({});
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (props.location.state === undefined) {
            console.log('state is uendefined');
        } else {
            console.log(props.location.state);
            setThisAuthor(props.location.state.author);
            setFirstName(props.location.state.author.firstName);
            setLastName(props.location.state.author.lastName);
        }
    }, [props])

    // edit this specific author
    const handleUpdateAuthor = async (e) => {
        e.preventDefault();
        let newAuthor = {};
        console.log(firstName, lastName);
        
        newAuthor = {
            firstName: firstName, 
            lastName: lastName
        }

        await axios
        .put(`/author/${props.location.state.author._id}`, newAuthor)
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
                        <Form.Control type="text" placeholder="What is your first name?" onChange={(e) => setFirstName(e.target.value)} defaultValue={thisAuthor.firstName} required />
                    </Form.Group>
                
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="What is the your last name?" onChange={(e) => setLastName(e.target.value)} defaultValue={thisAuthor.lastName} required />
                    </Form.Group>
                </Form.Row>

                {
                    show == true ? 
                    <Alert variant="success" onClose={() => setShow(false)}>
                        Author {firstName} {lastName} updated!
                    </Alert> : <br />
                }
            
                <Button variant="success" type="submit" onClick={handleUpdateAuthor}>
                    Submit
                </Button>
                <Button variant="outline-success" href="/authors" className="ml-2 text-white">
                    Go Back
                </Button>
            </Form>
        </div>
     );
}
 
export default EditAuthor;