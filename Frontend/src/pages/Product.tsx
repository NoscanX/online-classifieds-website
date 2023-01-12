import React, { useEffect, useState } from "react";
import "../styles/product-styles.css";
import { Button, NavDropdown } from "react-bootstrap";
import BuyNowModal from "../components/BuyNowModal";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-toastify";
import { Rating } from "@mui/material";

const Product = () => {
  const [modalBuyNowShow, setBuyNowModalShow] = useState<boolean>(false);
  const { advertisementId } = useParams();
  const navigate = useNavigate();
  const [advertisement, setAdvertisement] = useState<any[]>([]);

  const [user, setUser] = useState<any>();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const resUserMe = await axios.get(`/user/product/me`);
    setUser(resUserMe.data);
    console.log(resUserMe);
  };

  const deleteAdv = () => {
    axios
      .delete(`/advertisement/product/delete/${advertisementId}`)
      .then((res) => {
        toast.success("Usunięto");
      });
    setTimeout(() => navigate("/", { replace: true }), 20);
  };

  // useEffect(() => {
  //   loadAdvertisement();S
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
      console.log(object);
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

  if (!user) {
    return (
      <>
        <div className="main-product-container">
          <div className="carousel-user-content">
            <div className="img-holder">
              <img src={object.image} />
            </div>
            <div className="user-card">
              <div className="auction-user-details">
                <h5>Email ogłoszeniodawcy: {object.advertisementerEmail}</h5>
                <h5>Średnia ocena ogłoszeniodawcy:</h5>
                <Rating
                  name="user-rating"
                  value={object.advertisementerRating}
                  precision={0.5}
                  size="large"
                  readOnly
                />
                <h5>Data dodania ogłoszenia: {object.data}</h5>
              </div>
              <div>
                <h4 style={{ color: "#dc3545" }}>
                  Musisz być zalogowany, aby dokonać zakupu.
                </h4>
              </div>
            </div>
          </div>
          <div className="product-description-content">
            <h2>{object.name}</h2>
            <h2 style={{ fontWeight: "bold" }}>{object.price} zł</h2>
            <h5 style={{ fontWeight: "bold" }}>Opis</h5>
            <h5>{object.description}</h5>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="main-product-container">
      {user.userRole === "ADMIN" && (
        <div className="delete-admin-btn">
          <Button variant="danger" onClick={deleteAdv}>
            Usuń ogłoszenie
          </Button>
          <h2 style={{ marginBottom: "2rem" }}></h2>
        </div>
      )}
      <div className="carousel-user-content">
        <div className="img-holder">
          <img src={object.image} />
        </div>
        <div className="user-card">
          <div className="auction-user-details">
            <h5>Email ogłoszeniodawcy: {object.advertisementerEmail}</h5>
            <h5>Średnia ocena ogłoszeniodawcy:</h5>
            <Rating
              name="user-rating"
              value={object.advertisementerRating}
              precision={0.5}
              size="large"
              readOnly
            />
            <h5>Data dodania ogłoszenia: {object.data}</h5>
          </div>
          <div>
            {user.id !== object.userId && (
              <Button onClick={() => setBuyNowModalShow(true)}>
                Kup teraz
              </Button>
            )}
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
