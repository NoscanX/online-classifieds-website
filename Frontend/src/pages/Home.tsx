import Categories from "../components/Categories";
import PriceFilter from "../components/PriceFilter";
import AdsList from "../components/AdsList";

import "../styles/home-styles.css";
import { useState } from "react";

const Home = () => {
  const [searchAdByName, setSearchAdByName] = useState<string>("");
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
          <AdsList searchByName={searchAdByName} />
        </div>
      </div>
    </div>
  );
};

export default Home;
