import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Axios from 'axios';
export default function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [ProfileData, setProfileData] = useState([]);
  const [ShowForm, setShowForm] = useState(false);
  const [Photo, setPhoto] = useState(null);


  async function handleEditPhoto(event) {
    event.preventDefault();
    setShowForm(true);
  }

  async function handlePhotoChange() {

  }



  async function handleButtonClick(event) {
    event.preventDefault();
    setShowForm(false);
    try {
      const formdata = new FormData();
      formdata.append("file", Photo);
      formdata.append("upload_preset", `${process.env.REACT_APP_PASS_CLOUD}`);

      const response = await fetch("https://api.cloudinary.com/v1_1/dcg2uvtqt/image/upload", {
        method: 'POST',
        body: formdata,
      });

      const responseData = await response.json();
      const UrlPhoto = `https://res.cloudinary.com/${process.env.REACT_APP_NAME_CLOUD}/image/upload/${responseData.public_id}`;
      let url = `${process.env.REACT_APP_SERVER_URL}/update-photo-url`;
      // console.log(UrlPhoto);
      // console.log(url);

      let data = {
        userId: ProfileData.id,
        photo_url: UrlPhoto,
      };


      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          window.location.reload();
        } else {
          if (response.status === 500) {
            alert('Failed to update the photo. Please try again later.');
          } else {
            alert('An error occurred. Please try again.');
          }
        }
      } catch (error) {
        console.error('An unexpected error occurred:', error);
        alert('An unexpected error occurred. Please try again later.');
      } finally {
      }
    } catch (error) {
      console.error('Error uploading photo to Cloudinary:', error);
    }
    await handlePhotoChange()

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
            <FloatingLabel controlId="floatingInput" label="Photo" className="mb-3">
              <Form.Control type="file" onChange={(event) => { setPhoto(event.target.files[0]) }} required />
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
                    <td>User ID</td>
                    <td>:</td>
                    <td>{ProfileData.id}</td>
                  </tr>
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
