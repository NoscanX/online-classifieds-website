import React from 'react'
import "../styles/product-styles.css";
import {Button} from "react-bootstrap"

const Product = () => {
  return (
    <div className='main-product-container'>
      <div><h2 style={{ marginBottom: "2rem" }}></h2></div>
      <div className='carousel-user-content'>
        <div className='img-carousel'>
bly<img src={require("../assets/maluch.png")} />
        </div>
        <div className='user-card'>
bly<Button>Kup teraz</Button>
        </div>
      </div>
      <div className='product-description-content'>
bly
      </div>
    </div>
  )
}

export default Product;