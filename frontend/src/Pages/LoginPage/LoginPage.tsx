import React, {useState, useEffect} from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import Header from '../../components/Header/Header'
import {Container} from 'react-bootstrap';
import "./loginpage.css";

type Props = {}

const LoginPage = (props: Props) => {
    return (
      <>
          <Header />
          <main>
              <Container className="login-page-container">
                  <h1 className="text-align-center">LOGIN</h1>
                  <LoginForm />
              </Container>
          </main>
      </>
    )
}

export default LoginPage