import Categories from "../components/Categories";
import PriceFilter from "../components/PriceFilter";
import AdsList from "../components/AdsList";

import "../styles/home-styles.css";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Home = () => {
  const [searchAdByName, setSearchAdByName] = useState<string>("");
  const { categoryId } = useParams();
  // const handleSearch = (event: any) => {
  //   setSearchAdByName(event.target.value);
  // };
  return (
    <div className="home-container">
      <div className="categories-container">
        <Categories />
      </div>

      <div className="categories-content">
        <div className="categories-filters">
          <PriceFilter handleSearch={setSearchAdByName} />
        </div>
        <hr />
        <div className="ad-list-render-container">
          <h4>Dostępne ogłoszenia:</h4>
          <AdsList searchByName={searchAdByName} categoryId={categoryId} />
        </div>
      </div>
    </div>
  );
};

export default Home;
