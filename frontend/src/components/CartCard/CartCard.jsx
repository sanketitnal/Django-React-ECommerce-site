import React, {useState} from 'react';
import "./CartCard.css";
import { Form, Spinner, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteItemInCartThink } from "../../store/cart/deleteItemInCart";
import { preDeleteItemInCartSetup, preUpdateItemQuantitySetup } from '../../store/cart/cartSlice';
import { updateItemQuantityThunk } from "../../store/cart/updateItemQuantity";

const CartCard = ({productId, productName, price, quantity, maxQuantity, imagePath, loading, error, token}) => {
    const { userInfo } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const totalCost = Math.round(price*quantity*100)/100;
    const [tquant, setTquant] = useState(quantity);

    const onQuantityChange = (e) => {
        let newQuantity = parseInt(e.target.value);
        setTquant(newQuantity);
        dispatch(preUpdateItemQuantitySetup({ productId }));
        dispatch(updateItemQuantityThunk({ productId, newQuantity, token }));
    }

    return (
        <>
        <div className="cart-card-container">
            <img className="cart-card-image" alt={productName} src={"http://localhost:8000"+imagePath} />
            <div className="cart-card-heading cart-card-inline-flex-container">{productName}</div>
            <div className="cart-card-heading cart-card-inline-flex-container">
                <Form.Select aria-label="Select order quantity" value={tquant} onChange={onQuantityChange}>
                    {Array.apply(null, Array(maxQuantity)).map((_, index) => <option disabled={loading} key={index} value={index+1}>{index+1}</option>)}
                </Form.Select>
            </div>
            <div className="cart-card-price cart-card-inline-flex-container">x ₹{price} = ₹{totalCost}</div>

            <div style={{float: "right", paddingRight: "10px"}}className="cart-card-price cart-card-inline-flex-container">
                <button style={{border: "0px"}} disabled={loading} onClick={() => {
                    dispatch(preDeleteItemInCartSetup({productId}));
                    dispatch(deleteItemInCartThink({productId, token: userInfo.access}));
                }}><i className="fa-solid fa-trash"></i></button>
            </div>

            {loading && <div className="cart-card-inline-flex-container cart-card-price" style={{float: "right"}}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>}
        </div>
        <div style={{display: error ? "block": "none"}}>
            <Alert variant="danger">{error && error}</Alert>
        </div>
        </>
    )
}

export default CartCard;