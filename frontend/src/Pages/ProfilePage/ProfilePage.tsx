import React, { useEffect } from 'react'
import {Container} from 'react-bootstrap';
import "./profilepage.css";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from "../../components/Header/Header";
import ProfileForm from "../../components/ProfileForm/ProfileForm";

type Props = {}

const ProfilePage = (props: Props) => {
    const { userInfo } = useSelector((state:any) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if(!userInfo) {
            navigate("/login?redirectback=true");
        }
    }, [userInfo])
    return (
        <>
            <Header />
            <main>
                <Container className="profile-page-container">
                    <h1 className="text-align-center">PROFILE</h1>
                    <ProfileForm />
                </Container>
            </main>
        </>
    )
  }

export default ProfilePage