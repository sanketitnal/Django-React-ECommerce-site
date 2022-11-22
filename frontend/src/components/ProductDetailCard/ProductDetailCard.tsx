import ProductType from "../../types/product";
import ProductRating from "../ProductRating/ProductRating";
import { Card, Container } from "react-bootstrap";
import React from 'react';

type Props = {
  productDetails: ProductType
}

const ProductDetailCard = ({productDetails}: Props) => {
  return (
    <Card className="border-0">
      <Card.Body>
        <Card.Title>
          <h1> {productDetails.name} </h1>
        </Card.Title>
        <hr />
        <Container className="productrating-container">
          <ProductRating rating={productDetails.rating} color='#f8e825'/>
          <>{productDetails.numReviews} reviews</>
        </Container>
        <hr />
        <Card.Title className="mt-2">
        &#8377;{productDetails.price}
        </Card.Title>
        {productDetails.description}
      </Card.Body>
    </Card>
  )
}

export default ProductDetailCard