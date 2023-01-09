import { Form, Button } from "react-bootstrap";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface Props {
  handleSearch: Dispatch<SetStateAction<string>>;
  filterBy: Dispatch<SetStateAction<string>>;
}

const PriceFilter = ({ handleSearch, filterBy }: Props) => {
  const handleFilterBy = (e: ChangeEvent<HTMLSelectElement>) => {
    let selectedValue = e.currentTarget.value;
    filterBy(selectedValue);
  };

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
        <Form.Select
          aria-label="Default select example"
          defaultValue="none"
          onChange={handleFilterBy}
        >
          <option value="none">Brak filtrowania</option>
          <option value="priceDesc">Najdroższe</option>
          <option value="priceAsc">Najtańsze</option>
          <option value="dateDesc">Najnowsze</option>
          <option value="dateAsc">Najstarsze</option>
        </Form.Select>
      </div>
    </>
  );
};

export default PriceFilter;
