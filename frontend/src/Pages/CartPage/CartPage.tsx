import React, { useEffect } from "react";
import "./cartpage.css";
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Col, Row } from 'react-bootstrap';
import LoadingErrorOrChild from '../../utils/LoadingErrorOrChild/LoadingErrorOrChild';
import useFetch from "../../utils/useFetch/useFetch";

type Props = {}


const CartPage = (props: Props) => {
    const url = "http://localhost:8000/api/cart/get/";
    const { userInfo } = useSelector((state:any) => state.user);
    const {loading, error, result}:any = useFetch({url, options: {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${userInfo && userInfo.access}`,
            "Content-type": "application/json"
        }
    }});
    const navigate = useNavigate();

    useEffect(() => {
        console.log(":"+(userInfo && userInfo.access)+":")
        if(!userInfo) {
            navigate("/login?redirectback=true");
        }
    }, [userInfo]);

    useEffect(() => {
        console.log(result);
    }, [result]);

    return (
        <>
        <Header />
        <main className="">
            <Container className="p-2" style={{border: "1px solid black"}}>
                <Button href="/" variant="dark" className="rounded">Back</Button>
            </Container>
            <Container className="p-2" style={{border: "1px solid black"}}>
                <LoadingErrorOrChild loading={loading} error={error}>
                    <Row>
                        <Col style={{border: "1px solid black"}} xs={9}>
                            <h3>Shopping Cart</h3>
                            {result && result.map((item:any) =>
                                <h6>{item.product.name}</h6>
                            )}
                        </Col>
                        <Col style={{border: "1px solid black"}}>
                            <h3>Subtotal</h3>
                        </Col>
                    </Row>
                </LoadingErrorOrChild>
            </Container>
        </main>
        <Footer />
        </>
    )
}

export default CartPage;