import './index.css'
import { RxCross2 } from "react-icons/rx";
import cartContext from '../../context/cartContext';
import toast from 'react-hot-toast';
import { IoMdCart } from "react-icons/io";
import { FaHeartBroken } from "react-icons/fa";

const WishlistItem = (props) => {
    const {wishItemData} = props
    const {images, title, brand, id} = wishItemData
    const productImg = images[0]

    return(
        <cartContext.Consumer>
            {value => {
                const {addToCartFromWishlist, removeFromWishList} = value

                const quantity = 1
                const onClickMoveToCart = () => {
                    addToCartFromWishlist(wishItemData, quantity)
                    toast.success('Moved To Bag',{
                        icon: <IoMdCart className='mdCart-icon' />,
                        duration:1500,
                        position:'bottom-center',
                        className:'toast'
                    })
                }

                const onClickCrossBtn = () => {
                    removeFromWishList(id)
                    toast.success('Removed From Wishlist',{
                        icon: <FaHeartBroken className='mdHeart' />,
                        duration:1500,
                        position:'bottom-center',
                        className:'toast'
                    })
                }

                return (
                    <div className='wish-item-container'>
                        <div className='product-image-container'>
                            <img src={productImg} className='product-image' alt='product image' />
                        </div>
                        <h1 className='wishlist-item-name'>{title}</h1>
                        <h1 className='wishlist-item-brand' >{brand ? brand : ''}</h1>
                        <div className='buttons-container'>
                            <button type='button' onClick={onClickMoveToCart} className='move-to-cart'>Move To Bga</button>
                            <button type='button' onClick={onClickCrossBtn} className='remove-from-cart'>Remove</button>
                        </div>
                    </div>
                )
            }}
        </cartContext.Consumer>
    )
}

export default WishlistItem