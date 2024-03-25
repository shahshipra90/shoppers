import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../assests/star_icon.png';
import star_dull_icon from '../assests/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import {app} from '../../firebase';

const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);

    const handleAddToCart = () => {
      const user = app.auth().currentUser;

      if (user){
        addToCart(product.id);
        // alert("Added to cart")
      }
      else{
        alert("Login to add to cart");
      }
    };


  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
            <img src = {product.image} alt="" />
            <img src = {product.image} alt="" />
            <img src = {product.image} alt="" />
            <img src = {product.image} alt="" />
        </div>
        <div className="productdisplay-img">
            <img className='productdisplay-main-img' src = {product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
            <img src ={star_icon} alt = "" />
            <img src ={star_icon} alt = "" />
            <img src ={star_icon} alt = "" />
            <img src ={star_icon} alt = "" />
            <img src ={star_dull_icon} alt = "" />
            <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
            <div className="productdisplay-right-price-old">
                ${product.old_price}
            </div>
            <div className="productdisplay-right-price-new">${product.new_price}</div>
        </div>
        <div className="productdisplay-description">
            A lightweight knitted pullover shirt, close-fitting and with a round necklace and short sleeves, worn as an undershirt or outer garment.
        </div>
        <div className="productdisplay-size">
            <h1>Select Size</h1>
            <div className="productdisplay-right-size">
                <div>S</div>
                <div>M</div>
                <div>L</div>
                <div>XL</div>
                <div>XXL</div>
            </div>
        </div>
        <button onClick={handleAddToCart}>ADD TO CART</button>
        <p className='productdisplay-right-category'><span>Category :</span>Women, T-Shirt,Crop Top </p>
        <p className='productdisplay-right-category'><span>Tags :</span>Modern, Latest </p>
      </div>
    </div>
  )
}

export default ProductDisplay
