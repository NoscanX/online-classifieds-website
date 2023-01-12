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
import { ToastContainer } from "react-toastify";
import AdminPage from "./pages/AdminPage";
import LoginFailure from "./pages/LoginFailure";
import Articles from "./pages/Articles";
import Edit from "./pages/Edit";

function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add_advertising" element={<AddAdvertising />} />
          <Route path="/account" element={<Account />} />
          <Route path="/user_ads" element={<UserAdvertisements />} />
          <Route path="/user_purchases" element={<Purchases />} />
          <Route path="/product/:advertisementId" element={<Product />} />
          <Route path="/admin_panel" element={<AdminPage />} />
          <Route path="/category/:categoryId" element={<Home />} />
          <Route path="/edit/:advertisementId" element={<Edit />} />
          <Route path="/failed" element={<LoginFailure />} />
          <Route path="/articles" element={<Articles />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
