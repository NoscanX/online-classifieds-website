import Categories from "../components/Categories";
import PriceFilter from "../components/PriceFilter";
import AdsList from "../components/AdsList";

import "../styles/home-styles.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="categories-container">
        <Categories />
      </div>

      <div className="categories-content">
        <div className="categories-filters">
          <PriceFilter />
        </div>
        <hr />
        <div className="ad-list-render-container">
          <h4>Dostępne ogłoszenia:</h4>
          <AdsList />
        </div>
      </div>
    </div>
  );
};

export default Home;
