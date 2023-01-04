import { useEffect, useState } from "react";
import "../styles/admin-styles.css";
import axios from "axios";
import { Button, Form, NavDropdown } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import { Simulate } from "react-dom/test-utils";
import change = Simulate.change;
import { toast } from "react-toastify";

const AdminPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [trigger, setTrigger] = useState<boolean>();
  const [searchUserEmail, setSearchUserEmail] = useState<string>("");

  const handleSearch = (event: any) => {
    setSearchUserEmail(event.target.value);
  };

  const filteredItems = users.filter((user) =>
    user.email.toLowerCase().includes(searchUserEmail.toLowerCase())
  );

  useEffect(() => {
    loadUsers();
  }, [trigger]);

  const loadUsers = async () => {
    const res = await axios.get(`/user/getAllUsers`);
    setUsers(res.data);
    console.log(res);
  };

  const changeRole = (e: any) => {
    const id = e.currentTarget.dataset.id;
    axios.put(`/user/admin_panel/updateUserRole/${id}`).then((res) => {
      toast.success("Zmiana roli pomyślna");
      setTrigger(!trigger);
    });
  };

  const changeAccountStatus = (e: any) => {
    const id = e.currentTarget.dataset.id;
    axios.put(`/user/admin_panel/banUnbanUser/${id}`).then((res) => {
      toast.success("Zmiana aktywności konta pomyślna");
      setTrigger(!trigger);
    });
  };

  return (
    <div className="main-admin-container">
      <div className="admin-header-container">
        <h2>Lista użytkowników</h2>
        <hr style={{ marginBottom: "3rem" }}></hr>
      </div>
      <div className="users-list-items-wrap">
        <div>
          <Form
            className="d-flex"
            style={{ width: "40%", marginBottom: "4rem" }}
          >
            <Form.Control
              type="search"
              placeholder="Szukaj"
              className="me-2"
              aria-label="Search"
              onChange={handleSearch}
            />
            {/* <Button variant="primary">Szukaj</Button> */}
          </Form>
        </div>
        <ul>
          <li className="label-li">
            <div className="user-info">
              <div style={{ marginRight: "2rem" }}>Lp.</div>
              <div className="info">Email:</div>
              <div className="info">Imię:</div>
              <div className="info">Rola:</div>
              <div className="info">Konto aktywne?</div>
            </div>
            <div className="buttons">
              {/*<Button variant="primary">Nadaj rolę: USER/ADMIN</Button>*/}
              {/*<Button variant="primary">Zablokuj/odblokuj</Button>*/}
            </div>
          </li>
        </ul>
        <ul>
          {users.length ? (
            filteredItems.map((user, index) => (
              <li key={index}>
                <div className="user-info">
                  <div style={{ marginRight: "2rem" }}>{index + 1}</div>
                  <div className="info">
                    <strong>{user.email}</strong>
                  </div>
                  <div className="info">
                    <strong>{user.name}</strong>
                  </div>
                  <div className="info">
                    <strong>{user.userRole}</strong>
                  </div>
                  <div className="info">
                    <strong>
                      {user.isNonLocked === true && "Tak"}
                      {user.isNonLocked === false && "Zablokowane"}
                    </strong>
                  </div>
                </div>
                <div className="buttons">
                  <Button
                    variant="primary"
                    data-id={user.id}
                    onClick={changeRole}
                  >
                    Nadaj rolę:
                    {user.userRole === "USER" && " ADMIN"}
                    {user.userRole !== "USER" && " USER"}
                  </Button>
                  <Button
                    variant="primary"
                    data-id={user.id}
                    onClick={changeAccountStatus}
                  >
                    {user.isNonLocked === true && "Zablokuj"}
                    {user.isNonLocked === false && "Odblokuj"}
                  </Button>
                </div>
              </li>
            ))
          ) : (
            <div className="loading">
              <h2>Loading...</h2>
              <Spinner animation="border" variant="primary" />
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};
export default AdminPage;
