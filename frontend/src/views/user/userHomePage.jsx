import React from 'react';
import Hero from '../../components/user/userHomePage/Hero';
import SectionStats from '../../components/user/userHomePage/SectionStats';
import SectionFeatures from '../../components/user/userHomePage/SectionFeatures';
import SectionFAQ from '../../components/user/userHomePage/SectionFAQ';
import Footer from '../../components/user/userHomePage/Footer';
import '../../styles/user/userHomePage/userHomePage.css'





function UserHomePage() {
  return (
    <>
      <div className='containerUserHomePage'>
        <div className='containerUserHomePageHero'>
          <Hero />
        </div>
        <div className='containerUserHomeMain'>
          <SectionStats />
          <SectionFeatures />
          <SectionFAQ />
        </div>
        <div className='containerUserHomeFooter'>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default UserHomePage;