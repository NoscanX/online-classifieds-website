import React from "react";
import { Link } from "react-router-dom";

const AdsList = () => {
  return (
    <div className="list-items-wrap">
      <ul>
        <Link to="/product" rel="noopener noreferrer">
          <li>
            <div className="ad-list-item-img">
              <img src={require("../assets/3x.png")} />
            </div>
            <div className="ad-list-item-name">
              <div className="auction-title">
                <h5>Taki piesek o drogi fajny piesek</h5>
              </div>
              <div className="auction-user">
                Aukcja użytkownika: test@test.pl
              </div>
            </div>
            <div className="ad-list-item-price">
              <h5>1555 zł</h5>
            </div>
          </li>
        </Link>
        <a href="/" rel="noopener noreferrer">
          <li>
            <div className="ad-list-item-img">
              <img src={require("../assets/maluch.png")} />
            </div>
            <div className="ad-list-item-name">
              <div className="auction-title">
                <h5>Taki malczan o drogi tez fajny malczan malczan</h5>
              </div>
              <div className="auction-user">
                Aukcja użytkownika: test2@test.pl
              </div>
            </div>
            <div className="ad-list-item-price">
              <h5>1999 zł</h5>
            </div>
          </li>
        </a>
        <a href="/" rel="noopener noreferrer">
          <li>
            <div className="ad-list-item-img">
              <img src={require("../assets/3x.png")} />
            </div>
            <div className="ad-list-item-name">
              <div className="auction-title">
                <h5>Taki piesek o drogi fajny piesek</h5>
              </div>
              <div className="auction-user">
                Aukcja użytkownika: test@test.pl
              </div>
            </div>
            <div className="ad-list-item-price">
              <h5>1555 zł</h5>
            </div>
          </li>
        </a>
        <a href="/" rel="noopener noreferrer">
          <li>
            <div className="ad-list-item-img">
              <img src={require("../assets/maluch.png")} />
            </div>
            <div className="ad-list-item-name">
              <div className="auction-title">
                <h5>Taki malczan o drogi tez fajny malczan malczan</h5>
              </div>
              <div className="auction-user">
                Aukcja użytkownika: test2@test.pl
              </div>
            </div>
            <div className="ad-list-item-price">
              <h5>1999 zł</h5>
            </div>
          </li>
        </a>
      </ul>
    </div>
  );
};

export default AdsList;
