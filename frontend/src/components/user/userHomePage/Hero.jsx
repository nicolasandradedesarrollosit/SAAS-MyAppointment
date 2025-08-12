import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/user/userHomePage/hero.css';

function Hero() {
  return (
    <>
      <header className='containerHero'>
        <div className='containerTextHero'>
          <h2 className='titleHero'>
            El software de gestión de turnos preferido por los negocios argentinos
          </h2>
          <span className='subtitleHero'>
            Encontrá el servicio que necesitás de forma fácil, rápida y segura
          </span>
          <div className='containerHeroButton'>
            <Link className='heroButton1' to='/register'>Comenzar ahora</Link>
            <Link className='heroButton2' to='/business'>Pagina para negocios</Link>
          </div>
        </div>
        <div className='containerMockUpHero'>

        </div>
      </header>
    </>
  )
}

export default Hero;