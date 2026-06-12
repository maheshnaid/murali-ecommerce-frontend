import cartContext from '../../context/cartContext'
import { withRouter } from 'react-router-dom'
import { use, useState } from 'react'
import toast from 'react-hot-toast'
import './index.css'

import { TailSpin } from 'react-loader-spinner'

import { MdKeyboardArrowDown, MdKeyboardArrowUp  } from "react-icons/md";
import { BiSolidError } from "react-icons/bi";

const CartSummary = (props) => {

    const [spinnerValue, setSpinnerValue] = useState(false)
    const [showSummary, setShowSummary] = useState(false)

    const arrowStatus = showSummary ? <MdKeyboardArrowUp className='arrow-icon' /> : <MdKeyboardArrowDown className='arrow-icon' />

    return (
        <cartContext.Consumer>
            {value => {
                
                const {cartList, placeOrder} = value
                const totalPrice = cartList.reduce((a, b, c) => {
                    if(b.isSelected === true){
                        a = a + Math.ceil(b.price) * b.quantity * 100
                    }
                    return a 
                }, 0)

                const afterDiscountPrice = cartList.reduce((a, b) => {
                    if(b.isSelected){
                        a = a + Math.round(b.price - (b.discountPercentage / 100) * b.price)
                    }
                    return a
                }, 0)

                const onClickPlaceOrder = () => {
                    setSpinnerValue(true)

                    const checkItems = cartList.some(item => item.isSelected === true)
                    if(!checkItems){
                        setSpinnerValue(false)
                        toast.error("Please Select Atleast One Item", {
                            icon:<BiSolidError className='biError' />,
                            duration:1500,
                            position:'bottom-center',
                    });
                    }else{
                        setTimeout(() => {
                        placeOrder();
                        setSpinnerValue(false);
                        const { history } = props;
                        history.replace('/success');
                    },2000)
                    }
                }

                const onClickArrow = () => {
                    setShowSummary(!showSummary)
                }


                return (
                    <div className='cart-summary-container'>
                        <button onClick={onClickArrow} className='show-summary-button'>summary {arrowStatus}</button>
                        <div className='summary' style={{display:showSummary ? 'block' : 'none'}}>
                            <p className='total-price'>Total Price : Rs.{totalPrice}</p>
                            <p className='after-discount-price'>After Discount Price : <span style={{color:'#00b300'}}>Rs.{totalPrice - afterDiscountPrice}</span>  <span style={{textDecoration:'line-through', color:'#737373'}}>Rs. {totalPrice}</span></p>
                            <p className='saved'>You saved : <span style={{color:'#00b300'}}>Rs.{afterDiscountPrice}</span></p>
                        </div>
                        <button onClick={onClickPlaceOrder} className='order-button'>{spinnerValue ? <TailSpin color='#ffffff' height='20' width='20' /> : 'Place Order'}</button>
                    </div>
                )
            }}
        </cartContext.Consumer>
    )
}

export default withRouter(CartSummary)