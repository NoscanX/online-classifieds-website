import "../styles/user-purchases-styles.css";
import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

interface PurchaseRatingTypes {
  rating: number;
}

const initialPurchaseRatingValues = {
  //do zmiany na 0
  rating: 0,
};

const Purchases = () => {
  const [trigger, setTrigger] = useState<boolean>();

  const [userPurchases, setUserPurchases] = useState<any[]>([]);
  const [purchaseRating, setPurchaseRating] = useState<PurchaseRatingTypes>(
    initialPurchaseRatingValues
  );

  useEffect(() => {
    loadUserPurchases();
  }, [trigger]);

  const loadUserPurchases = async () => {
    const res = await axios.get(`purchase/getAllPurchasesByUserId/me`);
    setUserPurchases(res.data);
    console.log(res);
  };

  const updatePurchaseRating = {
    updatePurchaseRating: async (id: number, rating: number) => {
      console.log("WTF");
      await axios({
        method: "PUT",
        url: `/purchase/updateRating/${id}`,
        data: { rating },
      });
      setTrigger(!trigger);
      // setUserPurchases([...userPurchases]);
    },
  };

  return (
    <div className="user-purchases-container">
      <div className="purchases-header-container">
        <h2 style={{ marginBottom: "3rem" }}>Lista zakupionych ofert</h2>
      </div>

      <div className="purchased-list-items-wrap">
        <ul>
          {userPurchases.length ? (
            userPurchases.map((userPurchase, index) => (
              <li key={index}>
                <div className="purchased-list-item-img">
                  <img src={userPurchase.advertisementImage} />
                </div>
                <div className="purchased-list-item-name">
                  <div className="purchased-auction-title">
                    <h5>{userPurchase.advertisementName}</h5>
                  </div>
                  <div className="purchased-auction-user">
                    <p>
                      Ogłoszenie użytkownika:{" "}
                      <strong>{userPurchase.advertisementerEmail}</strong>
                    </p>
                    <p>
                      Data wystawienia ogłoszenia:{" "}
                      <strong>{userPurchase.advertisementDate}</strong>
                    </p>
                  </div>
                </div>
                <div className="purchased-list-item-price">
                  <h5>{userPurchase.price}</h5>
                  <div className="rating-box-purchases">
                    <h5>Data zakupu: {userPurchase.date}</h5>
                    <p>Oceń aukcję tego użytkownika</p>
                    <Rating
                      name="user-rating"
                      key={userPurchase.id}
                      value={userPurchase.rating}
                      precision={0.5}
                      size="large"
                      onChange={(event, newValue) => {
                        updatePurchaseRating.updatePurchaseRating(
                          userPurchase.id,
                          newValue ?? 0
                        );
                      }}
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
              Nie dokonałeś żadnego zakupu.
            </h3>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Purchases;
