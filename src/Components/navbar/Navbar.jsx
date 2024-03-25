import React, { useState, useContext, useEffect } from 'react';
import logo from '../assests/logo.png';
import cart_icon from '../assests/cart_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import { auth } from '../../firebase';  // Adjusted path
import { onAuthStateChanged, signOut } from 'firebase/auth';  // Updated import
import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menu, setMenu] = useState('shop');
  const [authUser, setAuthUser] = useState(null); // Manage authUser state in Navbar
  const context = useContext(ShopContext);
  const { getTotalCartItems, loggedIn, logout } = context;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    // Clean up function to unsubscribe when component unmounts
    return () => unsubscribe();
  }, []); // Run useEffect only once on component mount

  const handleLogout = async () => {
    try {
      await signOut(auth);
      logout(); // Perform additional logout actions if needed
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={logo} alt='' />
        <p>Shoppers</p>
      </div>
      <ul className='nav-menu'>
      <li onClick={()=>{setMenu("shop")}}><Link to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}<hr/></li>
      <li onClick={()=>{setMenu("mens")}}><Link to='/mens'>Men</Link>{menu==="mens"?<hr/>:<></>}</li>
      <li onClick={()=>{setMenu("womens")}}><Link to='/womens'>Womens</Link>{menu==="womens"?<hr/>:<></>}</li>
      <li onClick={()=>{setMenu("kids")}}><Link to='/kids'>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
      </ul>
      <div className='nav-login-cart'>
        {authUser ? (
          <>
            <p>Welcome {authUser.displayName}</p>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to='/login'>
            <button>Login</button>
          </Link>
        )}
        <Link to='/cart'>
          <img src={cart_icon} alt='' />
        </Link>
        <div className='nav-cart-count'>{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;

