import { useState, useEffect } from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom'
import {TailSpin} from 'react-loader-spinner'
import toast from "react-hot-toast";
import './index.css'

import Product from '../product'
import cartContext from '../../context/cartContext';
import Comment from '../Comment'
import UseEffectHook from '../Hooks/useEffectHook'


import { MdShoppingCart } from "react-icons/md";
import { LiaCommentsSolid } from "react-icons/lia";
import { TiStar } from "react-icons/ti";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { GoBookmarkFill } from "react-icons/go";
import { IoCashOutline } from "react-icons/io5";
import { HiArrowPath } from "react-icons/hi2";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { LuPackageCheck } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";


import Header from '../Header'


const apiStatusConstants = {
    initial:'INITIAL',
    progress:'PROGRESS',
    success:'SUCCESS',
    failure:'FAILURE'
}

class SpecificProduct extends Component{

    state = {
        quantity:1,
        selectedProduct:{},
        similarProducts:[],
        apiStatus:apiStatusConstants.initial,
        cartStatus:false
    }

    componentDidMount(){
        this.getSelectedProduct()
    }

    getSelectedProduct = async () => {
        this.setState({apiStatus:apiStatusConstants.progress})
        const {match} = this.props
        const {params} = match
        const selectedId = params.id
        const productApi = `https://dummyjson.com/products/${selectedId}`
        const options = {
            method:'GET'
        }
        const productResponse = await fetch(productApi, options)
        if(productResponse.ok){
            const responseData = await productResponse.json()
            console.log(responseData)
            const similarProductsApi = `https://dummyjson.com/products/category/${responseData.category}`
            const similarProductRes = await fetch(similarProductsApi, options)
            const similaProductsData = await similarProductRes.json()
            console.log(similaProductsData)
            this.setState({
                selectedProduct:responseData, 
                apiStatus:apiStatusConstants.success,
                similarProducts:similaProductsData.products
            })
        }else{
            this.setState({apiStatus:apiStatusConstants.failure})
        }
    }


    increaseQuantity = () => {
        this.setState(prevState => ({quantity:prevState.quantity + 1}))
    }

    onClickRetry = () => {
        this.getSelectedProduct()
    }

    decreaseQuantity = () => {
        const {quantity} = this.state
        if(quantity > 1){
            this.setState(prevState => ({quantity:prevState.quantity - 1}))
        }
    }


