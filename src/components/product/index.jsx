import './index.css'
import { Link } from 'react-router-dom';
import { TiStar } from "react-icons/ti";
const Product = (props) => {
    const {productDetails} = props
    const {title, price, brand, images = [], rating, id, isFavorite, tags} = productDetails
    const productImage = images[0]
    const inRupees = Math.ceil(price) * 100

    return (
        <li>
            <Link className='item' to={`/products/${id}`}>
                <div className='product-card'>
                    <div className='product-image-container'>
                        <img src={productImage} alt='image' className='product-image'/>
                    </div>
                    <div>
                        {brand ? <h1 className='pro-brand'>{brand}</h1> : ''}
                        <h1 className='product-name'>{title}</h1>
                        <div className='product-details-container'>
                            <h1 className='product-price'>Rs. {inRupees}</h1>
                            <div className='price-rating-container'>
                                <span className='product-ratings'>{rating}</span>
                                <TiStar className='star-icon' />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    )
}

export default Product