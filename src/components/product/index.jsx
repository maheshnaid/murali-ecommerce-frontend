import './index.css'
import { Link } from 'react-router-dom';
import { TiStar } from "react-icons/ti";


const Product = (props) => {

    const {productDetails} = props
    const {title, price, brand, images = [], rating, id, isFavorite, tags, discountPercentage} = productDetails
    const productImage = images[0]
    const actualPrice = Math.round(price * 100)
    const discountPrice = Math.round(actualPrice - (discountPercentage / 100) * actualPrice)

    
    return (
        <li className='card'>
            <Link className='item' to={`/products/${id}`}>
                <div className='product-card'>
                    <div className='product-image-container'>
                        <img src={productImage} alt='image' className='product-image'/>
                    </div>
                    <div>
                        {brand && <h1 className='pro-brand'>{brand}</h1>}
                        <h1 className='product-name'>{title}</h1>
                        <div className='price-container'>
                            <p className='final-mrp'>Rs. {discountPrice}</p>
                            <p className='mrp'>Rs. {actualPrice}</p>
                            <p className='offer'>{`(${discountPercentage}% OFF)`}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    )
}

export default Product