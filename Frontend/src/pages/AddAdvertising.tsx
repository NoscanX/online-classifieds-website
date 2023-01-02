import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../styles/add-ad-styles.css";
import axios from "axios";
import { toast } from "react-toastify";

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

const AddAdvertising = () => {
  const [currentValue, setCurrentValue] = useState(undefined);

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
    await postAd.saveAdvertisement(advertisementValues);
    setadvertisementValues(initialAdvertisementValues);
    toast.success("Dodano ogłoszenie.");
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
      "categories/getAllCategories"
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

  const handleImageChange = (e: any) => {
    setadvertisementValues((prevState) => ({
      ...prevState,
      image: e.target.files[0],
    }));
  };

  return (
    <div className="add-advertising-form-container">
      <Form
        noValidate
        onSubmit={handleAddAdSubmit}
        validated={validatedAddAd}
        style={{ width: "60%", padding: "2rem 3rem" }}
      >
        <h2 style={{ marginBottom: "3rem" }}>Dodaj swoje ogłoszenie</h2>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Nazwa ogłoszenia</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Nazwa"
            value={advertisementValues.name}
            onChange={(e) => {
              setadvertisementValues((prevState) => ({
                ...prevState,
                name: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Opis ogłoszenia</Form.Label>
          <Form.Control
            required
            as="textarea"
            rows={4}
            placeholder="Opis"
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
          >
            {categories.map((category, index) => (
              <option key={index} value={category.id}>
                {category.parentCategoryName}, {category.subcategoryName}
              </option>
            ))}
          </Form.Select>
          <h1>{advertisementValues.categoryId}</h1>
        </div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Cena</Form.Label>
          <Form.Control
            type="number"
            placeholder="Cena"
            value={advertisementValues.price}
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
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Prześlij zdjęcie do ogłoszenia</Form.Label>
          <Form.Control
            required
            accept=".png,.jpg,.jpeg"
            type="file"
            value={advertisementValues.image}
            // onChange={(e) => handleImageChange(e)}
            onChange={(e) => {
              checkValue(e);
              setadvertisementValues((prevState) => ({
                ...prevState,
                image: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Button type="submit">Wystaw ofertę</Button>
      </Form>
    </div>
  );
};

export default AddAdvertising;
