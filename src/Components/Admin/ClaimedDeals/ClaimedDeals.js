import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import AcceptedCards from "./ClaimedDealsCards"
import PaginationComponent from '../../PaginationComponent';
import SearchById from "./SearchById"
export default function AcceptedDeals() {
  const [userData, setUserData] = useState([]);
  const [DealsData, setDealsData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [myPages, setMyPages] = useState(1);
  const [searchID, setSearchID] = useState(0);

  const navigate = useNavigate();

  async function getDeals(id, page) {
    let url = `${process.env.REACT_APP_SERVER_URL}/claimedDealsAdmin?userId=${id}&page=${page}${searchID !== 0 ? `&searchUserId=${searchID}` : ''}`;
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
  async function handleIdSubmit(searchIDd) {
    // console.log(searchIDd,555555675676637376376378678678678678);
    let url = `${process.env.REACT_APP_SERVER_URL}/claimedDealsAdmin?userId=${userData.id}&page=1&searchUserId=${searchIDd}`;
    // console.log(url);
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
        setMyPages(1)
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
    // console.log(2, DealsData);
  }, [DealsData]);

  return (
    <>
      <SearchById setSearchID={setSearchID} handleIdSubmit={handleIdSubmit} />
      <div style={{ marginBottom: '40px', marginTop: '20px', textAlign: 'center' }}>
        {DealsData.length !== 0 ? (
          <>

            <AcceptedCards DealsData={DealsData} />

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {totalPages >= 1 && (
                <PaginationComponent
                  totalPages={totalPages}
                  currentPage={myPages}
                  onPageClick={handlePageClick}
                />
              )}
            </div>

          </>
        ) : (
          <h1 style={{ fontSize: '24px', color: '#333', marginTop: '20px' }}>No Claimed Deals Available</h1>
        )}
      </div>
    </>
  );

};
