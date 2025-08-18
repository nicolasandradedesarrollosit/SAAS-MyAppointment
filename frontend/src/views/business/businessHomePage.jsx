import React from 'react';;
import '../../styles/business/businessHomePage/businessHomePage.css';
import BusinessHeroSection from '../../components/business/businessHomePage/BusinessHeroSection.jsx';
import SectionFeatures from '../../components/business/businessHomePage/BusinessFeaturesSection.jsx';
import SectionPayments from '../../components/business/businessHomePage/BusinessSectionPayment.jsx';
import SectionOpinions from '../../components/business/businessHomePage/BusinessSectionOpinions.jsx';
import SectionBar from '../../components/business/businessHomePage/BusinessBarGoToPlans.jsx'
// import SectionFAQ from '../../components/business/SectionFAQBusiness.jsx'
import Footer from '../../components/others/Footer.jsx';


function BusinessHomePage() {
  return (
    <>
      <section className='containerBusinessHomePage'>
        <header className='containerHeroBusinessPage'>
          <BusinessHeroSection />
        </header>
        <main className='containerContentBusinessPage'>
          <SectionFeatures />
          <SectionPayments />
          <SectionOpinions />
          <SectionBar />
          {/* <SectionFAQ /> */}
        </main>
        <section className='containerFooterBusinessPage'>
          <Footer />
        </section>
      </section>
    </>
  )
}

export default BusinessHomePage;