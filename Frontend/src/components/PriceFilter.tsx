import { Form, Button } from "react-bootstrap";

const PriceFilter = () => {
  return (
    <>
      <div style={{ width: "40%" }}>
      <h4>Szukaj</h4>
        <Form className="d-flex" style={{ marginRight: "3rem" }}>
          <Form.Control
            type="search"
            placeholder="Szukaj"
            className="me-2"
            aria-label="Search"
          />
          {/* <Button variant="primary">Szukaj</Button> */}
        </Form>
      </div>
      <div>
        <h4>Filtruj</h4>
        <Form.Select aria-label="Default select example">
          <option>Wybierz opcję filtrowania</option>
          <option value="1">Najdroższe</option>
          <option value="2">Najtańsze</option>
        </Form.Select>
      </div>
    </>
  );
};

export default PriceFilter;
