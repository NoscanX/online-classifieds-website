import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import PriceFilter from "./PriceFilter";
import priceFilter from "./PriceFilter";

interface Props {
  searchByName: string;
  categoryId: string | undefined;
  filterBy: string;
}

const AdsList = ({ searchByName, filterBy, categoryId }: Props) => {
  const [advertisements, setAdvertisements] = useState<any[]>([]);

  useEffect(() => {
    loadAdvertisements();
  }, [categoryId]);

  useEffect(() => {
    filterAds();
  }, [filterBy]);

  // useEffect(() => {}, [advertisements]);

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

  const filterAds = () => {
    let advertisementsTemp = [...advertisements];
    switch (filterBy) {
      case "priceDesc":
        advertisementsTemp.sort((a, b) => b.price - a.price);
        break;
      case "priceAsc":
        advertisementsTemp.sort((a, b) => a.price - b.price);
        break;
      case "dateDesc":
        advertisementsTemp.sort(
          (a, b) => parseDate(b.data) - parseDate(a.data)
        );
        break;
      case "dateAsc":
        advertisementsTemp.sort(
          (a, b) => parseDate(a.data) - parseDate(b.data)
        );
        break;
      default:
        loadAdvertisements();
        break;
    }
    setAdvertisements(advertisementsTemp);
  };

  const loadAdvertisements = async () => {
    if (categoryId) {
      const catRes = await axios.get(
        `/advertisement/getAllAdvertisementsByCategoryId/${categoryId}`
      );
      setAdvertisements(catRes.data);
      console.log("Po kategorii", catRes);
    } else {
      const res = await axios.get(`/advertisement/getAllAdvertisements`);
      setAdvertisements(res.data);
      console.log(res);
    }
  };

  const isAdActiveFilter = advertisements.filter(
    (advertisements) => advertisements.isAdvertisementActive === true
  );

  const nameFilter = isAdActiveFilter.filter((advertisements) =>
    advertisements.name.toLowerCase().includes(searchByName.toLowerCase())
  );

  return (
    <div className="list-items-wrap">
      <ul>
        {nameFilter.length ? (
          nameFilter.map((advertisement, index) => (
            <Link
              key={advertisement.id}
              to={`/product/${advertisement.id}`}
              rel="noopener noreferrer"
            >
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
                    {advertisement.isAdvertisementActive}
                  </div>
                  <div className="auction-user">
                    <p>
                      Ogłoszenie użytkownika:{" "}
                      <strong>{advertisement.advertisementerEmail}</strong>
                    </p>
                    <p>
                      Data wystawienia ogłoszenia:{" "}
                      <strong>{advertisement.data}</strong>
                    </p>
                  </div>
                </div>
                <div className="ad-list-item-price">
                  <h5>{advertisement.price} zł</h5>
                </div>
              </li>
            </Link>
          ))
        ) : (
          // <div
          //   style={{
          //     display: "flex",
          //     flexDirection: "column",
          //   }}
          // >
          //   <h3
          //     style={{
          //       textAlign: "center",
          //       marginTop: "4rem",
          //       textDecoration: "underline",
          //     }}
          //   >
          //     Wygląda na to, że nikt jeszcze nie dodał ogłoszenia.
          //     <div
          //       style={{
          //         marginTop: "3rem",
          //       }}
          //     >
          //       <img src={require("../assets/3x.png")}></img>
          //     </div>
          //   </h3>
          // </div>
          <div className="loading">
            <h2>Loading...</h2>
            <Spinner animation="border" variant="primary" />
          </div>
        )}
      </ul>
    </div>
  );
};

export default AdsList;
