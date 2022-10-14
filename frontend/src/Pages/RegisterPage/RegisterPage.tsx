import React, {useState, useEffect} from 'react'
import RegisterForm from '../../components/RegisterForm/RegisterForm'
import Header from '../../components/Header/Header'
import {Container} from 'react-bootstrap';
import "./registerpage.css";

type Props = {}

const RegisterPage = (props: Props) => {
    return (
      <>
          <Header />
          <main>
              <Container className="register-page-container">
                  <h1 className="text-align-center">REGISTER</h1>
                  <RegisterForm />
              </Container>
          </main>
      </>
    )
}

export default RegisterPage