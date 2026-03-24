import './index.css'
import { RxCross2 } from "react-icons/rx";
import cartContext from '../../context/cartContext';

const WishlistItem = (props) => {
    const {wishItemData} = props
    const {images, title, brand, id} = wishItemData
    const productImg = images[0]

    return(
        <cartContext.Consumer>
            {value => {
                const {addToCart, removeFromWishList} = value

                const quantity = 1
                const onClickMoveToCart = () => {
                    addToCart(wishItemData, quantity)
                }

                const onClickCrossBtn = () => (
                    removeFromWishList(id)
                )

                return (
                    <div className='wish-item-container'>
                        <div className='product-image-container'>
                            <img src={productImg} className='product-image' alt='product image' />
                        </div>
                        <h1 className='wishlist-item-name'>{title}</h1>
                        <h1 className='wishlist-item-brand' >{brand ? brand : ''}</h1>
                        <div className='buttons-container'>
                            <button type='button' onClick={onClickMoveToCart} className='move-to-cart'>MOVE TO CART</button>
                            <button type='button' onClick={onClickCrossBtn} className='move-to-cart'>Remove</button>
                        </div>
                    </div>
                )
            }}
        </cartContext.Consumer>
    )
}

export default WishlistItem