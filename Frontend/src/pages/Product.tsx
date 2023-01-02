import React, { useEffect, useState } from "react";
import "../styles/product-styles.css";
import { Button } from "react-bootstrap";
import BuyNowModal from "../components/BuyNowModal";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

const Product = () => {
  const [modalBuyNowShow, setBuyNowModalShow] = useState<boolean>(false);
  const { advertisementId } = useParams();

  const [advertisement, setAdvertisement] = useState<any[]>([]);

  // useEffect(() => {
  //   loadAdvertisement();
  // }, []);
  //
  // const loadAdvertisement = async () => {
  //   const res = await axios.get(
  //     `/advertisement/product/getAdvertisement/${advertisementId}`
  //   );
  //   setAdvertisement(res.data);
  //   if (!res) {
  //     return <div>Loading...</div>;
  //   }
  //   console.log(res);
  // };

  async function fetchObject() {
    try {
      const response = await axios.get(
        `/advertisement/product/getAdvertisement/${advertisementId}`
      );
      const object = response.data;
      return object;
    } catch (error) {
      console.error(error);
    }
  }

  const [object, setObject] = useState<any>();

  useEffect(() => {
    async function getObject() {
      const object = await fetchObject();
      setObject(object);
    }
    getObject();
  }, []);

  if (!object) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="main-product-container">
      <div>
        <h2 style={{ marginBottom: "2rem" }}></h2>
      </div>
      <div className="carousel-user-content">
        <div className="img-holder">
          <img src={object.image} />
        </div>
        <div className="user-card">
          <div className="auction-user-details">
            <h5>Ogłoszenie użytkownika: {object.advertisementerEmail}</h5>
            <h5>Ocena użytkownika: {object.rate}</h5>
            <h5>Data dodania ogłoszenia: {object.data}</h5>
          </div>
          <div>
            <Button onClick={() => setBuyNowModalShow(true)}>Kup teraz</Button>
          </div>
        </div>
      </div>
      <div className="product-description-content">
        <h2>{object.name}</h2>
        <h2 style={{ fontWeight: "bold" }}>{object.price} zł</h2>
        <h5 style={{ fontWeight: "bold" }}>Opis</h5>
        <h5>{object.description}</h5>
      </div>
      <BuyNowModal
        show={modalBuyNowShow}
        onHide={() => setBuyNowModalShow(false)}
      />
    </div>
  );
};

export default Product;
