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
    addToCartFromWishlist: () => {},
    inCreaseProductQuantity: () => {},
    deCreaseProductQuantity: () => {},
    changeCheckboxStatus: () => {},
    changeAllSelectedStatus: () => {},
    placeOrder: () => {}
})

export default cartContext