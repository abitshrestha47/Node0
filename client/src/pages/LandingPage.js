import React from 'react'
import LandingImage from '../../src/Images/Landing.png';
import music0 from '../../src/Images/music0.png'
import music1 from '../../src/Images/music1.png'
import music2 from '../../src/Images/music2.png'

const LandingPage = () => {
    return (
        <div className='landing-container'>
            <div className='content'>
                <h1>Welcome to Our Website</h1>
                <p>Explore our amazing products and services. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <button>Get Started</button>
            </div>
            <div className="image" style={{position:'relative'}}>
                <img src={LandingImage} alt='landingImage'/>
                <img src={music0} className='music0' alt='landingImage'/>
                <img src={music1} className='music1' alt='landingImage'/>
                <img src={music2} className='music2' alt='landingImage'/>
            </div>
        </div>
    )
}

export default LandingPage