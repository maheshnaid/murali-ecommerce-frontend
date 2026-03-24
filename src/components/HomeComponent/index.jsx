import './index.css'
import Header from '../Header'
import Fotter from '../Fotter'
import { Link } from 'react-router-dom'

const Home = () => (
    <>
        <Header />
        <div className='home-container'>
            <img src='https://www.sendcloud.com/wp-content/uploads/2019/11/Reduce_Returns_Fashion.png' className='home-image' alt='Home Image' />
            <div className='home-details-con'>
                <h1 className='home-heading'>Upgrade Your Style Today</h1>
                <p className='home-description'>Discover your style with the latest trends in fashion. From timeless classics to modern essentials, explore outfits that match your vibe and elevate your everyday look.</p>
                <div className='button-container'><Link to='/products'><button className='home-button'>SHOW NOW</button></Link></div>
            </div>
        </div>
        <Fotter />
    </>
)

export default Home