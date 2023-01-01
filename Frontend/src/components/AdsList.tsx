import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const imageMapper: any = {
  "C:\\fakepath\\1046021707267325962.png": require("../assets/maluch.png"),
};

const AdsList = () => {
  const [advertisements, setAdvertisements] = useState<any[]>([]);

  useEffect(() => {
    loadAdvertisements();
  }, []);

  const loadAdvertisements = async () => {
    const res = await axios.get(`advertisement/getAllAdvertisements`);
    setAdvertisements(res.data);
    console.log(res);
  };

  return (
    <div className="list-items-wrap">
      <ul>
        {advertisements.length ? (
          advertisements.map((advertisement, index) => (
            <Link key={index} to="/product" rel="noopener noreferrer">
              <li key={index}>
                <div className="ad-list-item-img">
                  <img
                    src={advertisement.image}
                    // src={imageMapper[advertisement.image]}
                    alt={advertisement.image}
                  />
                </div>
                <div className="ad-list-item-name">
                  <div className="auction-title">
                    <h5>{advertisement.name}</h5>
                  </div>
                  <div className="auction-user">
                    Ogłoszenie użytkownika: {advertisement.advertisementerEmail}
                  </div>
                </div>
                <div className="ad-list-item-price">
                  <h5>{advertisement.price} zł</h5>
                </div>
              </li>
            </Link>
          ))
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3
              style={{
                textAlign: "center",
                marginTop: "4rem",
                textDecoration: "underline",
              }}
            >
              Wygląda na to, że nikt jeszcze nie dodał ogłoszenia.
              <div
                style={{
                  marginTop: "3rem",
                }}
              >
                <img src={require("../assets/3x.png")}></img>
              </div>
            </h3>
          </div>
        )}
      </ul>
    </div>
  );
};

export default AdsList;