    renderSelectedProduct = () => {
        const {selectedProduct, quantity, cartStatus} = this.state
        const {id, availabilityStatus, brand, title, price, description, rating, reviews = [], images = [], discountPercentage, returnPolicy, shippingInformation} = selectedProduct
        const reviewsCount = reviews.length
        const productUrl = images[0]
        const actualPrice = price * 100
        const discountPrice = Math.round(actualPrice - (discountPercentage / 100) * actualPrice)

        return (
            <cartContext.Consumer>
                {value => {
                    const {addToCart, addToWishList, wishList, cartList} = value

                    const favObj = wishList.find(each => each.id === id)
                    const cartObj = cartList.find(each => each.id === id)
                    
                    const isFavObj = favObj === undefined 
                    ? <MdFavoriteBorder className='un-selected heart' />
                    : <MdFavorite className='selected heart' />

                    const Buttontxt = favObj ? 'WISHLISTED' : 'ADD TO WISHLIST'
                    

                    const onClickAddToCart = () => {
                        this.setState(prevState => ({cartStatus:!prevState.cartStatus}))
                        addToCart(selectedProduct,quantity)
                        if(cartObj === undefined){
                            toast.success("Added to bag", {
                            icon: <MdShoppingCart />,
                            duration:2000,
                            position:'bottom-center',
                            className:'toast'
                        });
                        }else{
                            toast.success("item already in your cart! quantity increased by one", {
                            icon: <MdShoppingCart />,
                            duration:2000,
                            position:'bottom-center',
                            className:'toast',
                        });
                        }
                }

                    const onClickAddToWishList = () => {
                        addToWishList(selectedProduct)
                        if(favObj === undefined){
                            toast.success("Added To Wishlist", {
                            icon: "❤️",
                            duration:1500,
                            position:'bottom-center',
                            className:'toast'
                    });
                    }else{
                        toast.success("Product Removed", {
                        icon: <GoBookmarkFill className='bookmark' />,
                        duration:1500,
                        position:'bottom-center',
                        className:'toast'
                    });
                    }
                }
        
                    return(
                    <div className='about-container'>
                        <div className='back-container'>
                            <Link to="/products">
                                <FaArrowLeftLong className='left-arrow' />
                            </Link>
                        </div>
                        <div className='image-container'>
                            <img src={productUrl} alt='imagr' className='specific-product-img' />
                        </div>
                        <div className='specific-product-details'>
                            <h1 className='name'>{title}</h1>
                            {brand && <p className='brand'>{brand}</p>}
                            <div className='price-container'>
                                <p className='final-price'>Rs. {discountPrice}</p>
                                <p className='price'>Rs. {actualPrice}</p>
                                <p className='discount'>{`(${discountPercentage}% OFF)`}</p>
                            </div>
                            <div className='rating-and-reviews-container'>
                                <div className='rating-container'>
                                    <h6 className='product-rating'>{rating}</h6>
                                    <TiStar className='product-rating-icon' />
                                </div>
                                <div className='review-container'>
                                    <LiaCommentsSolid className='product-reviews-icon' />
                                    <h6 className='product-reviews'>{reviewsCount} Reviews</h6>
                                </div>
                            </div>
                            <p className='product-description'>{description}</p>
                            <div className='min-container'>
                                {availabilityStatus === 'In Stock' ? <LuPackageCheck className='in-stock-icon' /> : <HiOutlineExclamationCircle className='low-stock-icon' />}
                                <p className='availability'>Product is Currently {availabilityStatus}</p>
                            </div>
                            <div className='min-container'>
                                <IoCashOutline className='cash-icon' />
                                <p className='pay-on-delivery'>Pay on delivery is available</p>
                            </div>
                            <div className='min-container'>
                                <HiArrowPath className='return-icon' />
                                <p className='return-policy'>Easy {returnPolicy} and exchanges</p>
                            </div>
                            <div className='min-container'>
                                <TbTruckDelivery className='shippng-icon' />
                                <p className='return-policy'>{shippingInformation}</p>
                            </div>
                            <hr className='h-line' />
                            <div className='quantity-container'>
                                <button onClick={this.decreaseQuantity} className='quantity-button'>-</button>
                                <p className='quantity'>{quantity}</p>
                                <button onClick={this.increaseQuantity} className='quantity-button'>+</button>
                            </div>
                            <div className='btn-container'>
                                <button onClick={onClickAddToWishList} className={favObj? 'dill-button btn' : 'dill-button'}>{isFavObj}</button>
                                <button onClick={onClickAddToCart} className='add-toCart'><MdShoppingCart className='bag-icon' /> ADD TO BAG</button>
                                <button onClick={onClickAddToWishList} className={`add-wishlist ${favObj ? 'in' : 'not-in'}`}><MdFavorite className='gunde-icon' />{Buttontxt}</button>
                            </div>
                        </div>
                    </div>
                )
                }}
            </cartContext.Consumer>
        )
    }



    renderAllComments = () => {
        const {selectedProduct} = this.state
        const {reviews = []} = selectedProduct
        
        return (
            <div>
                <h1 className="revies-heading">Reviews</h1>
                <ul className='ul-comments-list'>
                    {reviews.map((each, index) => (
                        <Comment key={index} commentDetails={each} />
                    ))}
                </ul>
            </div>
        )
    }

    renderLodingView = () => (
        <div className='wishlist-loading-container'>
            <TailSpin color='#1a75ff' width='50' height='50' />
        </div>
    )

    renderErrorUi = () => (
        <div className='failure-container'>
            <h1 className='failure-heading'>Opps! Something Went Wrong</h1>
            <p className='failure-note'>There was a problem! We could't find your request. Please Try Again</p>
            <button onClick={this.onClickRetry} className='re-try'>Try Again</button>
        </div>
    )


    renderSimilarProducts = () => {
        const { similarProducts } = this.state
        const limit = similarProducts.slice(0, 10)
        return (
            <div>
                <h1 className='similar-heading'>Similar Products</h1>
                <ul className='simialr-products-container'>
                    {limit?.map(each => (
                        <Product productDetails={each} key={each.id} />
                    ))}
                </ul>
            </div>
        )
    }


    renderSuccessView = () => (
        <div className='specific-product-page'>
            <div>
                {this.renderSelectedProduct()}
                {this.renderSimilarProducts()}
                {this.renderAllComments()}
            </div>
        </div>
    )

    renderProductDetailsUi = () => {
        const {apiStatus} = this.state
        
        switch (apiStatus){
            case apiStatusConstants.progress:
                return this.renderLodingView()
            case apiStatusConstants.success:
                return this.renderSuccessView()
            case apiStatusConstants.failure:
                return this.renderErrorUi()
            default:
                return null
        }
    }

    render(){
        return(
            <>
                <Header />
                <div>
                    {this.renderProductDetailsUi()}
                </div>
            </>
        )
    }  
}


export default SpecificProduct