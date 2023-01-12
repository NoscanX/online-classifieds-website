import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../styles/add-ad-styles.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

interface AdvertisementTypes {
  name: string;
  description: string;
  categoryId: number;
  price: number;
  image: string;
}

const initialAdvertisementValues = {
  name: "",
  description: "",
  categoryId: 1,
  price: 0,
  image: "",
};

const Edit = () => {
  const [currentValue, setCurrentValue] = useState(undefined);
  const [object, setObject] = useState<any>();
  const { advertisementId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    loadAdvert();
  }, [advertisementId]);

  const loadAdvert = async () => {
    if (advertisementId) {
      const adRes = await axios.get(
        `/advertisement/product/getAdvertisement/${advertisementId}`
      );
      setObject(adRes.data);
      console.log(adRes);
      initialAdvertisementValues.name = adRes.data.name;
      initialAdvertisementValues.description = adRes.data.description;
      initialAdvertisementValues.categoryId = adRes.data.categoryId;
      initialAdvertisementValues.price = adRes.data.price;
      initialAdvertisementValues.image = adRes.data.image;
      // console.log("Po kategorii", catRes);
    } else {
      setObject(undefined);
    }
  };

  const checkValue = (event: any) => {
    setCurrentValue(handleDecimalsOnValue(event.target.value));
  };

  const handleDecimalsOnValue = (value: any) => {
    const regex = /([0-9]*[\.|\,]{0,1}[0-9]{0,2})/s;
    return value.match(regex)[0];
  };

  const [validatedAddAd, setValidatedAddAd] = useState<boolean>(false);

  const postAd = {
    saveAdvertisement: async (advert: AdvertisementTypes) => {
      console.log("WTF");
      return axios({
        method: "POST",
        url: `advertisement/add/me/${advert.categoryId}`,
        data: advert,
      });
    },
  };

  const updateAd = {
    updateAd: async (advert: AdvertisementTypes) => {
      console.log("WTF");
      await axios({
        method: "PUT",
        url: `/advertisement/updateAdvertisement/${advertisementId}/${advert.categoryId}`,
        data: advert,
      });
    },
  };

  const handleAddAdSubmit = async (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidatedAddAd(true);
      console.log(advertisementValues);
      toast.error("Błędy w formularzu!");
      return;
    }
    console.log(advertisementValues);
    await updateAd.updateAd(advertisementValues);
    // setadvertisementValues(initialAdvertisementValues);
    toast.success("Edytowano ogłoszenie.");
    setTimeout(() => navigate("/user_ads", { replace: true }), 1000);
  };

  //types and onchange
  const [advertisementValues, setadvertisementValues] =
    useState<AdvertisementTypes>(initialAdvertisementValues);

  //categories fetch
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const fetchCategoriesResponse = await axios.get(
      "/categories/getAllCategories"
    );
    setCategories(fetchCategoriesResponse.data);
    console.log(fetchCategoriesResponse);
  };

  //select field handlers
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setadvertisementValues((prevState) => ({
      ...prevState,
      categoryId: mapProperCategoryId(e.target.value),
    }));
  };

  const mapProperCategoryId = (id: string) => {
    switch (id) {
      case "1":
        return 1;
      case "2":
        return 2;
      case "3":
        return 3;
      case "4":
        return 4;
      case "5":
        return 5;
      case "6":
        return 6;
      default:
        return 0;
    }
  };

  const handleImageChange = async (e: any) => {
    const file = e.target.files[0];
    await convertFile(file);
    console.log(file);
    console.log(advertisementValues.image);
  };

  const convertFile = (file: Blob) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      setadvertisementValues({
        ...advertisementValues,
        image: (fileReader.result || "").toString(),
      });
    };
  };

  return (
    <div className="add-advertising-form-container">
      <Form
        noValidate
        onSubmit={handleAddAdSubmit}
        validated={validatedAddAd}
        style={{ width: "60%", padding: "2rem 3rem" }}
      >
        <h2 style={{ marginBottom: "3rem" }}>Edytuj ogłoszenie</h2>
        {object ? (
          <>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1e">
              <Form.Label>Nazwa ogłoszenia</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder={object.name}
                // defaultValue={object.name}
                value={advertisementValues.name}
                onChange={(e) => {
                  setadvertisementValues((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                  }));
                }}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1e"
            >
              <Form.Label>Opis ogłoszenia</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={4}
                // defaultValue={object.description}
                value={advertisementValues.description}
                onChange={(e) => {
                  setadvertisementValues((prevState) => ({
                    ...prevState,
                    description: e.target.value,
                  }));
                }}
              />
            </Form.Group>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                margin: "1.4rem",
              }}
            >
              <Form.Label>Wybierz kategorię</Form.Label>
              <Form.Select
                aria-label="Default select example"
                required
                value={advertisementValues.categoryId}
                onChange={(e) => handleSelectChange(e)}
                style={{ width: "60%" }}
                // defaultValue={object.categoryId}
              >
                {categories.map((category, index) => (
                  <option key={index} value={category.id}>
                    {category.parentCategoryName}, {category.subcategoryName}
                  </option>
                ))}
              </Form.Select>
            </div>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1e"
            >
              <Form.Label>Cena (zł,gr)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Cena"
                value={advertisementValues.price}
                // defaultValue={object.price}
                onChange={(e) => {
                  checkValue(e);
                  setadvertisementValues((prevState) => ({
                    ...prevState,
                    price: Number(e.target.value),
                  }));
                }}
                step=".01"
                required
              />
            </Form.Group>
            <Form.Group controlId="formFilee" className="mb-3">
              <Form.Label>
                Prześlij zdjęcie do ogłoszenia (.png, .jpg, .jpeg)
              </Form.Label>
              <Form.Control
                required
                accept=".png,.jpg,.jpeg"
                name="fileInput"
                type="file"
                // defaultValue={object.image}
                onChange={(e) => handleImageChange(e)}
                // onChange={(e) => {
                //   checkValue(e);
                //   setadvertisementValues((prevState) => ({
                //     ...prevState,
                //     image: e.target.value,
                //   }));
                // }}
              />
            </Form.Group>
            {/*<Button onClick={handleAddAdSubmit}>Wystaw ofertę</Button>*/}
            {/*<Button*/}
            {/*  onClick={() => {*/}
            {/*    console.log(advertisementValues);*/}
            {/*  }}*/}
            {/*>*/}
            {/*  Edytuj*/}
            {/*</Button>*/}
            <Button onClick={handleAddAdSubmit}>Edytuj</Button>
          </>
        ) : (
          <div className="loading">
            <h2>Loading...</h2>
            <Spinner animation="border" variant="primary" />
          </div>
        )}
      </Form>
    </div>
  );
};
export default Edit;
