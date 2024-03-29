import { Button, Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { RegistrationTypes, USER_ROLE } from "../types/AuthorizationTypes";
import RegisterService from "../services/RegisterService";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";

const initialRegisterValues = {
  email: "",
  password: "",
  name: "",
};

const RegistrationModal = (props: any) => {
  const [validatedRegistration, setValidatedRegistration] =
    useState<boolean>(false);
  const [registerValues, setRegisterValues] = useState<RegistrationTypes>(
    initialRegisterValues
  );
  const [users, setUsers] = useState<any[]>([]);
  const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(true);

  const loadUsers = async () => {
    const res = await axios.get(`/user/getAllUsers`);
    setUsers(res.data);
    console.log(res);
  };

  let userEmails = users.map((userEmail) => userEmail.email);

  const handleRegistrationSubmit = async (event: any) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (userEmails.includes(registerValues.email)) {
      // toast.error("Ten email jest zajęty.");
      setValidatedRegistration(true);
    }
    if (form.checkValidity() === false) {
      // users.forEach((user) => {
      //   if (user.email === registerValues.email) {
      //     console.log("Emaile" + user.email);
      //     console.log("Email rejestracji" + registerValues.email);
      //     form.checkValidity(true);
      //     toast.error("Ten email jest zajęty.");
      //     console.log("zajente");
      //     console.log("Check " + form.checkValidity());
      //   }
      // });
      event.preventDefault();
      event.stopPropagation();
      setValidatedRegistration(true);
      toast.error("Błędy w formularzu!");
      return;
    }

    try {
      console.log(registerValues);
      await RegisterService.saveUser(registerValues);
      setRegisterValues(initialRegisterValues);

      toast.success("Rejestracja pomyślna!");
    } catch (e) {
      console.log(e);
      toast.error("Podany email istnieje w bazie!");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Rejestracja
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          noValidate
          validated={validatedRegistration}
          onSubmit={handleRegistrationSubmit}
          onError={() => {
            console.log("onError");
          }}
          onErrorCapture={() => {
            console.log("onErrorCapture");
          }}
        >
          <Form.Group className="mb-3" controlId="registrationEmailInput">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              isInvalid={userEmails.includes(registerValues.email)}
              placeholder="name@example.com"
              value={registerValues.email}
              onChange={(e) => {
                setRegisterValues((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }));
              }}
            />
            <Form.Control.Feedback type="invalid">
              Ten email jest zajęty!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="registrationPasswordInput">
            <Form.Label>Hasło</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Hasło"
              value={registerValues.password}
              onChange={(e) => {
                setRegisterValues((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }));
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="registrationNameInput">
            <Form.Label>Imię i Nazwisko</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Imię i Nazwisko"
              value={registerValues.name}
              onChange={(e) => {
                setRegisterValues((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }));
              }}
            />
          </Form.Group>
          {/*<Form.Group className="mb-3" controlId="registrationCityInput">*/}
          {/*  <Form.Label>Miasto</Form.Label>*/}
          {/*  <Form.Control required type="text" placeholder="Miasto"/>*/}
          {/*</Form.Group>*/}
          {/*<Form.Group className="mb-3" controlId="registrationAdressInput">*/}
          {/*  <Form.Label>Adres</Form.Label>*/}
          {/*  <Form.Control required type="text" placeholder="Adres"/>*/}
          {/*</Form.Group>*/}
          {/*<Button onClick={handleRegistrationSubmit}>Zarejestruj</Button>*/}
          <Button type="submit">Zarejestruj</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Zamknij</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegistrationModal;
