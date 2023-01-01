import { Form, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

interface UserAddressTypes {
  city: string;
  address: string;
}

const initialUserAddressValues = {
  city: "",
  address: "",
};

interface PurchaseTypes {
  advertisementId: number;
}

const initialPurchaseValues = {
  //do zmiany na 0
  advertisementId: 1,
};

const BuyNowModal = (props: any) => {
  const [validatedAddress, setValidatedAddress] = useState<boolean>(false);

  const [purchaseValues, setPurchaseValues] = useState<PurchaseTypes>(
    initialPurchaseValues
  );
  const [addressValues, setAddressValues] = useState<UserAddressTypes>(
    initialUserAddressValues
  );

  const postPurchaseAdd = {
    savePurchase: async (purchase: PurchaseTypes) => {
      console.log("WTF");
      return axios({
        method: "POST",
        url: `purchase/me/${purchase.advertisementId}`,
        data: purchase,
      });
    },
  };

  const updateBuyerAddress = {
    saveBuyerAddress: async (address: UserAddressTypes) => {
      console.log("WTF");
      return axios({
        method: "POST",
        url: `user/updateUser/me`,
        data: address,
      });
    },
  };

  const handleBuyNowSubmit = async (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidatedAddress(true);
      toast.error("Błędy w formularzu!");
      return;
    }
    await postPurchaseAdd.savePurchase(purchaseValues);
    setPurchaseValues(initialPurchaseValues);
    await updateBuyerAddress.saveBuyerAddress(addressValues);
    setAddressValues(initialUserAddressValues);

    toast.success("Dodano ogłoszenie.");
    console.log(purchaseValues);
    console.log(addressValues);
    console.log("addressValues");
  };

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Wprowadź dane dostawy
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          noValidate
          validated={validatedAddress}
          onSubmit={handleBuyNowSubmit}
        >
          <Form.Group className="mb-3" controlId="cityInput">
            <Form.Label>Miasto</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder=""
              value={addressValues.city}
              onChange={(e) => {
                setAddressValues((prevState) => ({
                  ...prevState,
                  city: e.target.value,
                }));
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="addressInput">
            <Form.Label>Adres</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder=""
              value={addressValues.address}
              onChange={(e) => {
                setAddressValues((prevState) => ({
                  ...prevState,
                  address: e.target.value,
                }));
              }}
            />
          </Form.Group>
          <Button type="submit">Potwierdź zakup</Button>
        </Form>
        <div>
          <p
            style={{
              marginTop: "1rem",
              marginBottom: "0",
              fontSize: ".8rem",
              color: "red",
              fontWeight: "bold",
            }}
          >
            UWAGA!
          </p>
          <p style={{ fontSize: ".8rem", color: "red" }}>
            Obsługujemy tylko płatność za pobraniem.
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer style={{ flexDirection: "column" }}>
        <Button onClick={props.onHide}>Zamknij</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BuyNowModal;
