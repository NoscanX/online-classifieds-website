import {
  NavDropdown,
  Navbar,
  Nav,
  Form,
  Container,
  Button,
} from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import RegistrationModal from "./RegistrationModal";
import axios from "axios";
import { toast } from "react-toastify";
import { USER_ROLE } from "../types/AuthorizationTypes";
import HelpIcon from "@mui/icons-material/Help";

const NavbarFunc = () => {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const resUserMe = await axios.get(`user/me`);
    setUser(resUserMe.data);
    console.log(resUserMe);
  };

  const LoginRegisterNav = () => {
    const [modalLoginShow, setLoginModalShow] = useState<boolean>(false);
    const [modalRegistrationShow, setRegistrationModalShow] =
      useState<boolean>(false);
    return (
      <>
        {user ? (
          <>
            <p
              style={{ marginRight: "1rem", marginBottom: "0", padding: "0" }}
              className="icon-wrap"
            >
              Zalogowano jako:&nbsp; <strong>{user.email}</strong>
            </p>
            <div className="icon-wrap">
              <AddIcon />
            </div>
            <Nav.Link as={Link} to="/add_advertising">
              Dodaj ogłoszenie
            </Nav.Link>
            {/* <Nav.Link href="#action2">Link</Nav.Link> */}
            <div className="icon-wrap">
              <AccountCircleIcon />
            </div>
            <NavDropdown
              title="Twój profil"
              id={`offcanvasNavbarDropdown-expand`}
            >
              <NavDropdown.Item as={Link} to="/user_ads">
                Twoje ogłoszenia
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/user_purchases">
                Kupione
              </NavDropdown.Item>
              {user.userRole === "ADMIN" && (
                <NavDropdown.Item as={Link} to="/admin_panel">
                  Panel admina
                </NavDropdown.Item>
              )}
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => {
                  window.location.href = "http://localhost:8080/logout";
                  toast.success("Zostałeś wylogowany.");
                }}
              >
                Wyloguj
              </NavDropdown.Item>
            </NavDropdown>
          </>
        ) : (
          <>
            <Nav.Link onClick={() => setRegistrationModalShow(true)}>
              Zarejestruj
            </Nav.Link>
            <RegistrationModal
              show={modalRegistrationShow}
              onHide={() => setRegistrationModalShow(false)}
            />
            <Nav.Link onClick={() => setLoginModalShow(true)}>Zaloguj</Nav.Link>
            <LoginModal
              show={modalLoginShow}
              onHide={() => setLoginModalShow(false)}
            />
          </>
        )}
        <div className="icon-wrap">
          <HelpIcon />{" "}
          <Nav.Link as={Link} to="/articles">
            Regulamin
          </Nav.Link>
        </div>
      </>
    );
  };

  return (
    <>
      <Navbar
        key="lg"
        // bg="light"
        expand="lg"
        className=""
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "hsl(210, 6%, 85%)",
        }}
      >
        <Container fluid style={{ width: "68%" }}>
          <Navbar.Brand
            as={Link}
            to="/"
            style={{ fontSize: "2rem", fontWeight: "bold" }}
          >
            OCW
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <LoginRegisterNav />
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarFunc;
