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

const NavbarFunc = () => {
  const isLoggedIn: boolean = true;
  const isAdmin: boolean = true;

  // useEffect(() => {
  //   getUser();
  // }, []);
  //
  // const getUser = async () => {
  //   const resUserMe = await axios.get(`user/me`);
  //   console.log(resUserMe);
  // };

  const LoginRegisterNav = () => {
    const [modalLoginShow, setLoginModalShow] = useState<boolean>(false);
    const [modalRegistrationShow, setRegistrationModalShow] =
      useState<boolean>(false);
    return (
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
    );
  };

  const LoggedUserNav = () => {
    return (
      <>
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
        <NavDropdown title="Twój profil" id={`offcanvasNavbarDropdown-expand`}>
          <NavDropdown.Item as={Link} to="/user_ads">
            Twoje ogłoszenia
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/user_purchases">
            Kupione
          </NavDropdown.Item>
          {isAdmin && (
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
    );
  };

  const NavInject = () => {
    if (isLoggedIn) {
      return (
        <>
          <LoginRegisterNav />
          <LoggedUserNav />
        </>
      );
    } else {
      return <LoginRegisterNav />;
    }
  };

  const NavAdminPanelOptionInject = () => {
    if (isAdmin) {
      return;
    } else {
      return null;
    }
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
                <NavInject />
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarFunc;
