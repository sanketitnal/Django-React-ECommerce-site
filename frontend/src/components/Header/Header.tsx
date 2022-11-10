import {Navbar, Container, Nav, Dropdown} from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { logoutUser } from "../../store/user/userSlice";

type Props = {}

const DropDownComponent = ({username}:any) => {
  const dispatch = useDispatch();

  return (
    <Dropdown>
      <Dropdown.Toggle style={{backgroundColor: "rgba(0,0,0,0)"}}>
        {username}
      </Dropdown.Toggle>

      <Dropdown.Menu variant="dark">
        <Dropdown.Item href="/profile">Profile</Dropdown.Item>
        <Dropdown.Item onClick={() => {
          dispatch(logoutUser());
        }}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}


const Header = (props: Props) => {
  const { userInfo } = useSelector((store:any) => store.user);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">ProShop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/cart"><i className="fa-solid fa-cart-shopping"></i>Cart</Nav.Link>
            {userInfo ? <DropDownComponent username={userInfo.firstName}/>:<Nav.Link href="/login"><i className="fa-solid fa-user"></i>Login</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;