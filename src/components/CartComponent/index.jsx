import './index.css'
import Header from '../Header'
import Fotter from '../Fotter'
import cartContext from '../../context/cartContext'
import CartItem from '../cartItem'
import CartSummary from '../cartSummary'
import { Link } from 'react-router-dom'

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
                    <div style={{width: `100%`}}>
                        <h1 className='my-cart'>My Cart</h1>
                        <div className='clear-all-button-container'>
                            <div>
                                <input className='checkbox' checked={allSelected} onChange={onChangeAllSelected} type='checkbox' id='checkbox' />
                                <label className='label' htmlFor='checkbox'>{noOfSelectedItem}/{cartLength} ITEMS SELECTED</label>
                            </div>
                            <button onClick={onClickClearCart} className='clear-button'>Clear All</button>
                        </div>
                        <ul className='ul-cart-list'>
                            {cartList.map(each => (
                                <CartItem cartItemDetails={each} key={each.id} />
                            ))}
                        </ul>
                        <CartSummary />
                    </div>
                )
            }}
        </cartContext.Consumer>
    )

    const renderEmptyCartView = () => (
        <div className='empty-cart-container'>
            <img src='https://img.freepik.com/premium-vector/empty-cart-illustration-perfect-user-interface-uiux-projects_854078-2080.jpg' alt='empty cart' className='empty-cart-img' />
            <h1 className='empty-cart-heading'>Your cart is feeling little empty</h1>
            <p className='empty-cart-note'>There is nothing in your bag. lets add some items.</p>
            <Link to='/products'><button className='shop-now'>SHOP NOW</button></Link>
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
                {renderCartPage()}
            </div>
            <Fotter />
        </>
    )
}

export default Cart