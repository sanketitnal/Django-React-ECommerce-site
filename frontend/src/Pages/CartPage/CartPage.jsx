import React, { useEffect, useState } from "react";
import "./cartpage.css";
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Col, Row } from 'react-bootstrap';
import LoadingErrorOrChild from '../../utils/LoadingErrorOrChild/LoadingErrorOrChild';
import CartCard from "../../components/CartCard/CartCard";
import { loadCartThunk } from "../../store/cart/loadCart";
import { preLoadCartSetup } from "../../store/cart/cartSlice";

const CartPage = (props) => {
    const url = "http://localhost:8000/api/cart/get/";
    const { userInfo } = useSelector((state) => state.user);
    const { loading, error, success } = useSelector((state) => state.cart.loadCartProcess);
    const { cartItems, cartItemsIsLoading, cartItemsError } = useSelector((state) => state.cart);
    const [totalCost, setTotalCost] = useState(0);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(!userInfo) {
            navigate("/login?redirectback=true");
        }
    }, [userInfo]);


    useEffect(() => {
        if(userInfo !== null) {
            dispatch(preLoadCartSetup());
            dispatch(loadCartThunk({token: userInfo.access}));
        }
    }, []);

    useEffect(()=>{
        if(cartItems) {
            let tCost = 0;
            for(let item of cartItems) {
                tCost += Number(item.quantity*item.product.price);
            }
            tCost = Math.round(tCost*100)/100;
            setTotalCost(tCost);
        }
    }, [cartItems]);

    return (
        <>
        <Header />
        <main className="">
            <Container className="p-2" style={{border: "0px solid black"}}>
                <Button href="/" variant="dark" className="rounded">Back</Button>
            </Container>
            <Container className="p-2" style={{border: "0px solid black"}}>
                <LoadingErrorOrChild loading={loading} error={error}>
                    <Row>
                        <Col style={{border: "0px solid black"}} xs={12} sm={9}>
                            <h3>Shopping Cart</h3>
                            <hr />
                            {(!cartItems || cartItems.length == 0) ? <h5>No items in cart</h5>: ""}
                            {cartItems && cartItems.map((item) =>
                                <div style={{padding: "0px", margin: "0px"}} key={item._id}>
                                    <CartCard
                                        productId={item.product._id}
                                        productName={item.product.name}
                                        price={item.product.price}
                                        quantity={item.quantity}
                                        maxQuantity={item.product.maxOrderQuantity}
                                        imagePath={item.product.image}
                                        loading={cartItemsIsLoading[item.product._id]}
                                        error={cartItemsError[item.product._id]}
                                        token={userInfo.access}
                                    />
                                    <hr />
                                </div>
                            )}
                        </Col>
                        <Col style={{border: "0px solid black"}}>
                            <h3>Subtotal</h3>
                            <hr />
                            <h4>₹ {totalCost}</h4>
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