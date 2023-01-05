import { Form, Button, Modal } from "react-bootstrap";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AdsEditModal = (props: any) => {
  const [validatedAddAd, setValidatedAddAd] = useState<boolean>(false);

  // const handleAddAdSubmit = async (event: any) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //     setValidatedAddAd(true);
  //     console.log(advertisementValues);
  //     toast.error("Błędy w formularzu!");
  //     return;
  //   }
  //   console.log(advertisementValues);
  //   await postAd.saveAdvertisement(advertisementValues);
  //   setadvertisementValues(initialAdvertisementValues);
  //   toast.success("Dodano ogłoszenie.");
  // };

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edytuj ogłoszenie
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/*<Form*/}
        {/*  noValidate*/}
        {/*  // onSubmit={handleAddAdSubmit}*/}
        {/*  validated={validatedAddAd}*/}
        {/*  style={{ width: "60%", padding: "2rem 3rem" }}*/}
        {/*>*/}
        {/*  <h2 style={{ marginBottom: "3rem" }}>Dodaj swoje ogłoszenie</h2>*/}
        {/*  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">*/}
        {/*    <Form.Label>Nazwa ogłoszenia</Form.Label>*/}
        {/*    <Form.Control*/}
        {/*      required*/}
        {/*      type="text"*/}
        {/*      placeholder="Nazwa"*/}
        {/*      value={advertisementValues.name}*/}
        {/*      onChange={(e) => {*/}
        {/*        setadvertisementValues((prevState) => ({*/}
        {/*          ...prevState,*/}
        {/*          name: e.target.value,*/}
        {/*        }));*/}
        {/*      }}*/}
        {/*    />*/}
        {/*  </Form.Group>*/}
        {/*  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">*/}
        {/*    <Form.Label>Opis ogłoszenia</Form.Label>*/}
        {/*    <Form.Control*/}
        {/*      required*/}
        {/*      as="textarea"*/}
        {/*      rows={4}*/}
        {/*      placeholder="Opis"*/}
        {/*      value={advertisementValues.description}*/}
        {/*      onChange={(e) => {*/}
        {/*        setadvertisementValues((prevState) => ({*/}
        {/*          ...prevState,*/}
        {/*          description: e.target.value,*/}
        {/*        }));*/}
        {/*      }}*/}
        {/*    />*/}
        {/*  </Form.Group>*/}
        {/*  <div*/}
        {/*    style={{*/}
        {/*      display: "flex",*/}
        {/*      flexDirection: "column",*/}
        {/*      justifyContent: "space-around",*/}
        {/*      margin: "1.4rem",*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    <Form.Label>Wybierz kategorię</Form.Label>*/}
        {/*    <Form.Select*/}
        {/*      aria-label="Default select example"*/}
        {/*      required*/}
        {/*      value={advertisementValues.categoryId}*/}
        {/*      onChange={(e) => handleSelectChange(e)}*/}
        {/*      style={{ width: "60%" }}*/}
        {/*    >*/}
        {/*      {categories.map((category, index) => (*/}
        {/*        <option key={index} value={category.id}>*/}
        {/*          {category.parentCategoryName}, {category.subcategoryName}*/}
        {/*        </option>*/}
        {/*      ))}*/}
        {/*    </Form.Select>*/}
        {/*    <h1>{advertisementValues.categoryId}</h1>*/}
        {/*  </div>*/}
        {/*  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">*/}
        {/*    <Form.Label>Cena (zł,gr)</Form.Label>*/}
        {/*    <Form.Control*/}
        {/*      type="number"*/}
        {/*      placeholder="Cena"*/}
        {/*      value={advertisementValues.price}*/}
        {/*      onChange={(e) => {*/}
        {/*        checkValue(e);*/}
        {/*        setadvertisementValues((prevState) => ({*/}
        {/*          ...prevState,*/}
        {/*          price: Number(e.target.value),*/}
        {/*        }));*/}
        {/*      }}*/}
        {/*      step=".01"*/}
        {/*      required*/}
        {/*    />*/}
        {/*  </Form.Group>*/}
        {/*  <Form.Group controlId="formFile" className="mb-3">*/}
        {/*    <Form.Label>*/}
        {/*      Prześlij zdjęcie do ogłoszenia (.png,.jpg,.jpeg)*/}
        {/*    </Form.Label>*/}
        {/*    <Form.Control*/}
        {/*      required*/}
        {/*      accept=".png,.jpg,.jpeg"*/}
        {/*      name="fileInput"*/}
        {/*      type="file"*/}
        {/*      onChange={(e) => handleImageChange(e)}*/}
        {/*    />*/}
        {/*  </Form.Group>*/}
        {/*  <Button onClick={handleAddAdSubmit}>Wystaw ofertę</Button>*/}
        {/*</Form>*/}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Zamknij</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdsEditModal;
