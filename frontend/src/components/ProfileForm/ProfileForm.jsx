import React, { useEffect, useState } from 'react';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserThunk } from '../../store/user/updateUser';
import {preUpdateAttempSetup} from '../../store/user/userSlice';
import "./profileform.css";

const ProfileForm = (props) => {
    const { userInfo } = useSelector((store) => store.user);
    const [edit, setEdit] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const dispatch = useDispatch();
    const {loading, error, success} = useSelector((store) => store.user.updateProcess);

    const onProfileUpdateRequest = (event) => {
        event.preventDefault();
        dispatch(preUpdateAttempSetup());
        dispatch(updateUserThunk({firstName, lastName, token: userInfo.access}));
    }

    useEffect(() => {
        if(userInfo) {
            setFirstName(userInfo.firstName);
            setLastName(userInfo.lastName);
        }
    }, [userInfo]);

    if(userInfo) {
        return (
            <Form className="login-form" validated={true}>
                <Form.Check type="switch" id="custom-switch" label="Edit" onChange={(event) => {
                    setEdit(event.target.checked);
                }}/>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        value={userInfo.email} 
                        disabled
                    />
                    <Form.Text>You cannot change your email</Form.Text>
                </Form.Group>


                <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>First name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="First name" 
                        value={firstName}
                        disabled={!edit}
                        minLength={2}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLastName">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Last name" 
                        value={lastName}
                        disabled={!edit}
                        minLength={2}
                        onChange={e => setLastName(e.target.value)}
                    />
                </Form.Group>

              <Button variant="primary" type="submit" onClick={onProfileUpdateRequest} disabled={loading || !edit} >
                {loading && <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true"/>}
                Update
              </Button>
                <br />
                <br />
                {error && <Alert key="danger" variant="danger">{error.message}</Alert>}
                {success && <Alert key="success" variant="success">Successfully updated</Alert>}
            </Form>
        );
    } else {
        return <h3>User not logged in</h3>
    }
}

export default ProfileForm