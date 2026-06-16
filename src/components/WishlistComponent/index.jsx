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
                    <div className='wishlist-page'>
                        <div className='wishlist-header'>
                            <div className='wishlist-back-container'>
                                <Link to="/products"><FaArrowLeftLong className='wishlist-left-arrow' /></Link>
                                <h1 className='wishlist-heading'>Wishlist</h1>
                            </div>
                            {wishList.length > 0 && <button onClick={onClickClearWishList} className='clear-wishlist' type='button'>Clear Wishlist</button>}
                        </div>
                        {wishList.length > 0 ? 
                            <>
                                <ul className='ul-wishlist-container'>
                                    {wishList.map(each =>(
                                        <WishlistItem wishItemData={each} key={each.id} />
                                    ))}
                                </ul>
                            </>
                        : 
                        renderEmptyWishlistView()
                        }
                    </div>
                )
            }}
        </cartContext.Consumer>
    )

    return (
        <>
    <Header />
        <>
            {renderWishItems()}
        </>
    </>
    )
}

export default WishList