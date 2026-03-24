import { Link } from 'react-router-dom'
import Header from '../Header'
import WishlistItem from '../WishlistItem'
import cartContext from '../../context/cartContext'
import Fotter from '../Fotter'
import './index.css'


const WishList = () => {

    const renderEmptyWishlistView = () => (
        <div className='wishlist-container'>
            <img src='https://cdni.iconscout.com/illustration/premium/thumb/empty-wishlist-illustration-svg-download-png-9824480.png' alt='wishlist image' className='empty-wishlist-img' />
            <h1 className='empty-wishlist-heading'>Your Whishlist is Empty</h1>
            <p className='empty-wishlist-note'>Save items that you like in your wishlist</p>
            <Link to="/products"><button className='shop-now'>SHOP NOW</button></Link>
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
                        {wishList.length > 0 ? 
                            <>
                                <div className='wishlist-header'>
                                    <h1 className='wishlist-heading'>Wishlist</h1>
                                    <button onClick={onClickClearWishList} className='clear-wishlist' type='button'>Remove All</button>
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
                    <Fotter />
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