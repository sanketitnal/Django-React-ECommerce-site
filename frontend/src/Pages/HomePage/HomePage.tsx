import React, { useEffect, useState } from 'react';
import { Container } from "react-bootstrap";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProductType from "../../types/product";
import LoadingErrorOrChild from '../../utils/LoadingErrorOrChild/LoadingErrorOrChild';
import "./homepage.css";
import useFetch from '../../utils/useFetch/useFetch';

const url = "/api/product/all/?format=json";

const HomePage = () => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const options = {};
    const {loading, error, result} = useFetch({url, options});

    useEffect(() => {
        if(result) {
            setProducts(result);
        }
    }, [result]);

return (
    <>
        <Header/>
        <main>
            <Container className="homepage-container py-4">
                <LoadingErrorOrChild loading={loading} error={error}>
                    {products.map((productInfo:ProductType, index:number) => 
                        <a className="productcard-anchor" key={productInfo._id} href={`/product/${productInfo._id}`}>
                            <ProductCard key={productInfo._id} productInfo={productInfo} />
                        </a>
                    )}
                </LoadingErrorOrChild>
            </Container>
        </main>
        <Footer />
    </>
    )
}

export default HomePage