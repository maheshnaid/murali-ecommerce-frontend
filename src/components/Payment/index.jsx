import { useState } from 'react';
import './index.css'
import cartContext from '../../context/cartContext'
import { GiConfirmed } from "react-icons/gi";
import { TailSpin } from 'react-loader-spinner'


function PaymentComponent(props){

    const [successLoading, setSuccessLoading] = useState(false)

    const { history } = props

    const onClickContineuShopping = () => {
        history.replace('/products')
    }

    const renderLodingView = () => (
        <div className='loading-container'>
            <TailSpin color='#4d79ff' width='30' height='30' />
            <p className='wait'>Plaese Wait a Moment..!</p>
        </div>
    )

    setTimeout(() => {
        setSuccessLoading(true)
    }, 8000)

    return (
        <div className='payment-page'>
            {successLoading ? 
                <div className='payment-card'>
                    <GiConfirmed className='success-icon' />
                    <h1 className='thank-you'>Thank You.!</h1>
                    <h1 className='order-placed'>Your Order Has Been Placed</h1>
                    <button onClick={onClickContineuShopping} className='continue-shopping'>Continue Shopping</button>
                </div>
                : renderLodingView()
            }
        </div>
    )
}

export default PaymentComponent