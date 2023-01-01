import { useEffect, useState } from "react";
import "../styles/user-ads-styles.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

const UserAdvertisements = () => {
  const [userAdvertisements, setUserAdvertisements] = useState<any[]>([]);

  useEffect(() => {
    loadUserAdvertisements();
  }, []);

  const loadUserAdvertisements = async () => {
    const res = await axios.get(
      `advertisement/getAllAdvertisementsByUserId/me`
    );
    setUserAdvertisements(res.data);
    console.log(res);
  };

  return (
    <div className="user-ads-container">
      <div className="user-ads-header-container">
        <h2>Twoje ogłoszenia</h2>
        <hr style={{ marginBottom: "3rem" }}></hr>
      </div>
      <div className="user-ads-list-items-wrap">
        <ul>
          {userAdvertisements.length ? (
            userAdvertisements.map((userAdvertisement, index) => (
              <li key={index}>
                <div className="user-ads-list-item-img">
                  <img src={userAdvertisement.image} />
                </div>
                <div className="user-ads-list-item-name">
                  <div className="user-ads-auction-title">
                    <h5>{userAdvertisement.name}</h5>
                  </div>
                  <div className="user-ads-auction-user">
                    Ogłoszenie użytkownika:{" "}
                    {userAdvertisement.advertisementerEmail}
                  </div>
                </div>
                <div className="user-ads-list-item-price">
                  <h5>{userAdvertisement.price} zł</h5>
                  <div className="delete-box">
                    <DeleteIcon
                      style={{
                        fontSize: "2rem",
                      }}
                      className="icon"
                    />
                    <EditIcon
                      style={{
                        fontSize: "2rem",
                      }}
                      className="icon"
                    />
                  </div>
                </div>
              </li>
            ))
          ) : (
            <h3
              style={{
                textAlign: "center",
                marginTop: "4rem",
                textDecoration: "underline",
              }}
            >
              Nie dodałeś jeszcze żadnych ogłoszeń.
            </h3>
          )}
          {/*<li>*/}
          {/*  <div className="user-ads-list-item-img">*/}
          {/*    <img src={require("../assets/3x.png")} />*/}
          {/*  </div>*/}
          {/*  <div className="user-ads-list-item-name">*/}
          {/*    <div className="user-ads-auction-title">*/}
          {/*      <h5>Taki piesek o drogi fajny piesek</h5>*/}
          {/*    </div>*/}
          {/*    <div className="user-ads-auction-user">*/}
          {/*      Aukcja użytkownika: test@test.pl*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*  <div className="user-ads-list-item-price">*/}
          {/*    <h5>1555 zł</h5>*/}
          {/*    <div className="delete-box">*/}
          {/*      <p>Usuń ofertę</p>*/}
          {/*      <DeleteIcon*/}
          {/*        style={{*/}
          {/*          fontSize: "2rem",*/}
          {/*        }}*/}
          {/*        className="icon"*/}
          {/*      />*/}
          {/*      <EditIcon*/}
          {/*        style={{*/}
          {/*          fontSize: "2rem",*/}
          {/*        }}*/}
          {/*        className="icon"*/}
          {/*      />*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</li>*/}
        </ul>
      </div>
    </div>
  );
};

export default UserAdvertisements;
