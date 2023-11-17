import React, { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function AddDeal({ userid }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleButtonClick = async (event) => {
    event.preventDefault();

    let url = `${process.env.REACT_APP_SERVER_URL}/add-deal`;

    let data = {
      name: name,
      description: description,
      amount: parseFloat(amount),
      currency: currency,
      user_id: userid,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const receivedData = await response.json();

    if (response.status === 201) {
      const dealData = receivedData;
      // console.log(dealData);
      alert('Deal added successfully!');
      window.location.reload(); // Reload the page
    } else {
      alert('Failed to add the deal. Please try again.');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: '100vh', background: '#f8f9fa' }} 
    >
      <Form
        onSubmit={handleButtonClick}
        style={{ width: '400px', background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
      >
        <FloatingLabel controlId="floatingDealName" label="Deal Name" className="mb-3">
          <Form.Control type="text" placeholder="Deal Name" onChange={handleNameChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingDealDescription" label="Deal Description" className="mb-3">
          <Form.Control type="text" placeholder="Deal Description" onChange={handleDescriptionChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingDealAmount" label="Deal Amount" className="mb-3">
          <Form.Control type="number" placeholder="Deal Amount" onChange={handleAmountChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingDealCurrency" label="Deal Currency" className="mb-3">
          <Form.Control as="select" style={{ height: '50px', overflowY: 'auto' }} onChange={handleCurrencyChange} required>
            <option value="">Select Deal Currency</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="JOD">JOD (Jordanian Dinar)</option>
            <option value="SAR">SAR (Saudi Riyal)</option>
            {/* Add more currency options as needed */}
          </Form.Control>
        </FloatingLabel>
        <Button type="submit" variant="primary">
          Add Deal
        </Button>{' '}
      </Form>
    </div>
  );
}
