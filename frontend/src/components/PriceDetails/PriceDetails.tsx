import "./pricedetails.css";
import {ListGroup, Button} from 'react-bootstrap';
import React from 'react';

type Props = {
    price: number,
    quantity: number
}

const PriceDetails = ({price, quantity}: Props) => {
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
                    <span className="p-0 m-0">Quantity:</span>
                    <span className="p-0 m-0">{quantity}</span>
                </div>
            </ListGroup.Item>

            <ListGroup.Item>
                <Button style={{width: '100%'}} variant="dark">Add to Cart</Button>
            </ListGroup.Item>
            <ListGroup.Item>
                <Button style={{width: '100%'}} variant="dark">Buy now</Button>
            </ListGroup.Item>
        </ListGroup>
    )
}

export default PriceDetails;