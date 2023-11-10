import React, { useState, useEffect } from 'react';
import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import DealsCards from "./DealsCards"

export default function ExploreDeals() {
  const [userData, setUserData] = useState(1);
  const [DealsData, setDealsData] = useState([]);

  const navigate = useNavigate();

  async function getDeals(id) {
    console.log(id);
    let url = `${process.env.REACT_APP_SERVER_URL}/Deals?userId=${id}`;
    try {
      const response = await fetch(url, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const receivedData = await response.json();

      if (response.status === 200) {
        const DealsData1 = receivedData;
        console.log(1111, DealsData1);

        setDealsData(receivedData);
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
        // console.log(userData["id"])
        resolve(userData);
      } else {
        // console.log('User Data not found in Cookies');
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
        getDeals(userDataFromCookies["id"]);
      }
    };

    checkUserData();
  }, [navigate]);

  useEffect(() => {
    console.log(2, DealsData);
  }, [DealsData]);

  return (
    <>
          <div style={{ marginBottom: '40px', marginTop: '20px', textAlign: 'center' }}>

      <h1 style={{ fontSize: '24px', color: '#333', marginBottom: '20px' }}>Explore Deals</h1>

      <DealsCards DealsData={DealsData} userid={userData["id"]} />
      </div>

    </>
  )
}

