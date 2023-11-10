import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import AcceptedCards from "./AcceptedCards"
export default function AcceptedDeals() {
  const [userData, setUserData] = useState(null);
  const [DealsData, setDealsData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [myPages, setMyPages] = useState(1);
  const navigate = useNavigate();

  async function getDeals(id, page) {
    let url = `${process.env.REACT_APP_SERVER_URL}/claimedDeals?userId=${id}&page=${page}`;
    try {
      const response = await fetch(url, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const receivedData = await response.json();

      if (response.status === 200) {
        setDealsData(receivedData.claimedDeals);
        setTotalPages(receivedData.totalPages);
      }
    } catch (error) {
      console.error('Error during get Deals Data:', error);
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
  }

  const handlePageClick = (pageNumber) => {
    setMyPages(pageNumber);
  };

  useEffect(() => {
    async function checkUserData() {
      const userDataFromCookies = await getUserDataFromCookies();
      if (!userDataFromCookies) {
        setUserData(userDataFromCookies);
        navigate('/', { replace: true });
      } else {
        getDeals(userDataFromCookies.id, myPages);
      }
    };

    checkUserData();
  }, [navigate, myPages]);

  useEffect(() => {
    console.log(2, DealsData);
  }, [DealsData]);

  return (
    <>
      <div style={{ marginBottom: '40px', marginTop: '20px', textAlign: 'center' }}>
        {DealsData.length !== 0 ? (
          <>
            <h1 style={{ fontSize: '24px', color: '#333', marginBottom: '20px' }}>Claimed Deals</h1>
            <AcceptedCards DealsData={DealsData} />
  
            {totalPages >= 1 && (
              <div style={{ textAlign: 'center' }}>
                {Array.from({ length: totalPages }, (_, index) => (
                  <span
                    key={index + 1}
                    style={{ cursor: 'pointer', marginRight: '5px', fontSize: '18px', color: '#007BFF' }}
                    onClick={() => handlePageClick(index + 1)}
                  >
                    {index + 1}
                  </span>
                ))}
              </div>
            )}
          </>
        ) : (
          <h1 style={{ fontSize: '24px', color: '#333', marginTop: '20px' }}>No Claimed Deals Available</h1>
        )}
      </div>
    </>
  );
  
};