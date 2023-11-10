import React, { useState, useEffect } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';




const Signin = () => {
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();
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

    let url = `${process.env.REACT_APP_SERVER_URL}/login`;

    let data = {
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

    if (response.status === 200) {
      const userData = receivedData["user"];
      console.log(userData);

      // Set data as a cookie with a 15-minute expiration time
      Cookies.set('userData', JSON.stringify(userData), { expires: 1 / 96 }); // 1/96 is equivalent to 15 minutes
      navigate("/");
      window.location.reload();
    } else if (response.status === 401) {
      alert("Invalid email or password");
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
<>
  <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
    <Form.Control type="email" placeholder="name@example.com" onChange={handleEmailChange} />
  </FloatingLabel>
  <FloatingLabel controlId="floatingPassword" label="Password">
    <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} />
  </FloatingLabel>
  <Button variant="primary" onClick={handleButtonClick}>
    Login
  </Button>{' '}
  <Nav>
    <Nav.Link href="/Signup">Sign up</Nav.Link>
  </Nav>
</>


  );
};

export default Signin;
