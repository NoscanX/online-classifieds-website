import React from "react";
import "../styles/user-ads-styles.css"
import DeleteIcon from '@mui/icons-material/Delete';

const UserAdvertisements = () => {
  return (
    <div className="user-ads-container">
      <div className="user-ads-header-container">
        <h2 style={{ marginBottom: "3rem" }}>Twoje ogłoszenia</h2>
      </div>
      <div className="user-ads-list-items-wrap">
        <ul>
          <li>
            <div className="user-ads-list-item-img">
              <img src={require("../assets/3x.png")} />
            </div>
            <div className="user-ads-list-item-name">
              <div className="user-ads-auction-title">
                <h5>Taki piesek o drogi fajny piesek</h5>
              </div>
              <div className="user-ads-auction-user">
                Aukcja użytkownika: test@test.pl
              </div>
            </div>
            <div className="user-ads-list-item-price">
              <h5>1555 zł</h5>
              <div className="delete-box">
                <p>Usuń ofertę</p>
                <DeleteIcon
                  style={{
                    fontSize: "2rem",
                  }}
                  className='trash-icon'
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserAdvertisements;
