import { Form, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import { LoginTypes } from "../types/AuthorizationTypes";
import { useNavigate } from "react-router-dom";

const initialLoginValues = {
  email: "",
  password: "",
};

const LoginModal = (props: any) => {
  const navigate = useNavigate();
  const [validatedLogin, setValidatedLogin] = useState<boolean>(false);
  const [loginValues, setLoginValues] =
    useState<LoginTypes>(initialLoginValues);

  const handleLoginSubmit = async (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidatedLogin(true);
      // window.location.reload();
      toast.error("Błędy w formularzu!");
      return;
    }
    toast.success("Logowanie git");
    setTimeout(() => navigate("/", { replace: true }), 5000);
    console.log("Logowanie git");
  };

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Logowanie</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          noValidate
          validated={validatedLogin}
          onSubmit={handleLoginSubmit}
          action="http://localhost:8080/login"
          method="post"
        >
          <Form.Group className="mb-3" controlId="loginEmailInput">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              name="username"
              placeholder="name@example.com"
              value={loginValues.email}
              onChange={(e) => {
                setLoginValues((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }));
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="loginPasswordInput">
            <Form.Label>Hasło</Form.Label>
            <Form.Control
              required
              type="password"
              name="password"
              placeholder="Hasło"
              value={loginValues.password}
              onChange={(e) => {
                setLoginValues((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }));
              }}
            />
          </Form.Group>
          <Button type="submit">Zaloguj</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Zamknij</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
