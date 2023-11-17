import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const DealCard = ({ element, userid }) => {
    const [updatedStatus, setUpdatedStatus] = useState(element.status);

    async function handleStatusChange  (newStatus)  {
        const url = `${process.env.REACT_APP_SERVER_URL}/DealStatus`;

        const data = {
            dealId: element.id,
            newStatus: newStatus,
            userId: userid,
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const updatedDeal = await response.json();

            if (response.status === 200) {
                setUpdatedStatus(updatedDeal.status);
            } else {
                console.error('Failed to update deal status');
            }
        } catch (error) {
            console.error('Error during status update:', error);
        }
    };

    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{element.name}</Card.Title>
                    <Card.Text>
                        {element.description}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Amount: {element.amount}</ListGroup.Item>
                    <ListGroup.Item>Currency: {element.currency}</ListGroup.Item>
                    <ListGroup.Item>Status: {updatedStatus}</ListGroup.Item>
                    <ListGroup.Item>Deal Maker: {element.username}</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                    <DropdownButton title="Change Status" variant="primary">
                        <Dropdown.Item onClick={() => handleStatusChange('Active')}>Active</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleStatusChange('Inactive')}>Inactive</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleStatusChange('Deleted')}>Deleted</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleStatusChange('Expired')}>Expired</Dropdown.Item>
                    </DropdownButton>
                </Card.Body>
            </Card>
        </>
    );
};

export default DealCard;
