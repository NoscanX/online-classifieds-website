import React from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Account from "./pages/Account";
import { Route, Routes } from "react-router-dom";
import AddAdvertising from "./pages/AddAdvertising";
import UserAdvertisements from "./pages/UserAdvertisements";
import Purchases from "./pages/Purchases";
import Product from "./pages/Product";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.css";


function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add_advertising" element={<AddAdvertising />} />
          <Route path="/account" element={<Account />} />
          <Route path="/user_ads" element={<UserAdvertisements />} />
          <Route path="/user_purchases" element={<Purchases />} />
          <Route path="/product" element={<Product />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
