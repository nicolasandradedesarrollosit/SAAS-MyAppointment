import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/user/userHomePage/footer.css'

function Footer() {
  return (
    <>
      <div className='containerUserHomeFooter'>
        <footer className='userHomeFooter'>
          <div className='containerFooterLinks'>
            <Link className='footerLink' to='/soporte'>Habla con un experto</Link>
            <Link className='footerLink' to='/mision'>Nuestra mision</Link>
            <Link className='footerLink' to='/vision'>Nuestra vision</Link>
            <Link className='footerLink' to='/politics'>Politicas de la empresa</Link>
            <Link className='footerLink' to='/refund'>Reembolsos</Link>
          </div>
          <div className='footerSocialMedia'>
            <a href="instagram.com">
              1
            </a>
            <a href="linkedin.com">
              2
            </a>
            <a href="x.com">
              3
            </a>
          </div>
        </footer>
        <div className='containerPayment'>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
        </div>
        <div className='containerRigths'>
          © 2025 MyAppointment. Todos los derechos reservados.
        </div>
      </div>
    </>
  )
}

export default Footer;