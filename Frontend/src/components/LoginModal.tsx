import { Form, Button, Modal } from 'react-bootstrap';
import {useState} from "react"

const LoginModal = (props:any) => {
  const [validatedLogin, setValidatedLogin] = useState<boolean>(false);

  const handleLoginSubmit = (event:any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidatedLogin(true);
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
          Logowanie
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validatedLogin} onSubmit={handleLoginSubmit}>
          <Form.Group className="mb-3" controlId="loginEmailInput">
            <Form.Label>Email</Form.Label>
            <Form.Control required type="email" placeholder="name@example.com" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="loginPasswordInput">
            <Form.Label>Hasło</Form.Label>
            <Form.Control required type="password" placeholder="Hasło"/>
          </Form.Group>
          <Button type='submit'>Zaloguj</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Zamknij</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LoginModal