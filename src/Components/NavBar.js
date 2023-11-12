import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const getUserDataFromCookies = () => {
    const userDataCookie = Cookies.get('userData');
    if (userDataCookie) {
      const userData = JSON.parse(userDataCookie);
      setUserData(userData);
      console.log('User Data from Cookies:', userData);
    } else {
      console.log('User Data not found in Cookies');
    }
  };

  useEffect(() => {
    getUserDataFromCookies();
  }, []);

  const handleSignOut = () => {
    // Remove the 'userData' cookie
    Cookies.remove('userData');
    // Clear the userData state
    setUserData(null);
    console.log('User Data removed from Cookies');
    navigate("/", { replace: true });
    // Add any additional sign-out logic if needed
  };

  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Nav className="me-auto">
          {console.log(55555555555, userData)}
          {userData ? (
            userData.is_admin ? (
              <>
                {/* Admin navigation links */}
                <Nav.Link href="/admin/UsersGrid" > Users Grid</Nav.Link>
                <Nav.Link href="/admin/DealsGrid" >Deals Grid</Nav.Link>
                <Nav.Link href="/admin/ClaimedDeals" >Claimed Deals</Nav.Link>
                <Nav.Link href="/admin/AddAdmin" >Add Admin</Nav.Link>
                <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>

              </>
            ) : (
              <>
                {/* Regular user navigation links */}
                <Nav.Link href="/ExploreDeals">Explore Deals</Nav.Link>
                <Nav.Link href="/AcceptedDeals">Accepted Deals</Nav.Link>
                <Nav.Link href="/CreatedDeals">Created Deals</Nav.Link>
                <Nav.Link href="/Profile">Profile</Nav.Link>
                <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
              </>
            )
          ) : (
            <>
              {/* Rendered when userData is not available (user is not authenticated) */}
              <Nav.Link href="/Signin">Sign in</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  )
}
export default NavBar;
