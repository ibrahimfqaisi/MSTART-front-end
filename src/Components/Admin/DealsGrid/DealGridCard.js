import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default function DealGridCard({ element }) {
  const cardStyle = {
    width: '18rem',
    marginBottom: '20px',
    background: '#f8f9fa', // Set your desired background color
    borderRadius: '10px', // Optional: Add border-radius for a rounded look
  };

  return (
    <Card style={cardStyle}>
      <Card.Body>
        <Card.Title><strong>Deal Name : </strong>{element.name}</Card.Title>
      </Card.Body>
        <Card.Text>
          <strong>Created Date:</strong><br />
          {new Date(element.server_datetime).toLocaleString()}
        </Card.Text>
        
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          <strong>Amount:</strong> {element.amount} {element.currency}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Currency:</strong> {element.currency}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Owner ID: </strong>{element.user_id}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>status:</strong>  {element.status}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>description:</strong><br />  {element.description}
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}
