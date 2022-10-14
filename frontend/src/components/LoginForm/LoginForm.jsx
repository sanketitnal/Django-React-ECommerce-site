import React, {useState, useEffect } from 'react'
import { Button, Form, Alert, Spinner } from "react-bootstrap";
import "./loginform.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "../../store/user/loginUser";
import {preLoginAttemptSetup} from "../../store/user/userSlice";
import { useNavigate, useSearchParams, Link,  } from 'react-router-dom';

const LoginForm = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const dispatch = useDispatch();
    const { loading, error } = useSelector((store) => store.user.loginProcess);
    const { userInfo } = useSelector((store) => store.user);
    const [searchParam, setSearchParam ] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(`isLoggedIn? = ${userInfo}`);
        if(userInfo) {
            if(searchParam.get("redirectback")) {
                navigate(-1);
            } else {
                navigate("/");
            }
        }
    }, [userInfo]);

    const loginSubmitHandler = async (event) => {
        event.preventDefault();
        dispatch(preLoginAttemptSetup());
        dispatch(loginUserThunk({username: email, password}));
    }

    return (
        <Form className="login-form" validated={true}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
                type="email" 
                placeholder="Enter email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
            />
          </Form.Group>
    
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
                type="password" 
                placeholder="Password" 
                value={password}
                minLength={8}
                onChange={(e) => setPassword(e.target.value)} 
                required
            />
            <Form.Text className="text-muted">
                minimum 8 characters
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit" onClick={loginSubmitHandler} disabled={loading} >
            {loading && <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true"/>}
            Login
          </Button>
          &nbsp; New user? <Link to="/register">Register</Link>
          <br />
          <br />
          {error && <Alert key="danger" variant="danger">{error.message}</Alert>}
        </Form>
      );
}

export default LoginForm