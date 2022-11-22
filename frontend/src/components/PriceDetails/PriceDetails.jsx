import "./pricedetails.css";
import {ListGroup, Button, Form, Spinner, Alert} from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { preAddToCartSetup } from "../../store/cart/cartSlice";
import { addToCartThunk } from "../../store/cart/addToCart";
import { useNavigate } from 'react-router-dom';


const PriceDetails = ({price, quantity, stock, productId}) => {
    const [squant, setQuant] = useState("1");
    const { loading, error, success } = useSelector((store) => store.cart.addtocartProcess);
    const { userInfo } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        //console.log(userInfo);
    }, []);

    const addToCart = (e) => {
        if(userInfo === null) {
            navigate("/login?redirectback=true");
        } else {
            dispatch(preAddToCartSetup());
            const payload = {
                productId,
                orderQuantity: parseInt(squant),
                token: userInfo.access
            }
            dispatch(addToCartThunk(payload));
        }
    }

    return (
        <ListGroup>
            <ListGroup.Item>
                <div className="listgroup-container p-0 m-0">
                    <span className="p-0 m-0">Price:</span>
                    <span className="p-0 m-0">&#36; {price}</span>
                </div>
            </ListGroup.Item>

            <ListGroup.Item>
                <div className="listgroup-container p-0 m-0">
                    <span className="p-0 m-0">In stock:</span>
                    <span className="p-0 m-0">{stock}</span>
                </div>
            </ListGroup.Item>

            <ListGroup.Item>
                <div className="listgroup-container p-0 m-0">
                    <span className="p-0 m-0">Quantity:</span>
                    <span className="p-0 m-0">
                        <Form.Select aria-label="Select order quantity" onChange={(e) => setQuant(e.target.value)}>
                            {Array.apply(null, Array(quantity)).map((_, index) => <option key={index} value={index+1}>{index+1}</option>)}
                        </Form.Select>
                    </span>
                </div>
            </ListGroup.Item>

            <ListGroup.Item>
                <Button style={{width: '100%'}} variant="dark" disabled={loading} onClick={addToCart}>
                    {loading && <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true"/>}
                    Add to Cart
                </Button>
            </ListGroup.Item>
            {/*<ListGroup.Item>
                <Button style={{width: '100%'}} variant="dark" disabled={loading}>
                    {loading && <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true"/>}
                    Buy now
                </Button>
            </ListGroup.Item>*/}
            <br />
            <br />
            {error && <Alert key="danger" variant="danger">{error.message}</Alert>}
            {success && <Alert key="success" variant="success">Add to cart</Alert>}
        </ListGroup>
    )
}

export default PriceDetails;