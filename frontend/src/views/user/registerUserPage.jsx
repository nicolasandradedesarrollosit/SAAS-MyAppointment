import React from 'react';
import { Link } from 'react-router-dom';
import GoBack from '../../components/others/GoBack';
import '../../styles/user/userRegisterPage/registerUserPage.css';

function UserRegisterPage() {
  return (
    <>
      <section className='containerAllRegister'>
        <GoBack dominio='/' />
        <section className='mainContainerRegisterSection'>
          <h2 className='titleSection'>
            Regístrate
          </h2>
          <div className='containerRedirection'>
            <div className='containerLink'>
              <div className='containerButtonSVG'>
                <Link className='buttonRegister' to={'business'}>Negocios</Link>
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div>
                <span className='subtitle'>
                  Gestioná tu negocio y hacelo crecer
                </span>
              </div>
            </div>
            <div className='containerLink'>
              <div className='containerButtonSVG'>
                <Link className='buttonRegister' to={'user'}>Clientes</Link>
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div>
                <span className='subtitle'>
                  Encontrá nuevos negocios y agendá citas
                </span>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  )
}

export default UserRegisterPage;