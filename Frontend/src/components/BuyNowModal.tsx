import { Form, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";

const BuyNowModal = (props: any) => {
  const [validatedAddress, setValidatedAddress] = useState<boolean>(false);

  const handleBuyNowSubmit = async (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidatedAddress(true);
      toast.error("Błędy w formularzu!");
      return;
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
          Wprowadź dane dostawy
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          noValidate
          validated={validatedAddress}
          onSubmit={handleBuyNowSubmit}
        >
          <Form.Group className="mb-3" controlId="cityInput">
            <Form.Label>Miasto</Form.Label>
            <Form.Control required type="text" placeholder="" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="addressInput">
            <Form.Label>Adres</Form.Label>
            <Form.Control required type="text" placeholder="" />
          </Form.Group>
          <Button type="submit">Potwierdź zakup</Button>
        </Form>
        <div>
          <p
            style={{
              marginTop: "1rem",
              marginBottom: "0",
              fontSize: ".8rem",
              color: "red",
              fontWeight: "bold",
            }}
          >
            UWAGA!
          </p>
          <p style={{ fontSize: ".8rem", color: "red" }}>
            Obsługujemy tylko płatność za pobraniem.
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer style={{ flexDirection: "column" }}>
        <Button onClick={props.onHide}>Zamknij</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BuyNowModal;
