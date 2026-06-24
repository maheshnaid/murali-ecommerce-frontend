import './index.css'
import Header from '../Header'
import Footer from '../FooterComponent'
import { Link } from 'react-router-dom'

const Home = () => (
    <>
        <Header />
        <div className='home-container'>
            <h1 className='ss-home-heading heading'>Clothes That Get You Noticed</h1>
            <img src='https://www.sendcloud.com/wp-content/uploads/2019/11/Reduce_Returns_Fashion.png' className='home-image' alt='Home Image' />
            <div className='home-details-con'>
                <h1 className='ls-home-heading heading'>Clothes That Get You Noticed</h1>
                <p className='home-description'>Discover your style with the latest trends in fashion. From timeless classics to modern essentials, explore outfits that match your vibe and elevate your everyday look.</p>
                <div className='button-container'><Link to='/products'><button className='home-button'>SHOW NOW</button></Link></div>
            </div>
        </div>
        <Footer />
    </>
)

export default Home