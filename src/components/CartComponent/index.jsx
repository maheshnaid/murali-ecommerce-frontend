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

                const totalPrice = cartList.reduce((a, b, c) => {
                    if(b.isSelected){
                        a = a + Math.ceil(b.price) * b.quantity * 100
                    }
                    return a 
                }, 0)

                return (
                    <div className='cart'>
                        <div style={{padding:'12px'}}>
                            <div className='checkbox-clearall-button'>
                                <div className='items-amount-con'>
                                    <div>
                                        <input className='checkbox' checked={allSelected} onChange={onChangeAllSelected} type='checkbox' id='checkbox' />
                                        <label className='check-label' htmlFor='checkbox'>{noOfSelectedItem}/{cartLength} ITEMS SELECTED</label>
                                    </div>
                                    <p className='amount'>{`(₹${totalPrice})`}</p>
                                </div>
                                <button onClick={onClickClearCart} className='clear-button'>Clear Bag</button>
                            </div>
                            <ul className='ul-cart-list'>
                                {cartList.map(each => (
                                    <CartItem cartItemDetails={each} key={each.id} />
                                ))}
                            </ul>
                        </div>
                    </div>
                )
            }}
        </cartContext.Consumer>
    )

    const renderEmptyCartView = () => (
        <div className='empty-cart-container'>
            <h1 className='empty-cart-heading'>Your bag is feeling little empty</h1>
            <p className='empty-cart-note'>There is nothing in your bag. lets add some items.</p>
            <Link to='/wishlist'><button className='add-from-wishlist'>ADD ITEMS FROM WISHLIST</button></Link>
        </div>
    )

    const renderCartView = () => (
        <cartContext.Consumer>
            {value => {
                const {cartList} = value 

                return (
                    cartList.length > 0 ? renderCartList() : renderEmptyCartView()
                )
            }}
        </cartContext.Consumer>
    )

    const renderCartPage = () => {
        return (
            <>
                <div className='cart-page'>
                    <div className='go-back'>
                        <Link to='/products'><FaArrowLeftLong className='cart-left-arrow' /></Link>
                        <h1 className='my-cart'>Bag</h1>
                    </div>
                    {renderCartView()}
                </div>
                <CartSummary />
            </>
        )
    }

    return (
        <>
            <Header />
            <div className='cart'>
                {renderCartPage()}
            </div>
        </>
    )
}

export default Cart