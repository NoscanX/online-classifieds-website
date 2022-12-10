import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../styles/add-ad-styles.css";

const AddAdvertising = () => {
  const [currentValue, setCurrentValue] = useState(undefined);

  const checkValue = (event: any) => {
    setCurrentValue(handleDecimalsOnValue(event.target.value));
  };

  const handleDecimalsOnValue = (value: any) => {
    const regex = /([0-9]*[\.|\,]{0,1}[0-9]{0,2})/s;
    return value.match(regex)[0];
  };

  const [validatedAddAd, setValidatedAddAd] = useState<boolean>(false);

  const handleAddAdSubmit = (event:any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidatedAddAd(true);
  };

  return (
    <div className="add-advertising-form-container">
      <Form noValidate validated={validatedAddAd} onSubmit={handleAddAdSubmit} style={{ width: "60%", padding: "2rem 3rem" }}>
        <h2 style={{ marginBottom: "3rem" }}>Dodaj swoje ogłoszenie</h2>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Nazwa ogłoszenia</Form.Label>
          <Form.Control required type="text" placeholder="Nazwa" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Opis ogłoszenia</Form.Label>
          <Form.Control required as="textarea" rows={4} placeholder="Opis" />
        </Form.Group>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "1.4rem",
          }}
        >
          <Form.Select
            aria-label="Default select example"
            required
            style={{ width: "45%" }}
          >
            <option selected disabled>Wybierz kategorię</option>
            <option value="1">Elektronika</option>
            <option value="2">Motoryzacja</option>
            <option value="3">Sport</option>
          </Form.Select>
          <Form.Select
            aria-label="Default select example 2"
            required
            style={{ width: "45%" }}
          >
            <option selected disabled>Wybierz podkategorię</option>
            <option value="1">Karty graficzne</option>
            <option value="2">Telefony</option>
            <option value="3">Samochody</option>
            <option value="4">Motocykle</option>
            <option value="5">Siłownia</option>
            <option value="6">Tenis stołowy</option>
          </Form.Select>
        </div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Cena</Form.Label>
          <Form.Control
            type="number"
            placeholder="Cena"
            value={currentValue}
            onChange={(event) => checkValue(event)}
            step=".01"
            required
          />
        </Form.Group>
        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Prześlij zdjęcie do ogłoszenia</Form.Label>
          <Form.Control required accept=".png,.jpg,.jpeg" type="file"/>
        </Form.Group>
        <Button type="submit">Wystaw ofertę</Button>
      </Form>
    </div>
  );
};

export default AddAdvertising;
