import React from 'react';
import '../../../styles/business/businessHomePage/businessSectionOpinions.css';

function SectionOpinions() {

  const opinions = [
    {
      name: 'María Rodríguez',
      business: 'Clínica Dental Sonrisa',
      opinion: 'Desde que usamos este sistema, las cancelaciones de última hora se han reducido en un 60%. La interfaz es muy intuitiva y nuestros pacientes aprecian los recordatorios automáticos.',
      stars: '⭐⭐⭐⭐⭐'
    },
    {
      name: 'Carlos Méndez',
      business: 'Barbería Moderna',
      opinion: 'Los reportes me ayudan a entender mejor a mi negocio. Puedo ver qué servicios son mas populares y en qué horarios tengo tengo mayor demanda. El soporte técnico es excelente',
      stars: '⭐⭐⭐⭐✨'
    },
    {
      name: 'Ana Gómez',
      business: 'Centro de Yoga Equilibrio',
      opinion: 'La posibilidad de que mis clientes reserven clases desde su móvil ha aumentado la asistencia. El sistema es flexible y se adaptó perfectamente a nuestras necesidades especificas',
      stars: '⭐⭐⭐⭐✨'
    },

  ]

  return (
    <>
      <div className='containerSectionOpinions'>
        <div className='containerTitleSectionOpinions'>
          <h2 className='titleOpinions'>
            Lo que dicen nuestros clientes
          </h2>
        </div>
        <div className='containerContentOpinions'>
          {opinions.map(card => {
            return (
              <div className='containerCardsOpinions'>
                <div className='containerNamenBusiness'>
                  <span className='namePerson'>{card.name}</span>
                  <span className='nameBusiness'>{card.business}</span>
                </div>
                <div className='cardContent'>
                  <div className='opinionText'>
                    <p className='opinion'>
                      {card.opinion}
                    </p>
                    <span className='starOpinion'>
                      {card.stars}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default SectionOpinions;