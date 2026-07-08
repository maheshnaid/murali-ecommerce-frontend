import { Link, withRouter } from  'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'
import Cookies from 'js-cookie'
import { useEffect, useContext, useState } from 'react'
import './index.css'

import Popup from 'reactjs-popup'
import { FiLogOut } from "react-icons/fi";
import {GoHome, GoHomeFill} from 'react-icons/go'
import { BsHandbagFill, BsHandbag } from "react-icons/bs";
import { TfiLayoutGrid2Alt , TfiLayoutGrid2  } from "react-icons/tfi";
import { IoHeartSharp, IoHeartOutline } from "react-icons/io5";

import cartContext from '../../context/cartContext'

const apiStatusConstant = {
    initial: 'INITIAL',
    loading: 'LOADING',
    success: 'SUCCESS',
}

const Header = (props) => {

    const [profile, setProfile] = useState({})
    const [apiStatus, setApiStatus] = useState(apiStatusConstant.initial)

    const logoutUser = () => {
        const {history} = props 
        Cookies.remove('jwt_token')
        history.replace('/login')
    }


    const {history, match} = props
    const {params} = match
    const {location} = history
    const {pathname} = location
    
    const isHomeActive = pathname === '/' ? <GoHomeFill className='header-icon active' /> : <GoHome className='header-icon in-active' />
    const isWishlistActive = pathname === '/wishlist' ? <IoHeartSharp className='header-icon active' /> : <IoHeartOutline className='header-icon in-active'/>
    const isCartActive = pathname === '/cart' ? <BsHandbagFill className='header-icon active' /> : <BsHandbag className='header-icon in-active' />
    const isProductsActive = pathname === '/products' ? <TfiLayoutGrid2Alt className='header-icon active' /> : <TfiLayoutGrid2 className='header-icon in-active' />

    const { cartList, wishList } = useContext(cartContext)
    const number = cartList.length
    const wishListLen = wishList.length

    return (
    <>
        <nav className='header-con'>
            <div>
                <img src='https://t4.ftcdn.net/jpg/08/16/83/55/360_F_816835548_Bb5h4u3Kku6kB5m1cDj4wszyvaIV3abW.jpg' className='header-logo' alt='logo' />
            </div>
            <ul className='header-items-con'>
                <li className='link'><Link to='/' className={`nav-item ${pathname === '/' ? 'active' : 'in-active'}`}>{isHomeActive}HOME</Link></li>
                <li className='link'><Link to='/products' className={`nav-item ${pathname === '/products' ? 'active' : 'in-active'}`}>{isProductsActive}PRODUCTS</Link></li>
                <li className='link'><Link to='/wishlist' className={`nav-item ${pathname === '/wishlist' ? 'active' : 'in-active'}`}>{isWishlistActive}WISHLIST <span className={wishListLen > 0 ? 'wish-list-count' : ''}>{wishListLen > 0 && wishListLen}</span></Link></li>
                <li className='link'><Link to='/cart' className={`nav-item ${pathname === '/cart' ? 'active' : 'in-active'}`}>{isCartActive}BAG<span className={number > 0 ? 'span-item' : ''}>{number > 0 && number}</span></Link></li>
                <Popup
                    trigger={<button className='logout-button'>Logout</button>}
                    modal
                >
                {close => (
                    <div className='popup-container'>
                         <p className='popup-note'>Are you sure want to Logout?</p>
                         <div className='popup-buttons-container'>
                            <button className='Cancel' onClick={close}>No</button>
                            <button className='Yes' onClick={logoutUser}>Yes</button>
                         </div>
                    </div>
                )}
                </Popup>
            </ul>
        </nav>
            <nav className='nav-container'>
                <div>
                   <img src='https://t4.ftcdn.net/jpg/08/16/83/55/360_F_816835548_Bb5h4u3Kku6kB5m1cDj4wszyvaIV3abW.jpg' className='header-logo' alt='logo' />
                </div>
                <div className='bag-wishlist-container'>
                    {pathname === `/products/${params.id}` && <p className='link'><Link to='/wishlist' className={`nav-item ${pathname === '/wishlist' ? 'active' : 'in-active'}`}>{isWishlistActive}WISHLIST <span className={wishListLen > 0 ? 'wish-list-count' : ''}>{wishListLen > 0 && wishListLen}</span></Link></p>}
                    {pathname === `/products/${params.id}` && <p className='link'><Link to='/cart' className={`nav-item ${pathname === '/cart' ? 'active' : 'in-active'}`}>{isCartActive}BAG<span className={number > 0 ? 'span-item' : ''}>{number > 0 && number}</span></Link></p>}
                    {pathname === `/wishlist` && <p className='link'><Link to='/cart' className={`nav-item in-active`}>{isCartActive}BAG<span className={number > 0 ? 'span-item' : ''}>{number > 0 && number}</span></Link></p>}
                    {pathname === `/cart` && <p className='link'><Link to='/wishlist' className={`nav-item in-active`}>{isWishlistActive}WISHLIST <span className={wishListLen > 0 ? 'wish-list-count' : ''}>{wishListLen > 0 && wishListLen}</span></Link></p>}
                    <Popup
                        trigger={<button className='exit-button'><FiLogOut className='logout-icon' /></button>}
                        modal
                    >
                    {close => (
                        <div className='popup-container'>
                            <p className='popup-note'>Are you sure want to Logout?</p>
                            <div className='popup-buttons-container'>
                                <button className='Cancel' onClick={close}>No</button>
                                <button className='Yes' onClick={logoutUser}>Yes</button>
                            </div>
                        </div>
                    )}
                    </Popup>
                </div>
            </nav>
    </>
    )
}

export default withRouter(Header)