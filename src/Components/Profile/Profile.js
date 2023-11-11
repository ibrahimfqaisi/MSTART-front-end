import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export default function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [ProfileData, setProfileData] = useState([]);
  const [ShowForm, setShowForm] = useState(false);
  const [UrlPhoto, setUrlPhoto] = useState(null);

  async function handlePhotoUrlChange(event) {
    setUrlPhoto(event.target.value);
  }

  async function handleEditPhoto(event) {
    event.preventDefault();
    setShowForm(true);
  }

  async function handleButtonClick(event) {
    event.preventDefault();
    let url = `${process.env.REACT_APP_SERVER_URL}/update-photo-url`;

    let data = {
      userId: ProfileData.id,
      photo_url: UrlPhoto,
    };

    console.log(data);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const dealData = await response.json();
        console.log(dealData);
        // alert('Photo updated successfully');
        window.location.reload();
      } else {
        // Check for a 500 Internal Server Error
        if (response.status === 500) {
          alert('Failed to update the photo. Please try again later.');
        } else {
          // Handle other error statuses here if needed
          alert('An error occurred. Please try again.');
        }
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      alert('An unexpected error occurred. Please try again later.');
    } finally {
      setShowForm(false);
    }
  }

  async function getProfile(id) {
    let url = `${process.env.REACT_APP_SERVER_URL}/userProfile?userId=${id}`;
    try {
      const response = await fetch(url, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const receivedData = await response.json();

      if (response.status === 200) {
        setProfileData(receivedData);
      }
    } catch (error) {
      console.error("Error during get Deals Data:", error);
    }
  }

  async function getUserDataFromCookies() {
    return new Promise((resolve) => {
      const userDataCookie = Cookies.get('userData');
      if (userDataCookie) {
        const userData = JSON.parse(userDataCookie);
        setUserData(userData);
        resolve(userData);
      } else {
        resolve(null);
      }
    });
  };

  useEffect(() => {
    const checkUserData = async () => {
      const userDataFromCookies = await getUserDataFromCookies();
      if (!userDataFromCookies) {
        setUserData(userDataFromCookies);
        navigate("/", { replace: true });
      } else {
        getProfile(userDataFromCookies["id"]);
      }
    };

    checkUserData();
  }, [navigate]);

  useEffect(() => {
    console.log(2, ProfileData);
  }, [ProfileData]);

  return (
    <>
      {ShowForm && (
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{
            position: 'relative',
            height: '100vh',
            background: 'rgba(248, 249, 250, 0.8)',
            zIndex: 1,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: -1,
              background: 'url("your-background-image-url.jpg")',
              backgroundSize: 'cover',
              filter: 'blur(5px)',
            }}
          ></div>

          <Form
            onSubmit={handleButtonClick}
            style={{
              position: 'relative',
              zIndex: 1,
              width: '400px',
              background: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <FloatingLabel controlId="floatingInput" label="Photo URL" className="mb-3">
              <Form.Control type="url" placeholder="Enter photo URL" onChange={handlePhotoUrlChange} required />
            </FloatingLabel>

            <Button type="submit" variant="primary" style={{ marginTop: '20px', width: '100%' }}>
              Update
            </Button>
            <Button type="button" onClick={() => setShowForm(false)} variant="secondary" style={{ marginTop: '20px', width: '100%' }}>
              Cancel
            </Button>{' '}
          </Form>
        </div>
      )}

      {!ShowForm && (
        <div className="main">
          <h2>User Details</h2>
          <div className="card">
            <div className="card-body">
              <i className="fa fa-pen fa-xs edit"></i>
              <table>
                <tbody>
                  <tr>
                    <td>Phone</td>
                    <td>:</td>
                    <td>{ProfileData.Phone}</td>
                  </tr>
                  <tr>
                    <td>Date Of Birth</td>
                    <td>:</td>
                    <td>{new Date(ProfileData.Date_Of_Birth).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>:</td>
                    <td>{ProfileData.email}</td>
                  </tr>

                  <tr>
                    <td>Claimed Deals</td>
                    <td>:</td>
                    <td>{ProfileData.claimedDeals ? ProfileData.claimedDeals.dealcount : 'N/A'}</td>
                  </tr>
                  <tr>
                    <td>Total Value of Claimed Deals</td>
                    <td>:</td>
                    <td>{ProfileData.claimedDeals ? (ProfileData.claimedDeals.totalamount !== null ? ProfileData.claimedDeals.totalamount : 0) : 0}</td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <div className="sidenav">
        <div className="profile">
          <img src={ProfileData.photo_url} alt="" width="100" height="100" />

          <div className="name">
            {ProfileData.name}
          </div>
          <div className="sidenav-url">
            <div className="url">
              <button className="active " onClick={handleEditPhoto}>
                Edit Photo
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}