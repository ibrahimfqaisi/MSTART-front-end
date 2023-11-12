import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import PaginationComponent from '../../PaginationComponent';

const UsersGrid = () => {
  const [userData, setUserData] = useState({});
  const [UsersData, setUsersData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [myPages, setMyPages] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxClick = (e, userId) => {
    const checked = e.target.checked;

    if (checked) {
      setSelectedUserIds((prevSelected) => [...prevSelected, userId]);
    } else {
      setSelectedUserIds((prevSelected) => prevSelected.filter((id) => id !== userId));
    }

    const row = e.target.closest('tr');

    if (checked) {
      row.classList.add('row-selected');
      e.target.closest('.selection-button-checkbox').classList.add('selected');
    } else {
      row.classList.remove('row-selected');
      e.target.closest('.selection-button-checkbox').classList.remove('selected');
    }
  };

  const handleToggleAllClick = () => {
    setSelectAll(!selectAll);

    const updatedSelectedIds = selectAll ? [] : UsersData.map((user) => user.id);
    setSelectedUserIds(updatedSelectedIds);

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      const row = checkbox.closest('tr');
      const selectionButton = checkbox.closest('.selection-button-checkbox');

      if (checkbox.id !== 'toggleAll') {
        checkbox.checked = !selectAll;
        row.classList.toggle('row-selected', !selectAll);
        selectionButton.classList.toggle('selected', !selectAll);
      }
    });
  };

  const handlePageClick = (pageNumber) => {
    setSelectedUserIds([]);
    setMyPages(pageNumber);
  };

  const handleDeleteUser = async () => {
    try {
      console.log(selectedUserIds);
      console.log(userData);

      setShowDeleteConfirmation(true); // Show the delete confirmation modal
    } catch (error) {
      console.error('Error during user deletion:', error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/users?userId=${userData.id}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userIds: selectedUserIds,
        }),
      });

      if (response.status === 200) {
        console.log('Users deleted successfully');
        getDeals(userData.id, myPages);
        setSelectedUserIds([]); // Clear the selectedUserIds after successful deletion
      } else {

        alert('Cannot delete user: \n\nThis user is linked with active deals (Accepted/Created). ');
    }
    } catch (error) {
      console.error('Error during user deletion:', error);
    } finally {
      setShowDeleteConfirmation(false); // Close the delete confirmation modal
    }
  };

  async function getDeals(id, page) {
    let url = `${process.env.REACT_APP_SERVER_URL}/users?userId=${id}&page=${page}`;
    try {
      const response = await fetch(url, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const receivedData = await response.json();

      if (response.status === 200) {
        setUsersData(receivedData.users);
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

  useEffect(() => {
    async function checkUserData() {
      const userDataFromCookies = await getUserDataFromCookies();
      if (!userDataFromCookies) {
        setUserData(userDataFromCookies);
        navigate('/', { replace: true });
      } else {
        getDeals(userDataFromCookies.id, myPages);
      }
    }

    checkUserData();
  }, [navigate, myPages]);

  useEffect(() => {
    console.log(UsersData);
  }, [UsersData]);

  return (
    <>
      <div style={{ marginBottom: '40px', marginTop: '20px', textAlign: 'center' }}>
        {UsersData.length !== 0 ? (
          <>
            <h1 style={{ fontSize: '24px', color: '#333', marginBottom: '20px' }}>Your Claimed Deals</h1>
            <div className="container">
              <h1>Table selection</h1>
              <hr />
              <div className="row">
                <table className="table row-select">
                  <thead>
                    <tr className="head">
                      <th>
                        <div className="checkbox table-checkbox">
                          <label className="block-label selection-button-checkbox">
                            <input
                              type="checkbox"
                              name="all"
                              value="all"
                              id="toggleAll"
                              tabIndex="0"
                              onClick={handleToggleAllClick}
                              checked={selectAll}
                            />
                            ALL
                          </label>
                        </div>
                      </th>
                      <th scope="col">name</th>
                      <th scope="col">phone</th>
                      <th scope="col">email</th>
                      <th scope="col">is_admin</th>
                      <th scope="col">Status</th>
                      <th scope="col">last login </th>
                    </tr>
                  </thead>
                  <tbody>
                    {UsersData.map((user) => (
                      <tr key={user.id} className={selectedUserIds.includes(user.id) ? 'row-selected' : ''}>
                        <td>
                          <div className="checkbox table-checkbox">
                            <label className="block-label selection-button-checkbox">
                              <input
                                type="checkbox"
                                name={`user${user.id}`}
                                value={`user${user.id}`}
                                tabIndex="0"
                                onClick={(e) => handleCheckboxClick(e, user.id)}
                              />
                            </label>
                          </div>
                        </td>
                        <td>{user.name}</td>
                        <td>{user.phone}</td>
                        <td>{user.email}</td>
                        <td>{user && user.is_admin ? 'Yes' : 'No'}</td>
                        <td>{user.status}</td>
                        <td> {new Date(user.last_login_datetime_utc).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Button
                  type="submit"
                  variant="danger"
                  onClick={handleDeleteUser}
                  className="mx-auto"
                  style={{ maxWidth: '200px', width: '100%' }}
                >
                  Delete user
                </Button>
              </div>
              <hr />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {totalPages >= 1 && (
                <PaginationComponent totalPages={totalPages} currentPage={myPages} onPageClick={handlePageClick} />
              )}
            </div>
            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Delete Confirmation</Modal.Title>
              </Modal.Header>
              <Modal.Body>This will delete the selected user(s). Are you sure?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowDeleteConfirmation(false)}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={handleConfirmDelete}>
                  Confirm Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        ) : (
          <h1 style={{ fontSize: '24px', color: '#333', marginTop: '20px' }}>No Claimed Deals Available</h1>
        )}
      </div>
    </>
  );
};

export default UsersGrid;
