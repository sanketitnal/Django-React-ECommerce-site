import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import { useParams } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import React from 'react';

type Props = {}

const ProductDetails = (props: Props) => {
    const {productId} = useParams();

    return (
        <>
        <Header />
        <main className="">
            <Container className="p-2">
                <Button href="/" variant="dark" className="rounded">Back</Button>
            </Container>
            <ProductDetail productId={Number(productId)}/>
        </main>
        <Footer />
        </>
    )
}

export default ProductDetails;