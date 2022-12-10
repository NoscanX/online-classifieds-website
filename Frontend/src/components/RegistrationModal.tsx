import { Form, Button, Modal } from 'react-bootstrap';
import {useState} from "react"

const RegistrationModal = (props:any) => {
  
  const [validatedRegistration, setValidatedRegistration] = useState<boolean>(false);

  const handleRegistrationSubmit = (event:any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidatedRegistration(true);
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
        <Form noValidate validated={validatedRegistration} onSubmit={handleRegistrationSubmit}>
          <Form.Group className="mb-3" controlId="registrationEmailInput">
            <Form.Label>Email</Form.Label>
            <Form.Control required type="email" placeholder="name@example.com" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="registrationPasswordInput">
            <Form.Label>Hasło</Form.Label>
            <Form.Control required type="password" placeholder="Hasło"/>
          </Form.Group>
          {/*<Form.Group className="mb-3" controlId="registrationNameInput">*/}
          {/*  <Form.Label>Imię</Form.Label>*/}
          {/*  <Form.Control required type="text" placeholder="Imię"/>*/}
          {/*</Form.Group>*/}
          {/*<Form.Group className="mb-3" controlId="registrationCityInput">*/}
          {/*  <Form.Label>Miasto</Form.Label>*/}
          {/*  <Form.Control required type="text" placeholder="Miasto"/>*/}
          {/*</Form.Group>*/}
          {/*<Form.Group className="mb-3" controlId="registrationAdressInput">*/}
          {/*  <Form.Label>Adres</Form.Label>*/}
          {/*  <Form.Control required type="text" placeholder="Adres"/>*/}
          {/*</Form.Group>*/}
          <Button type='submit'>Zarejestruj</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Zamknij</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RegistrationModal