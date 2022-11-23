import React, {useState, useEffect } from 'react'
import { Button, Form, Alert, Spinner } from "react-bootstrap";
import "./registerform.css";
import { useDispatch, useSelector } from "react-redux";
import { registerUserThunk } from "../../store/user/registerUser";
import { preRegisterAttemptSetup } from "../../store/user/userSlice";
import { useNavigate, useSearchParams, Link } from 'react-router-dom';

const RegisterForm = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [useSearchParam] = useSearchParams();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((store) => store.user.registerProcess);
  const { userInfo } = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
      if(userInfo) {
          if(useSearchParam.get("redirectback")) {
              console.log("Before navigate");
              navigate(-1);
          } else {
              console.log("Before redirect");
              navigate("/");
          }
      }
  }, [userInfo]);

  useEffect(() => {
    setPasswordMatchError(password1 !== password2 || password1.length < 8);
  }, [password1, password2])

  const registerSubmitHandler = async (event) => {
      event.preventDefault();
      if(!passwordMatchError) {
        dispatch(preRegisterAttemptSetup());
        let userRegistrationDetails = {
          email,
          password: password1,
          firstName,
          lastName
        }
        dispatch(registerUserThunk(userRegistrationDetails));
      }
  }

  return (
      <Form className="register-form" validated={true}>
        <Form.Group className="mb-3" controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control 
              type="text" 
              placeholder="Enter first name" 
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
              required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control 
              type="text" 
              placeholder="Enter last name" 
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)} 
              required
          />
        </Form.Group>

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
              value={password1}
              minLength={8}
              onChange={(e) => setPassword1(e.target.value)} 
              required
          />
          <Form.Text className="text-muted">
              minimum 8 characters
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Re-enter password</Form.Label>
          <Form.Control 
              type="password" 
              placeholder="Type same password again" 
              value={password2}
              minLength={8}
              onChange={(e) => setPassword2(e.target.value)} 
              required
          />
          {passwordMatchError && <Form.Text style={{color: "red"}}>Passwords don't match</Form.Text>}
        </Form.Group>

        <Button variant="primary" type="submit" onClick={registerSubmitHandler} disabled={loading || passwordMatchError} >
          {loading && <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true"/>}
          Register
        </Button>
        &nbsp; Already a user? <Link to="/login">Login</Link>
        <br />
        <br />
        {error && <Alert variant="danger">{error.message}</Alert>}
      </Form>
    );
}

export default RegisterForm