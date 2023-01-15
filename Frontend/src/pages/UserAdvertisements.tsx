import { useEffect, useState } from "react";
import "../styles/user-ads-styles.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { Rating } from "@mui/material";
import { toast } from "react-toastify";
import AdsEditModal from "../components/AdsEditModal";
import { Link } from "react-router-dom";

const UserAdvertisements = () => {
  const [userAdvertisements, setUserAdvertisements] = useState<any[]>([]);
  const [trigger, setTrigger] = useState<boolean>();
  const [modalEditShow, setEditModalShow] = useState<boolean>(false);

  useEffect(() => {
    loadUserAdvertisements();
  }, [trigger]);

  const loadUserAdvertisements = async () => {
    const res = await axios.get(
      `advertisement/getAllAdvertisementsByUserId/me`
    );
    setUserAdvertisements(res.data);
    console.log(res);
  };

  const [userSoldAds, setUserSoldAds] = useState<any[]>([]);

  useEffect(() => {
    loadUserSoldAds();
  }, [trigger]);

  const loadUserSoldAds = async () => {
    const res = await axios.get(
      `purchase/getAllPurchasesByAdvertisementerId/me`
    );
    setUserSoldAds(res.data);
    console.log(res);
  };

  const isAdActiveFilter = userAdvertisements.filter(
    (advertisements) => advertisements.isAdvertisementActive
  );

  const deleteAdv = (e: any) => {
    const id = e.currentTarget.dataset.id;
    axios.delete(`/advertisement/user_ads/delete/${id}`).then((res) => {
      toast.success("Usunięto!");
      setTrigger(!trigger);
    });
  };

  const parseDate = (dateToParse: string) => {
    let dateTime = dateToParse.split(" ")[1];
    let date = dateToParse.split(" ")[0];
    let dateDay = date.split(".")[0];
    let dateMonth = date.split(".")[1];
    let dateYear = date.split(".")[2];
    return new Date(
      `${dateYear}-${dateMonth}-${dateDay}T${dateTime}`
    ).getTime();
  };

  return (
    <div className="user-ads-container">
      <div className="user-ads-header-container">
        <h2>Twoje ogłoszenia</h2>
        <hr></hr>
      </div>
      <div className="user-ads-list-items-wrap">
        <ul>
          {isAdActiveFilter.length ? (
            isAdActiveFilter
              .sort((a, b) => parseDate(b.data) - parseDate(a.data))
              .map((userAdvertisement, index) => (
                <li key={index}>
                  {/*<AdsEditModal*/}
                  {/*  show={modalEditShow}*/}
                  {/*  onHide={() => setEditModalShow(false)}*/}
                  {/*  useradvertisement={userAdvertisement.id}*/}
                  {/*/>*/}
                  <div className="user-ads-list-item-img">
                    <img src={userAdvertisement.image} />
                  </div>
                  <div className="user-ads-list-item-name">
                    <div className="user-ads-auction-title">
                      <h5>{userAdvertisement.name}</h5>
                    </div>
                    <div className="user-ads-auction-user">
                      <p>
                        Ogłoszenie użytkownika:{" "}
                        <strong>
                          {userAdvertisement.advertisementerEmail}
                        </strong>
                      </p>
                      <p>
                        Data wystawienia ogłoszenia:{" "}
                        <strong>{userAdvertisement.data}</strong>
                      </p>
                    </div>
                  </div>
                  <div className="user-ads-list-item-price">
                    <h5>{userAdvertisement.price} zł</h5>
                    <div className="delete-box">
                      <DeleteIcon
                        name="trash"
                        data-id={userAdvertisement.id}
                        style={{
                          fontSize: "2rem",
                        }}
                        className="icon"
                        onClick={deleteAdv}
                      />
                      <Link
                        key={userAdvertisement.id}
                        to={`/edit/${userAdvertisement.id}`}
                        rel="noopener noreferrer"
                      >
                        <EditIcon
                          name="edit"
                          // data-id={userAdvertisement.id}
                          style={{
                            fontSize: "2rem",
                          }}
                          className="icon"
                          // onClick={() => setEditModalShow(true)}
                        />
                      </Link>
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
        </ul>
        <div className="user-ads-header-container">
          <h2>Sprzedane:</h2>
          <hr></hr>
        </div>
        <ul>
          {userSoldAds.length ? (
            userSoldAds
              .sort((a, b) => parseDate(b.date) - parseDate(a.date))
              .map((userSoldAd, index) => (
                <li key={index}>
                  <div className="user-ads-list-item-img">
                    <img src={userSoldAd.advertisementImage} />
                  </div>
                  <div className="user-ads-list-item-name">
                    <div className="user-ads-auction-title">
                      <h5>{userSoldAd.advertisementName}</h5>
                    </div>
                    <div className="user-ads-auction-user">
                      <p>
                        Ogłoszenie użytkownika:{" "}
                        <strong>{userSoldAd.advertisementerEmail}</strong>
                      </p>
                      <p>
                        Data wystawienia ogłoszenia:{" "}
                        <strong>{userSoldAd.advertisementDate}</strong>
                      </p>
                    </div>
                  </div>
                  <div className="user-ads-list-item-price">
                    <h5>{userSoldAd.advertisementPrice} zł</h5>
                    <div className="buyer-info">
                      <h6 style={{}}>Dane kupującego do wysyłki:</h6>
                      <p>
                        Imię i nazwisko: <strong>{userSoldAd.buyerName}</strong>
                      </p>
                      <p>
                        Miasto: <strong>{userSoldAd.buyerCity}</strong>
                      </p>
                      <p>
                        Adres: <strong>{userSoldAd.buyerAddress}</strong>
                      </p>
                      <p>
                        Data zakupu: <strong>{userSoldAd.date}</strong>
                      </p>
                      <div className="rating-box">
                        Ocena kupującego:
                        <Rating
                          name="user-rating"
                          value={userSoldAd.rating}
                          precision={0.5}
                          size="small"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </li>
              ))
          ) : (
            <h3
              style={{
                textAlign: "center",

                textDecoration: "underline",
              }}
            >
              Jeszcze nic nie zostało sprzedane.
            </h3>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserAdvertisements;
