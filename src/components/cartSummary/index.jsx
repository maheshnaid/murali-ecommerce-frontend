import cartContext from '../../context/cartContext'
import './index.css'

const CartSummary = () => (
    <cartContext.Consumer>
        {value => {
            
            const {cartList} = value
            const totalPrice = cartList.reduce((a, b, c) => {
                if(b.isSelected === true){
                    a = a + Math.ceil(b.price) * b.quantity * 100
                }
                return a 
            }, 0)

            return (
                <div className='cart-summary-container'>
                    <div className='summary'>
                        <h1 className='total-order'>Order Total : <span className='total-price'>{totalPrice} /-</span></h1>
                        <button className='order-button'>PLACE ORDER</button>
                    </div>
                </div>
            )
        }}
    </cartContext.Consumer>
)

export default CartSummary