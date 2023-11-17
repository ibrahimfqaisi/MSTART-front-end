import React, { useState, useEffect } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Nav } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleButtonClick = async (event) => {
    event.preventDefault();

    let url = `${process.env.REACT_APP_SERVER_URL}/add-user`;

    let data = {
      name: name,
      phone: phone,
      gender: gender,
      dateOfBirth: dateOfBirth,
      email: email,
      password: password,
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
      const userData = receivedData;
      userData.showAdminPage = true;
      // console.log(userData);
      

      Cookies.set('userData', JSON.stringify(userData), { expires: 1 / 96 }); // 1/96 is equivalent to 15 minutes
      navigate('/');
      window.location.reload();
    } else if (response.status === 400) {
      alert('Email address already exists');
    }
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ height: '100vh', background: '#f8f9fa' }} 
    >
      <Form
        onSubmit={handleButtonClick}
        style={{
          width: '400px',
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          marginTop: '50px',
        }}
      >
        <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
          <Form.Control type="text" placeholder="Your Name" onChange={(e) => setName(e.target.value)} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
          <Form.Control type="email" placeholder="name@example.com" onChange={handleEmailChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPhone" label="Phone" className="mb-3">
          <Form.Control type="tel" placeholder="Your Phone" onChange={(e) => setPhone(e.target.value)} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingGender" label="Gender" className="mb-3">
          <Form.Control as="select" onChange={(e) => setGender(e.target.value)} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Form.Control>
        </FloatingLabel>
        <FloatingLabel controlId="floatingDateOfBirth" label="Date of Birth" className="mb-3">
          <Form.Control type="date" onChange={(e) => setDateOfBirth(e.target.value)} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} required />
        </FloatingLabel>
        <Button type="submit" variant="primary" style={{ marginTop: '20px', width: '100%' }}>
          Signup
        </Button>{' '}
      </Form>
        <Nav >
          <Nav.Link href="/Signin">Signin</Nav.Link>
        </Nav>
    </div>
  );
};

export default Signup;
