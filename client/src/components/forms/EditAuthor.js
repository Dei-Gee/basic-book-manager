import React, { useState, useEffect } from 'react';
import { Form, Col, Button, Alert } from 'react-bootstrap';
import { getAuthorById, updateAuthorById } from '../../actions/actions';

const EditAuthor = (props) => {
    const [thisAuthor, setThisAuthor] = useState({});
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [success, setSuccess] = useState(false);

    /* FUNCTIONS */
    //  load all data
    const loadAllData = async () => {
        const a = await getAuthorById(props.match.params.id);;

        // set data to state
        setThisAuthor(a);
        setFirstName(a.firstName);
        setLastName(a.lastName);
    }

    /* USE EFFECT HOOK */
    useEffect(() => {
        loadAllData();
    }, [props])

    // edit this specific author
    const handleUpdateAuthor = async (e) => {
        e.preventDefault();

        // update data
        let newAuthor = {
            firstName: firstName, 
            lastName: lastName
        }

        const updateAuthor = await updateAuthorById(props.match.params.id, newAuthor);

        // check if update was successful
        if(updateAuthor === true)
        {
            setShowAlert(true);
            setSuccess(true);

            setTimeout (() => {
                setShowAlert(false);
            }, 2000);

            // back to list of authors
            setTimeout (() => {
                props.history.push(`/authors`);
            }, 3500);

        }
        else
        {
            setShowAlert(true);
            setSuccess(false);

            setTimeout (() => {
                setShowAlert(false);
            }, 2000);
        }        
        
        
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
                    // conditional render of user feedback
                    showAlert == true ? 
                        success === true ?
                            <Alert variant="success" onClose={() => setShowAlert(true)}>
                                {firstName} {lastName} updated!
                            </Alert> : 
                            <Alert variant="danger" onClose={() => setShowAlert(true)}>
                                Error! {firstName} {lastName} could not be updated!
                            </Alert>
                     : <br />
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