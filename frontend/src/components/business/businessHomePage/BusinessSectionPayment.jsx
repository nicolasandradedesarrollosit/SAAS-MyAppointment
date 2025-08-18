import React from 'react';
import { Link } from 'react-router-dom'
import '../../../styles/business/businessHomePage/BusinessSectionPayment.css';

function SectionPayments() {

  const contentCards = [{
    title: 'Básico',
    popular: false,
    subtitle: 'Ideal para pequeños negocios',
    price: 'Gratis',
    listFeatures: ['Hasta 2 empleados', '100 reservas mensuales', 'Notificaciones por email', 'Sin reportes']
  },
  {
    title: 'Profesional',
    popular: true,
    subtitle: 'Para negocios en crecimiento',
    price: '$9.999',
    listFeatures: ['Hasta 5 empleados', '500 reservas mensuales', 'Notificaciones por SMS y email', 'Reportes avanzados con métricas']
  },
  {
    title: 'Empresarial',
    popular: false,
    subtitle: 'Para negocios en crecimiento',
    price: '$19.999',
    listFeatures: ['Empleados ilimitados', 'Reservas ilimitadas', 'Notificaciones personalizables', 'Reportes avanzados con métricas', 'Soporte prioritario']
  }
  ];

  return (
    <>
      <div className='containerSectionPayments'>
        <div className='containerTitleSectionPayments'>
          <h2 className='titlePayment'>
            Planes de suscripción
          </h2>
          <span className='subtitlePayment'>
            Elige el plan que mejor se adapte a las necesidades de tu negocio. Todos incluyen soporte para el cliente y actualizacion periódicas.
          </span>
        </div>
        <div className="containerPayment">
          {contentCards.map((card) => (
            <div className='cardPayment' id={card.popular ? 'popular' : `card-${card.title}`}>
              {card.popular ? <div className='topCard'>MÁS POPULAR</div> : null}
              < div className="titleCard" > {card.title}</div>
              <div className="subtitleCard">{card.subtitle}</div>

              <div className="priceCard">
                <span className="numberPriceCard">{card.price}</span>
                <span className="periodPriceCard">/mes</span>
              </div>

              <ul className="featuresCard">
                {card.listFeatures.map((feature) => (
                  <li className="feature" key={feature}>
                    <span className="tickFeature" aria-hidden="true">✔</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className='containerButton'>
                <Link className='buttonCard' to={'/register'}>
                  Seleccionar Plan
                </Link>
              </div>
            </div>
          ))}
        </div >
      </div >
    </>
  )
}

export default SectionPayments;