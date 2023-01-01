import React, { useState } from "react";
import "../styles/product-styles.css";
import { Button } from "react-bootstrap";
import LoginModal from "../components/LoginModal";
import BuyNowModal from "../components/BuyNowModal";

const Product = () => {
  const [modalBuyNowShow, setBuyNowModalShow] = useState<boolean>(false);

  return (
    <div className="main-product-container">
      <div>
        <h2 style={{ marginBottom: "2rem" }}></h2>
      </div>
      <div className="carousel-user-content">
        <div className="img-holder">
          <img src={require("../assets/maluch.png")} />
        </div>
        <div className="user-card">
          <div className="auction-user-details">
            <h5>Ogłoszenie użytkownika: test@test.pl</h5>
            <h5>Ocena użytkownika: </h5>
          </div>
          <div>
            <Button onClick={() => setBuyNowModalShow(true)}>Kup teraz</Button>
          </div>
        </div>
      </div>
      <div className="product-description-content">
        <h2>Nazwa ogłoszenia</h2>
        <h2 style={{ fontWeight: "bold" }}>Cena</h2>
        <h5 style={{ fontWeight: "bold" }}>Opis</h5>
        <h5>Opis ogłoszenia lorem lorem lorem lorem lorem lorem lorem </h5>
      </div>
      <BuyNowModal
        show={modalBuyNowShow}
        onHide={() => setBuyNowModalShow(false)}
      />
    </div>
  );
};

export default Product;
