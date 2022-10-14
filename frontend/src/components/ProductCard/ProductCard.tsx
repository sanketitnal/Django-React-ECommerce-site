import React from 'react';
import {Card, Container} from "react-bootstrap";
import ProductType from "../../types/product";
import ProductRating from "../ProductRating/ProductRating";

import "./productcard.css";

type props = {
    productInfo: ProductType;
}

const ProductCard = ({productInfo}: props) => {
  return (
    <Card className="mt-4 ms-4 p-0 rounded border-0 shadow productcard">
        <Card.Img variant="top" src={productInfo.image}/>
        <Card.Body>
            <Card.Title className="productcard-title">{productInfo.name}</Card.Title>
            
            <hr style={{padding: '0px', margin: '0px'}}/>

            <Container className="productrating-container mt-2">
                <ProductRating rating={productInfo.rating} color='#f8e825'/>
                <>{productInfo.numReviews} reviews</>
            </Container>
            
            <Card.Title className="mt-2">
                &#36; {productInfo.price}
            </Card.Title>
        </Card.Body>
    </Card>
  )
}

export default ProductCard;