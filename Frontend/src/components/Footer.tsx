import React from "react";
import "../styles/footer-styles.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-wrapper">
        <div className="footer-header footer-part">
            <h2>OCW</h2>
        </div>
        <div className="footer-content footer-part">
            <p>Strona umożliwiająca użytkownikom wystawianie swoich ofert sprzedaży oraz kupowanie wystawionych produktów.</p>
        </div>
        <div className="footer-author footer-part">
            <h3>Strona wykonana przez:</h3>
            <h3>Jacek Michalski</h3>
        </div>
      </div>
    </div>
  );
}

export default Footer