import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default function AcceptedCard({ element }) {
  const cardStyle = {
    width: '18rem',
    marginBottom: '20px',
    background: '#f8f9fa',
    borderRadius: '10px', 
  };

  return (
    <Card style={cardStyle}>
      <Card.Body>
        <Card.Title>Claimed Deal</Card.Title>
        <Card.Text>
          <strong>Claimed Date:</strong> {new Date(element.server_datetime).toLocaleString()}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          <strong>Amount:</strong> {element.amount} {element.currency}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Currency:</strong> {element.currency}
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}
