import React from "react";

const cartContext = React.createContext({
    cartList:[],
    wishList:[],
    allSelected:true,
    addToCart: () => {},
    removeFromCart: () => {},
    clearCart: () => {},
    addToWishList:() => {},
    removeFromWishList:() => {},
    clearWishList:() => {},
    inCreaseProductQuantity: () => {},
    deCreaseProductQuantity: () => {},
    changeCheckboxStatus: () => {},
    changeAllSelectedStatus: () => {},
    getUserDetails:() => {},
    userDetails:{}
})

export default cartContext