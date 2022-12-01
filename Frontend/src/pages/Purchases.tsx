import React from "react";
import "../styles/user-purchases-styles.css";
import {Rating} from '@mui/material'

const Purchases = () => {
  const [value, setValue] = React.useState<number | null>(0);

  return (
    <div className="user-purchases-container">
      <div className="purchases-header-container">
        <h2 style={{ marginBottom: "3rem" }}>Lista zakupionych ofert</h2>
      </div>

      <div className="purchased-list-items-wrap">
        <ul>
          <li>
            <div className="purchased-list-item-img">
              <img src={require("../assets/3x.png")} />
            </div>
            <div className="purchased-list-item-name">
              <div className="purchased-auction-title">
                <h5>Taki piesek o drogi fajny piesek</h5>
              </div>
              <div className="purchased-auction-user">
                Aukcja użytkownika: test@test.pl
              </div>
            </div>
            <div className="purchased-list-item-price">
              <h5>1555 zł</h5>
              <div className="rating-box">
                <p>Oceń aukcję tego użytkownika</p>
                <Rating
                  name="user-rating"
                  value={value}
                  precision={0.5}
                  size="large"
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </div>
            </div>
          </li>
          <li>
            <div className="purchased-list-item-img">
              <img src={require("../assets/3x.png")} />
            </div>
            <div className="purchased-list-item-name">
              <div className="purchased-auction-title">
                <h5>Taki piesek o drogi fajny piesek</h5>
              </div>
              <div className="purchased-auction-user">
                Aukcja użytkownika: test@test.pl
              </div>
            </div>
            <div className="purchased-list-item-price">
              <h5>1555 zł</h5>
              <div className="rating-box">
                <p>Oceń aukcję tego użytkownika</p>
                <Rating
                  name="user-rating"
                  value={value}
                  precision={0.5}
                  size="large"
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Purchases;
