import { useContext } from 'react';

import './index.css'
import { Link } from 'react-router-dom';
import { TiStar } from "react-icons/ti";
import { BsHandbagFill, BsHandbag } from "react-icons/bs";
import { IoHeartSharp, IoHeartOutline } from "react-icons/io5";
import { MdShoppingCart } from "react-icons/md";
import cartContext from '../../context/cartContext'

import toast from "react-hot-toast";

const Product = (props) => {

    const {productDetails} = props
    const {title, price, brand, images = [], rating, id, isFavorite, tags, discountPercentage} = productDetails
    const productImage = images[0]
    const actualPrice = Math.round(price * 100)
    const discountPrice = Math.round(actualPrice - (discountPercentage / 100) * actualPrice)

    const { addToCart, addToWishList, cartList, wishList } = useContext(cartContext)
    
    const findwishItem = wishList.find(eachItem => eachItem.id === id)
    const cartItem = cartList.find(eachItem => eachItem.id === id)
    

    const favIcon = findwishItem ? 
    <IoHeartSharp className='img-heart-icon heart-color anime' />
    :<IoHeartOutline className='img-heart-icon anime' />

    const onClickAddToCart = () =>{
        addToCart(productDetails)
            toast.success("Added to Bag", {
            duration:2000,
            position:'bottom-center',
            className:'toast-class',
            icon: <BsHandbagFill className='toast-icon' />,
        });
    }

    return (
        <li className='card'>
            {/* <Link className='item' to={`/products/${id}`}> */}
                <div className='product-card'>
                    <div className='product-image-container'>
                        <Link to={`/products/${id}`}><img src={productImage} alt='image' className='product-image'/></Link>
                        <button onClick={() => addToWishList(productDetails)} className='img-heart-button' type='button'>{favIcon}</button>
                        <button onClick={onClickAddToCart} type='button' className={cartItem ? 'added-to-cart' : 'img-button'}>{!cartItem && <BsHandbag className='btn-bag' />}{cartItem ? 'Added' : 'Bag'}</button>
                    </div>
                    <div className='product-details-container'>
                        {brand && <h1 className='pro-brand'>{brand}</h1>}
                        <h1 className='product-name'>{title}</h1>
                        <div className='price-container'>
                            <p className='final-mrp'>Rs. {discountPrice}</p>
                            <p className='mrp'>Rs. {actualPrice}</p>
                            <p className='offer'>{`(${discountPercentage}% OFF)`}</p>
                        </div>
                    </div>
                </div>
            {/* </Link> */}
        </li>
    )
}

export default Product