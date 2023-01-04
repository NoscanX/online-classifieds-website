import Categories from "../components/Categories";
import PriceFilter from "../components/PriceFilter";
import AdsList from "../components/AdsList";

import "../styles/home-styles.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [searchAdByName, setSearchAdByName] = useState<string>("");
  const [categories, setCategories] = useState<any>();
  const { categoryId } = useParams();
  const [trigger, setTrigger] = useState<boolean>();
  // const handleSearch = (event: any) => {
  //   setSearchAdByName(event.target.value);
  // };

  useEffect(() => {
    loadCategory();
  }, [trigger]);

  const loadCategory = async () => {
    if (categoryId) {
      const catRes = await axios.get(
        `/categories/category/getCategoryById/${categoryId}`
      );
      setCategories(catRes.data);
      setTrigger(!trigger);
      // console.log("Po kategorii", catRes);
    }
  };

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
          <h4>
            Wybrana kategoria:
            {categories ? (
              <>
                {" "}
                {categories.parentCategoryName}
                {" > "}
                {categories.subcategoryName}
              </>
            ) : (
              " Wszystkie"
            )}
          </h4>
          <AdsList searchByName={searchAdByName} categoryId={categoryId} />
        </div>
      </div>
    </div>
  );
};

export default Home;
