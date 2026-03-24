import { Link, withRouter } from  'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'
import Cookies from 'js-cookie'
import { useEffect, useContext, useState } from 'react'
import './index.css'

import Popup from 'reactjs-popup'
import { CiLogout } from "react-icons/ci";
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

    const getUserProfile = async () => {
        setApiStatus(apiStatusConstant.loading)
        const profileAPI = 'http://localhost:7000/profile'
        const jwtToken = Cookies.get('jwt_token')
        const options = {
            method:'GET',
            headers:{
                Authorization: `Bearer ${jwtToken}`
            }
        }
        
        const profileResponse = await fetch(profileAPI, options)
        if(profileResponse.ok){
            const profileData = await profileResponse.json()
            setProfile(profileData)
            setApiStatus(apiStatusConstant.success)
        }
    }

    const renderProfileLoader = () => (
        <div>
            <ThreeDots color='#0b69ff' height='20' width='20' />
        </div>
    )

    const renderProfile = () => {
        const {userDetails} = profile

        const firstLatter = userDetails.name.slice(0,1).toUpperCase()
        const remainingLatters = userDetails.name.slice(1).toLowerCase()
        const name = firstLatter + remainingLatters
        
        return (
            <div>
                <p className='hello'>Hello</p>
                <h1 className='user-name'>{name}</h1>
            </div>
        )
}

    const renderApiStatus = () => {
        switch(apiStatus){
            case apiStatusConstant.loading:
                return renderProfileLoader()
            case apiStatusConstant.success:
                return renderProfile()
            default:
                return null
        }
    }


    useEffect(() => {
        getUserProfile()
    }, [])


    const {history} = props
    const {location} = history
    const {pathname} = location
    
    const isHomeActive = pathname === '/' ? 'active' : ''
    const isCartActive = pathname === '/cart' ? 'active' : ''
    const isAboutActive = pathname === '/wishlist' ? 'active' : ''
    const isProductsActive = pathname === '/products' ? 'active' : ''

    const { cartList } = useContext(cartContext)
    // const {name} = profile
    // const fl = name.slice(0,1).toUpperCase()
    // const ll = name.slice(1).toLowerCase()
    // const username = data.name === '' ? 'Loading' : fl + ll

    const number = cartList.length

    return (
    <>
        <nav className='header-con'>
            <div>
                {renderApiStatus()}
            </div>
            <ul className='header-items-con'>
                <li className='link'><Link to='/' className={`nav-item ${isHomeActive}`}>HOME</Link></li>
                <li className='link'><Link to='/products' className={`nav-item ${isProductsActive}`}>PRODUCTS</Link></li>
                <li className='link'><Link to='/wishlist' className={`nav-item ${isAboutActive}`}>WISHLIST</Link></li>
                <li className='link'><Link to='/cart' className={`nav-item ${isCartActive}`}>CART <span className='span-item'>{number > 0 && number}</span></Link></li>
                <Popup
                    trigger={<button className='logout-button' onClick={logoutUser}>Logout</button>}
                    modal
                >
                {close => (
                    <div className='popup-container'>
                         <p className='popup-note'>Are you sure want to Logout</p>
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
                    {renderApiStatus()}
                </div>
                <Popup
                    trigger={<button className='exit-button' onClick={logoutUser}><CiLogout className='nav-icon' /></button>}
                    modal
                >
                {close => (
                    <div className='popup-container'>
                         <p className='popup-note'>Are you sure want to Logout</p>
                         <div className='popup-buttons-container'>
                            <button className='Cancel' onClick={close}>No</button>
                            <button className='Yes' onClick={logoutUser}>Yes</button>
                         </div>
                    </div>
                )}
                </Popup>
            </nav>
    </>
    )
}

export default withRouter(Header)