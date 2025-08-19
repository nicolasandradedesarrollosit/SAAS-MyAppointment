import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/business/businessHomePage/businessBar.css';

function SectionBar() {
  return (
    <>
      <div className='containerSectionBar'>
        <div className='containerText'>
          <h2 className='titleBar'>
            ¿Listo para optimizar la gestión de turnos en su negocio?
          </h2>
          <span className='subtitleBar'>
            Únase a mas de 1.000 empresas que ya han mejorado su eficiencia con nuestro sistema
          </span>
        </div>
        <div className='containerButton'>
          <Link to={'/register'} className='linkButton1'>
            ¡Registrate ahora Gratis!
          </Link>
          <Link to={'/contact'} className='linkButton2'>
            Consultá por el servicio
          </Link>
        </div>
      </div>
    </>
  )
}

export default SectionBar;