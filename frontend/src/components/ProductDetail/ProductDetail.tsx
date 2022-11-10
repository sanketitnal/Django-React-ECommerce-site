import "./productdetail.css"
import {Container, Image, Row, Col} from "react-bootstrap";
import ProductType from "../../types/product";
import ProductDetailCard from "../ProductDetailCard/ProductDetailCard";
import PriceDetails from "../PriceDetails/PriceDetails";
import React, {useState, useEffect} from 'react';
import useFetch from "../../utils/useFetch/useFetch";
import LoadErrorOrChild from "../../utils/LoadingErrorOrChild/LoadingErrorOrChild";

type Props = {
    productId: number
}

const defaultProductDetail:ProductType = {
    _id: 0,
    name: "",
    image: "",
    description: "",
    brand: "",
    category: "",
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    maxOrderQuantity: 0,
}

const ProductDetail = ({productId}: Props) => {
    const url = `http://localhost:8000/api/product/${productId}?format=json`;
    const options = {};
    const {loading, error, result} = useFetch({url, options});
    const [productDetails, setProductDetails] = useState<ProductType>(defaultProductDetail);

    useEffect(() => {
        if(result) {
            setProductDetails(result);
            console.log(result);
        }
    }, [result]);

    return (
        <LoadErrorOrChild loading={loading} error={error}>
            <Container className="">
                <Row>
                    <Col className="p-0" sm={12} md={12} lg={6}>
                        <Image src={productDetails.image} fluid style={{maxHeight: "510px"}}></Image>
                    </Col>
                    
                    <Col className="p-0" sm={12} md={8} lg={3}>
                    <ProductDetailCard productDetails={productDetails}/>
                    </Col>

                    <Col className="p-0 pt-2" sm={12} md={4} lg={3}>
                        <PriceDetails price={productDetails.price} stock={productDetails.countInStock} quantity={productDetails.maxOrderQuantity} productId={productId}/>
                    </Col>
                </Row>
            </Container>
        </LoadErrorOrChild>
    )
}

export default ProductDetail;