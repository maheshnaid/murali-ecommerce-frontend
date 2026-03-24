import './index.css'
import { useState } from 'react';
import { FaTrash } from "react-icons/fa6";
import cartContext from '../../context/cartContext';

const CartItem = (props) => {
    const {cartItemDetails} = props
    const {images, price, id, quantity, title, brand, isSelected} = cartItemDetails
    const productImg = images[0]
    const inRupees = Math.ceil(price) * quantity * 100
    
    
    return (
        <cartContext.Consumer>
            {value => {
                
                const {removeFromCart, inCreaseProductQuantity, deCreaseProductQuantity, changeCheckboxStatus} = value

                const onClickRemoveFromCart = () => (
                        removeFromCart(id)
                    )

                const decreaseQuantity = () => (
                    deCreaseProductQuantity(id)
                )

                const increaseQuantity = () => (
                    inCreaseProductQuantity(id)
                )

                const onChangeCheckbox = () => (
                    changeCheckboxStatus(id)
                )

                return(
                    <div className='cart-item-container'>
                        <div className='img-title-container'>
                            <div style={{backgroundImage:`url(${productImg})`}} className='cart-item-img'>
                                <input checked={isSelected} onChange={onChangeCheckbox} type='checkbox' className='cart-checkbox' />
                            </div>
                            <div className='title-brand-container'>
                                <h1 className='cart-item-title'>{title}</h1>
                                <h1 className='cart-item-brand'>{brand}</h1>
                            </div>
                        </div>
                        
                        <div className='quantity-container'>
                            <button onClick={decreaseQuantity} className='quantityButton'>-</button>
                            <h5 className='item-quantity'>{quantity}</h5>
                            <button onClick={increaseQuantity} className='quantityButton'>+</button>
                        </div>
                        <div className='price-delete-con'>
                            <p className='cart-item-proce'>Rs {inRupees} /-</p>
                            <button onClick={onClickRemoveFromCart} className='cross-btn'><FaTrash className='cross-icon' /></button>
                        </div>
                    </div>
                )
            }}
        </cartContext.Consumer>
    )
}

export default CartItem