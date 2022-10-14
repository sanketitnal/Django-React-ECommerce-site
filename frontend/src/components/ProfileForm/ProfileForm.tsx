import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import "./profileform.css";

type Props = {}

const ProfileForm = (props: Props) => {
    const { userInfo } = useSelector((store:any) => store.user);
    const [edit, setEdit] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

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

            {/*
              <Button variant="primary" type="submit" onClick={loginSubmitHandler} disabled={loading} >
                {loading && <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true"/>}
                Login
              </Button>
              &nbsp; New user? <Link to="/register">Register</Link>
              <br />
              <br />
        {error && <Alert key="danger" variant="danger">{error.message}</Alert>}*/}
            </Form>
        );
    } else {
        return <h3>User not logged in</h3>
    }
}

export default ProfileForm