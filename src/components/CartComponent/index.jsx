import './index.css'
import Header from '../Header'
import Footer from '../FooterComponent'
import cartContext from '../../context/cartContext'
import CartItem from '../cartItem'
import CartSummary from '../cartSummary'
import { Link } from 'react-router-dom'

import { MdDelete } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";

const Cart = () => {

    const renderCartList= () => (
        <cartContext.Consumer>
            {value => {
                const {cartList, clearCart, changeAllSelectedStatus, allSelected} = value

                const cartLength = cartList.length
                const list = cartList.filter(each => each.isSelected === true)
                const noOfSelectedItem = list.length


                const onClickClearCart = () => (
                    clearCart()
                )

                const onChangeAllSelected = () => (
                    changeAllSelectedStatus()
                )

                return (
                    <div className='your-cart'>
                        <div>
                            <h1 className='my-cart'>Bag</h1>
                            <div className='clear-all-button-container'>
                                <div>
                                    <input className='checkbox' checked={allSelected} onChange={onChangeAllSelected} type='checkbox' id='checkbox' />
                                    <label className='label' htmlFor='checkbox'>{noOfSelectedItem}/{cartLength} ITEMS SELECTED</label>
                                </div>
                                <button onClick={onClickClearCart} className='clear-button'>Clear Bag</button>
                            </div>
                            <ul className='ul-cart-list'>
                                {cartList.map(each => (
                                    <CartItem cartItemDetails={each} key={each.id} />
                                ))}
                            </ul>
                        </div>
                       <CartSummary />
                    </div>
                )
            }}
        </cartContext.Consumer>
    )

    const renderEmptyCartView = () => (
        <div className='empty-cart-container'>
            <h1 className='empty-cart-heading'>Your cart is feeling little empty</h1>
            <p className='empty-cart-note'>There is nothing in your bag. lets add some items.</p>
            <Link to='/wishlist'><button className='add-to-cart'>ADD ITEMS FROM WISHLIST</button></Link>
        </div>
    )

    const renderCartPage = () => (
        <cartContext.Consumer>
            {value => {
                const {cartList} = value 

                return (
                    cartList.length > 0 ? renderCartList() : renderEmptyCartView()
                )
            }}
        </cartContext.Consumer>
    )

    return (
        <>
            <Header />
            <div className='cart'>
                <Link to='/products'><FaArrowLeftLong className='cart-left-arrow' /></Link>
                {renderCartPage()}
            </div>
        </>
    )
}

export default Cart