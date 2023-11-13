import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default function AcceptedCard({ element }) {
  const cardStyle = {
    width: '18rem',
    marginBottom: '20px',
    background: '#f8f9fa', // Set your desired background color
    borderRadius: '10px', // Optional: Add border-radius for a rounded look
  };

  return (
    <Card style={cardStyle}>
      <Card.Body>
        <Card.Title>Claimed Deal</Card.Title>
      </Card.Body>
        <Card.Text>
          <strong>Claimed Date:</strong><br /> {new Date(element.server_datetime).toLocaleString()}
        </Card.Text>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          <strong>Deal ID:</strong> {element.deal_id}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Amount:</strong> {element.amount} {element.currency}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Currency:</strong> {element.currency}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>UserID for claimed deals:</strong> {element.user_id}
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}
