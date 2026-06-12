import { GoPerson } from "react-icons/go";
import { FaStar } from "react-icons/fa6";

import './index.css'

function Comment(props){
    const { commentDetails } = props
    const {reviewerName, comment, rating} = commentDetails
    const capitalLatter = reviewerName.slice(0,1).toUpperCase()

    return (
        <li className='comment-container'>
            <div className='latter-container'>
                <GoPerson className="person" />
            </div>
            <div className='name-comment-container'>
                <p className='commentater'>{reviewerName}</p>
                <p className='comment'>{comment}</p>
                <div className="customer-review-rating-container">
                    <span className="customer-rating">{rating}</span>
                    <FaStar className="star" />
                </div>
            </div>
        </li>
    )
}

export default Comment