import DevicesIcon from "@mui/icons-material/Devices";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import { Button, OverlayTrigger, Popover } from "react-bootstrap/";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <>
      <div className="header-wrapper">
        <h2>Kategorie</h2>
        <hr></hr>
      </div>
      <div className="bs-categories-wrapper">
        <OverlayTrigger
          rootClose
          trigger="click"
          placement="bottom"
          overlay={
            <Popover
              id={`popover-positioned-bottom`}
              className="category-popover"
            >
              <Popover.Header as="h3">{`Podkategorie`}</Popover.Header>
              <Popover.Body
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Link to="/">Karty graficzne</Link>
                <Link to="/">Telefony</Link>
              </Popover.Body>
            </Popover>
          }
        >
          <Button variant="primary" style={{ height: "60px", width: "110px" }}>
            <div
              className="cat-btn-wrap"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <DevicesIcon />
              Elektronika
            </div>
          </Button>
        </OverlayTrigger>

        <OverlayTrigger
          rootClose
          trigger="click"
          placement="bottom"
          overlay={
            <Popover
              id={`popover-positioned-bottom`}
              className="category-popover"
            >
              <Popover.Header as="h3">{`Podkategorie`}</Popover.Header>
              <Popover.Body
                style={{ display: "flex", flexDirection: "column" }}
              >
                <a href="/123">Samochody</a>
                <a href="/124">Motocykle</a>
              </Popover.Body>
            </Popover>
          }
        >
          <Button variant="primary" style={{ height: "60px", width: "110px" }}>
            <div
              className="cat-btn-wrap"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <DirectionsCarIcon />
              Motoryzacja
            </div>
          </Button>
        </OverlayTrigger>

        <OverlayTrigger
          rootClose
          trigger="click"
          placement="bottom"
          overlay={
            <Popover
              id={`popover-positioned-bottom`}
              className="category-popover"
            >
              <Popover.Header as="h3">{`Podkategorie`}</Popover.Header>
              <Popover.Body
                style={{ display: "flex", flexDirection: "column" }}
              >
                <a href="/123">Siłownia</a>
                <a href="/124">Tenis stołowy</a>
              </Popover.Body>
            </Popover>
          }
        >
          <Button variant="primary" style={{ height: "60px", width: "110px" }}>
            <div
              className="cat-btn-wrap"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <SportsTennisIcon />
              Sport
            </div>
          </Button>
        </OverlayTrigger>
      </div>
      <hr></hr>
    </>
  );
};

export default Categories;
