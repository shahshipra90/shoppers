import React, { useEffect, useState } from 'react';
import Navbar from './Components/navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import SignupLogin from './Pages/SignupLogin';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/assests/banner_mens.png';
import women_banner from './Components/assests/banner_women.png';
import kid_banner from './Components/assests/banner_kids.png';
import { db } from './firebase'; // Adjust the path accordingly
import { collection, addDoc } from 'firebase/firestore';
// import { ShopContext } from './Context/ShopContext';
// import {getAuth, setPeersistance, browserSessionPersistence, setPersistence} from 'firebase/auth';
// import {app} from './firebase';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  // Use useEffect to add data to Firebase when the component mounts
  useEffect(() => {

    
    // const addDataToFirestore = async () => {
    //   try {
    //     const dataCollection = collection(db, 'Auth');
    //     await addDoc(dataCollection, { key: 'value' }); // Replace 'key' and 'value' with your actual data
    //     console.log('Data added to Firestore successfully');
    //   } catch (error) {
    //     console.error('Error adding data to Firestore:', error);
    //   }
      
    // };
    // console.log("Logged in status:", true);
   
    
    // Call the function to add data when the component mounts
  //   addDataToFirestore();
  // }, [loggedIn]); // Empty dependency array ensures that this effect runs only once when the component mounts
  const addDataToFirestore = async () => {
    try {
      const dataCollection = collection(db, 'Auth');
      await addDoc(dataCollection, { key: 'value' }); // Replace 'key' and 'value' with your actual data
      console.log('Data added to Firestore successfully');
    } catch (error) {
      console.error('Error adding data to Firestore:', error);
    }
    
  };
  console.log("Logged in status:", true);
  addDataToFirestore();
}, [loggedIn]);
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/mens" element={<ShopCategory banner={men_banner} category="men" />} />
          <Route path="/womens" element={<ShopCategory banner={women_banner} category="women" />} />
          <Route path="/kids" element={<ShopCategory banner={kid_banner} category="kid" />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/signup" element={<SignupLogin />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
