import React, { useState, useEffect } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Nav } from "react-bootstrap";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const receivedData = await response.json();

    if (response.status === 201) {
      const userData = receivedData;
      console.log(userData);

      // Set data as a cookie with a 15-minute expiration time
      Cookies.set('userData', JSON.stringify(userData), { expires: 1 / 96 }); // 1/96 is equivalent to 15 minutes
      navigate("/");
      window.location.reload();
    } else if (response.status === 400) {
      alert("Email address already exists");
    }
  };

  const getUserDataFromCookies = async () => {
    return new Promise((resolve) => {
      const userDataCookie = Cookies.get('userData');
      if (userDataCookie) {
        const userData = JSON.parse(userDataCookie);
        setUserData(userData);

        console.log('User Data from Cookies:', userData);
        // Do something with userData
        resolve(userData);
      } else {
        console.log('User Data not found in Cookies');
        resolve(null);
      }
    });
  };

  useEffect(() => {
    const checkUserData = async () => {
      const userDataFromCookies = await getUserDataFromCookies();
      if (userDataFromCookies) {
        setUserData(userDataFromCookies);
        navigate("/", { replace: true });
      }
    };

    checkUserData();
  }, [navigate]);

  return (
    <Form onSubmit={handleButtonClick}>
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
        <option value="other">Other</option>
      </Form.Control>
    </FloatingLabel>
    <FloatingLabel controlId="floatingDateOfBirth" label="Date of Birth" className="mb-3">
      <Form.Control type="date" onChange={(e) => setDateOfBirth(e.target.value)} required />
    </FloatingLabel>
    <FloatingLabel controlId="floatingPassword" label="Password">
      <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} required />
    </FloatingLabel>
    <Button type="submit" variant="primary">
      Signup
    </Button>{' '}
    <Nav>
      <Nav.Link href="/Signin">Signin</Nav.Link>
    </Nav>
  </Form>  
  );
};

export default Signup;
