import React from 'react';
import '../../../styles/business/businessHomePage/businessFeaturesSection.css'

function SectionFeatures() {
  return (
    <>
      <div className='containerFeaturesSectionBusiness'>
        <div className='containerSectionTitle'>
          <h2 className='titleSection'>
            Empezá a disfrutar ahora de nuestras funcionalidades
          </h2>
        </div>
        <div className='containerFeatures'>
          <div className='rowFeatures'>
            <div className='cardFeatures'>
              <span>🗓️</span>
              <p>Agenda semanal y diaria con franjas horarias configurables.</p>
            </div>
            <div className='cardFeatures'>
              <span>📲</span>
              <p>Recordatorios automáticos por Email, SMS y WhatsApp.</p>
            </div>
            <div className='cardFeatures'>
              <span>🔁</span>
              <p>Reprogramación de turnos con arrastrar y soltar.</p>
            </div>
          </div>
          <div className='rowFeatures'>
            <div className='cardFeatures'>
              <span>⏳</span>
              <p>Lista de espera automática para cubrir cancelaciones.</p>
            </div>
            <div className='cardFeatures'>
              <span>💳</span>
              <p>Pagos online e integración con links de pago.</p>
            </div>
            <div className='cardFeatures'>
              <span>📈</span>
              <p>Panel de métricas: ocupación, ingresos y no-shows.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SectionFeatures;