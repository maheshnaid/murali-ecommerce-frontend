import { Link } from 'react-router-dom'
import Header from '../Header'
import WishlistItem from '../WishlistItem'
import cartContext from '../../context/cartContext'
import Footer from '../FooterComponent'
import './index.css'

import { FaArrowLeftLong } from "react-icons/fa6";

const WishList = () => {

    const renderEmptyWishlistView = () => (
        <div className='wishlist-container'>
            <h1 className='empty-wishlist-heading'>Your Whishlist is Empty</h1>
            <p className='empty-wishlist-note'>Save items that you like in your wishlist</p>
            <Link to="/products"><button className='add-from-bag'>SHOP NOW</button></Link>
        </div>
    )

    const renderWishItems = () => (
        <cartContext.Consumer>
            {value => {
                const {wishList, clearWishList} = value

                const onClickClearWishList = () => (
                    clearWishList()
                )
                
                return (
                    <>
                    <Link to="/products"><FaArrowLeftLong className='cart-left-arrow' /></Link>
                        {wishList.length > 0 ? 
                            <>
                                <div className='wishlist-header'>
                                    <h1 className='wishlist-heading'>Wishlist</h1>
                                    <button onClick={onClickClearWishList} className='clear-wishlist' type='button'>Clear Wishlist</button>
                                </div>
                                <ul className='ul-wishlist-container'>
                                    {wishList.map(each =>(
                                        <WishlistItem wishItemData={each} key={each.id} />
                                    ))}
                                </ul>
                            </>
                        : 
                        renderEmptyWishlistView()
                        }
                    </>
                )
            }}
        </cartContext.Consumer>
    )

    return (
        <>
    <Header />
        <div className='wishlist-page'>
            {renderWishItems()}
        </div>
    </>
    )
}

export default WishList