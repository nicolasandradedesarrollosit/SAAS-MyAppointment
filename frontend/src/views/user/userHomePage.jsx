import React from 'react';
import Hero from '../../components/user/userHomePage/Hero';
import SectionStats from '../../components/user/userHomePage/SectionStats';
import SectionFeatures from '../../components/user/userHomePage/SectionFeatures';
import SectionFAQ from '../../components/user/userHomePage/SectionFAQ';
import Footer from '../../components/others/Footer';
import '../../styles/user/userHomePage/userHomePage.css';




function UserHomePage() {
  return (
    <>
      <section className='containerUserHomePage'>
        <header className='containerUserHomePageHero'>
          <Hero />
        </header>
        <main className='containerUserHomeMain'>
          <SectionStats />
          <SectionFeatures />
          <SectionFAQ />
        </main>
        <section className='containerUserHomeFooter'>
          <Footer />
        </section>
      </section>
    </>
  )
}

export default UserHomePage;