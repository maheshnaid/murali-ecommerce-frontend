import { Link, withRouter } from  'react-router-dom'
import { useContext } from 'react'
import cartContext from '../../context/cartContext'
import './index.css'


import { GoHome, GoHomeFill  } from "react-icons/go";
import { LiaHomeSolid } from "react-icons/lia";
import { BsHandbagFill, BsHandbag } from "react-icons/bs";
import { TfiLayoutGrid2Alt , TfiLayoutGrid2  } from "react-icons/tfi";
import { IoHeartSharp, IoHeartOutline } from "react-icons/io5";


const Footer = (props) => {
    const {history} = props
    const {location} = history
    const {pathname} = location
    
    const isHomeActive = pathname === '/' ? <GoHomeFill className='navicon active-tab' /> : <GoHome className='navicon inActive-tab' />
    const isProductsActive = pathname === '/products' ? <TfiLayoutGrid2Alt className='navicon active-tab' /> : <TfiLayoutGrid2 className='navicon inActive-tab' />
    const isFavActive = pathname === '/wishlist'? <IoHeartSharp className='navicon active-tab' /> : <IoHeartOutline className='navicon inActive-tab' />
    const isCartActive = pathname === '/cart' ? <BsHandbagFill className='navicon active-tab' /> : <BsHandbag className='navicon inActive-tab' />


    const {wishList, cartList} = useContext(cartContext)
    const cartLen = cartList.length
    const wishListLen = wishList.length

    return (
        <ul className='fotter-container'>
            <li className='list-item'><Link to='/' className={`nav-link ${pathname === '/' ? 'active-link' : 'inActive-link'}`}>{isHomeActive}Home</Link></li>
            <li className='list-item'><Link to='/products' className={`nav-link ${pathname === '/products' ? 'active-link' : 'inActive-link'}`}>{isProductsActive}Products</Link></li>
            <li className='list-item'><Link to='/wishlist' className={`nav-link ${pathname === '/wishlist' ? 'active-link' : 'inActive-link'}`}>{isFavActive}Wishlist<span className={wishListLen > 0 ? 'heart-count' : ''}>{wishListLen > 0 && wishListLen}</span></Link></li>
            <li className='list-item'><Link to='/cart' className={`nav-link ${pathname === '/cart' ? 'active-link' : 'inActive-link'}`}>{isCartActive}Bag<span className={cartLen > 0 ? 'bag-count' : ''}>{cartLen > 0 && cartLen}</span></Link></li>
        </ul>
    )
}

export default withRouter(Footer)