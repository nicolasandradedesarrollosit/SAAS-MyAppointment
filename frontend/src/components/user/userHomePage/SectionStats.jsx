import React from 'react';
import '../../../styles/user/userHomePage/sectionStats.css';

function SectionStats() {
  return (
    <>
      <div className='containerSectionUserStats'>
        <div className='userSectionStatsTitle'>
          <h2 className='userTitleStats'>Las personas vuelven a elegir MyAppointment</h2>
          <span className='subtitleStats'>Agenda citas y encuentra negocios nuevos</span>
        </div>
        <div className='userSectionStatsContent'>
          <div className='containerSectionStatsCards'>
            <div className='containerStatsRow'>
              <div className='sectionStatsCard'>
                <span className='cardIcon'>📅</span>
                <span className='cardNumber'>98.7%</span>
                <p className='cardText'>Turnos confirmados con éxito</p>
              </div>
              <div className='sectionStatsCard'>
                <span className='cardIcon'>⏱️</span>
                <span className='cardNumber'>1 min 52 s</span>
                <p className='cardText'>Tiempo medio para confirmar un turno</p>
              </div>
            </div>
            <div className='containerStatsRow'>
              <div className='sectionStatsCard'>
                <span className='cardIcon'>🔔</span>
                <span className='cardNumber'>−38%</span>
                <p className='cardText'>Menos ausencias gracias a recordatorios</p>
              </div>
              <div className='sectionStatsCard'>
                <span className='cardIcon'>📈</span>
                <span className='cardNumber'>+124%</span>
                <p className='cardText'>Crecimiento de usuarios en 12 meses</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SectionStats;