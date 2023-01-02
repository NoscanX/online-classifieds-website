import { Form, Button } from "react-bootstrap";
import { Dispatch, SetStateAction } from "react";

interface Props {
  handleSearch: Dispatch<SetStateAction<string>>;
}

const PriceFilter = ({ handleSearch }: Props) => {
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
            onChange={(e) => handleSearch(e.target.value)}
          />
          {/* <Button variant="primary">Szukaj</Button> */}
        </Form>
      </div>
      <div style={{ width: "20%" }}>
        <h4>Filtruj</h4>
        <Form.Select aria-label="Default select example" defaultValue={0}>
          <option value="0">Brak filtrowania</option>
          <option value="1">Najdroższe</option>
          <option value="2">Najtańsze</option>
          <option value="3">Najnowsze</option>
          <option value="4">Najstarsze</option>
        </Form.Select>
      </div>
    </>
  );
};

export default PriceFilter;
