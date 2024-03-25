// ShopContext.js
import React, { createContext, useState } from "react";
import all_product from "../Components/assests/all_product";
import { db } from "../firebase.js"

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < all_product.length; index++) {
        cart[index] = 0;
    }
    return cart;
};

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };

  

    const login = async (userData) => {
        console.log("User data:", userData);
        setUser(userData);
        setLoggedIn(true);
        const fetchedUsername = await getUserData(userData.uid);
        console.log("Fetched username:", fetchedUsername);
        setUsername(fetchedUsername);
    };

const getUserData = async (userId) => {
    try {
        const userRef = db.collection('userData').doc(userId);
        const userDoc = await userRef.get();

        if (userDoc.exists) {
            const userData = userDoc.data();
            console.log("Fetched user data:", userData);
            const fetchedUsername = userData.Username;  // Ensure it matches the Firestore field name
            console.log("Fetched username:", fetchedUsername);
            return fetchedUsername;
        } else {
            console.log("User document does not exist for ID:", userId);
            return null;
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
};


    const logout = () => {
        setUser(null);
        setLoggedIn(false);
        setUsername('');
    };


    const contextValue = {
        getTotalCartItems,
        getTotalCartAmount,
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
        user,
        login,
        logout,
        loggedIn,
        username,
        setLoggedIn,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
