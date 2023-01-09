import { Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { RegistrationTypes, USER_ROLE } from "../types/AuthorizationTypes";
import RegisterService from "../services/RegisterService";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

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

  const handleRegistrationSubmit = async (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
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
      toast.error("Ten email jest zajęty!");
    }
  };

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
        >
          <Form.Group className="mb-3" controlId="registrationEmailInput">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="name@example.com"
              value={registerValues.email}
              onChange={(e) => {
                setRegisterValues((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }));
              }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
            <Form.Label>Imię</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Imię"
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
