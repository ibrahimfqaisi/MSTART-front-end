import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function SearchById({ setSearchID, handleIdSubmit }) {
  const [ownerId, setOwnerId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchID(ownerId);
    console.log(ownerId)
    handleIdSubmit(ownerId)
  };

  const handleInputChange = (e) => {
    setOwnerId(e.target.value);
  };

  return (
    <Navbar className="bg-body-tertiary justify-content-center">
      <Form inline onSubmit={handleSubmit}>
        <Row className="justify-content-center">
          <Col xs="auto">
            <Form.Control
              type="Number"
              placeholder="Search By Owner ID"
              className="mr-sm-2"
              value={ownerId}
              onChange={handleInputChange}
            />
          </Col>
          <Col xs="auto">
            <Button type="submit">Search</Button>
          </Col>
        </Row>
      </Form>
    </Navbar>
  );
}

export default SearchById;
