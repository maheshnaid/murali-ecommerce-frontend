import { Link, withRouter } from  'react-router-dom'
import './index.css'

import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdStorefront } from "react-icons/md";
import { GrFavorite } from "react-icons/gr";

const Fotter = (props) => {
    const {history} = props
    const {location} = history
    const {pathname} = location
    
    const isHomeActive = pathname === '/' ? 'active-path' : ''
    const isProductsActive = pathname === '/products' ? 'active-path' : ''
    const isFavActive = pathname === '/wishlist' ? 'active-path' : ''
    const isCartActive = pathname === '/cart' ? 'active-path' : ''

    return (
        <nav className='fotter-container'>
            <Link to='/'><AiOutlineHome className={`navicon ${isHomeActive}`} /></Link>
            <Link to='/products'><MdStorefront className={`navicon ${isProductsActive}`} /></Link>
            <Link to='/wishlist'><GrFavorite className={`navicon ${isFavActive}`} /></Link>
            <Link to='/cart'><AiOutlineShoppingCart className={`navicon ${isCartActive}`} /></Link>
        </nav>
    )
}

export default withRouter(Fotter)