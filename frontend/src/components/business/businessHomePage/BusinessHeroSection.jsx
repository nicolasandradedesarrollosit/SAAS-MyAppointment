import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/business/businessHomePage/businessHeroSection.css';

function BusinessHeroSection() {
  const [style, setStyle] = useState({});

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);

    const rotX = (y / height) * 10;
    const rotY = (-x / width) * 10;

    setStyle({
      transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.05)`,
      transition: 'transform 0.1s ease',
      willChange: 'transform'
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'rotateX(0deg) rotateY(0deg) scale(1)',
      transition: 'transform 0.6s ease'
    });
  };

  return (
    <>
      <div className='containerHeroSection'>
        <div className='containerHeroText'>
          <div className='containerTitleHeroBusiness'>
            <h2 className='titleHeroBusiness'>My Appointment</h2>
          </div>
          <div className='containerSubtitleHeroBusiness'>
            <span className='subtitleHeroBusiness'>
              Un sistema transparente, sin comisiones por cliente, que se preocupa en tu futuro
            </span>
          </div>
        </div>

        <div className='containerButtonsBusiness'>
          <Link className='button1' to='/register'>¡Registrate ahora Gratis!</Link>
          <Link className='button2' to='/contact'>Consultá por el servicio</Link>
        </div>

        <div
          className='containerContentHero'
          style={{ perspective: '1000px' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className='containerMockUp' style={style}>
            <img
              className='imageSoftwareProduction'
              src="/tu-imagen-real.jpg"
              alt="Imagen del software en funcionamiento"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default BusinessHeroSection;
