import { Link } from 'react-router-dom'
import { Component } from 'react';
import {TailSpin} from 'react-loader-spinner'
import { FaArrowLeftLong } from "react-icons/fa6";
import './index.css'

import Product from '../product'
import cartContext from '../../context/cartContext';

import { LiaCommentsSolid } from "react-icons/lia";
import { TiStar } from "react-icons/ti";

import Header from '../Header'

const apiStatusConstants = {
    initial:'INITIAL',
    loading:'LOADING',
    success:'SUCCESS',
    failure:'FAILURE'
}

class SpecificProduct extends Component{

    state = {
        specificProduct:{},
        simillrProducts:[],
        quantity:1,
        apiStatus:apiStatusConstants.initial
    }
 
    componentDidMount(){
        this.getProductData()
    }

    increaseQuantity = () => {
        this.setState(presState => ({
            quantity:presState.quantity + 1
        }))
    }

    onClickRetry = () => (
        this.getProductData()
    )

    decreaseQuantity = () => {
        const {quantity} = this.state 

        if(quantity > 1){
            this.setState(presState => ({
            quantity:presState.quantity - 1
            }))
        }
    }

    getProductData = async () => {
        this.setState({
            apiStatus:apiStatusConstants.loading
        })
        const {match} = this.props
        const {params} = match
        const selectedId = params.id

        const api = `https://dummyjson.com/products/${selectedId}`
        const options = {
            method:'GET'
        }
        const productResponse = await fetch(api, options)
        if(productResponse.ok){
            this.setState({apiStatus:apiStatusConstants.success})
            const productData = await productResponse.json()
            const selectedCategory = productData.category
            const categoryAPi = `https://dummyjson.com/products/category/${selectedCategory}`
            const categoryResponse = await fetch(categoryAPi, options)
            const categoryData = await categoryResponse.json()
            this.setState({
                specificProduct:productData,
                simillrProducts:categoryData.products.slice(0,5)
            })
        }else{
            this.setState({apiStatus:apiStatusConstants.failure})
        }
    }

    renderSelectedProduct = () => {
        const {specificProduct, quantity} = this.state
        const {availabilityStatus, brand, title, price, description, rating, reviews = [], images = []} = specificProduct
        const inRupees = Math.ceil(price) * 100
        const reviewsCount = reviews.length
        const productUrl = images[0]


        return (
            <cartContext.Consumer>
                {value => {
                    const {addToCart, addToWishList} = value

                    const onClickAddToCart = () => {
                        addToCart(specificProduct,quantity)
                    }

                    const onClickAddToWishList = () => {
                        addToWishList(specificProduct)
                    }
        
                    return(
                    <div className='about-container'>
                        <Link to="/products">
                            <FaArrowLeftLong className='left-arrow' />
                        </Link>
                        <div className='image-container'>
                            <img src={productUrl} alt='imagr' className='specific-product-img' />
                        </div>
                        <div className='specific-product-details'>
                            <h1 className='name'>{title}</h1>
                            <h3 className='price'>Rs {inRupees} /-</h3>
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
                            <h1 className='available'>Available : <span className='Available'>{availabilityStatus}</span></h1>
                            {brand && <h1 className='brand'>Brand : <span className='Brand'>{brand}</span></h1>}
                            <hr className='h-line' />
                            <div className='quantity-container'>
                                <button onClick={this.decreaseQuantity} className='quantity-button'>-</button>
                                <p className='quantity'>{quantity}</p>
                                <button onClick={this.increaseQuantity} className='quantity-button'>+</button>
                            </div>
                            <button onClick={onClickAddToCart} className='add-toCart'>ADD TO CART</button>
                            <button onClick={onClickAddToWishList} className='add-wishlist'>ADD TO WISHLIST</button>
                        </div>
                    </div>
                )
                }}
            </cartContext.Consumer>
        )
    }

    renderSimillarProducts = () => {
        const {simillrProducts} = this.state
        
        return (
            <div className='simillar-product-container'>
                <h1 className='similar-heading'>Similar Products</h1>
                <ul className='simillar-product-list'>
                    {simillrProducts.map(each => (
                        <Product productDetails={each} key={each.id}/>
                    ))}
                </ul>
            </div>
        )
    }

    renderLodingView = () => (
        <div className='loading-container'>
            <TailSpin color='#0b69ff' width='50' height='50' />
        </div>
    )

    renderErrorUi = () => (
        <div className='error-container'>
            <img src='https://media.istockphoto.com/id/1279275963/vector/system-error-concept.jpg?s=612x612&w=0&k=20&c=c0IkhU0L53Jrvl2AombUcG1aI3-FnXa8f1oH-TMC5vM=' className='error-image' alt='error image' />
            <h1 className='error-heading'>Opps! Something Went Wrong</h1>
            <p className='error-note'>There was a problem! We could't find your request. Please Try Again</p>
            <button onClick={this.onClickRetry} className='try-again'>Try Again</button>
        </div>
    )


    renderSuccessView = () => (
        <div className='specific-product-page'>
            {this.renderSelectedProduct()}
            {this.renderSimillarProducts()}
        </div>
    )

    renderProductDetailsUi = () => {
        const {apiStatus} = this.state

        switch (apiStatus){
            case apiStatusConstants.loading:
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