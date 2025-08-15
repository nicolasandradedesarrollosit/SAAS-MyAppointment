import React from 'react';
import '../../../styles/user/userHomePage/sectionFeatures.css';

function SectionFeatures() {
  return (
    <>
      <div className='containerFeaturesSection'>
        <div className='containerFeaturesSectionTitle'>
          <h2 className='titleFeatures'>
            Comenzá a disfrutar de todas las funcionalidades
          </h2>
          <p className='subtitleFeatures'>Agendá citas, pagá por adelantado, mirá tus resumenes de transacciones</p>
        </div>
        <div className='containerContentSectionFeatures'>
          <div className='mockUpPhone'>
            <div className='contentMockUpPhone'>
              <div className='titleMockUp'>
                <h2>My Appointment!</h2>
              </div>
              <div className='appointmentMockUpPhone'>
                <div className='textAppointment'>
                  <p className='appointmentName'>Javier García</p>
                  <p className='appointmentService'>Corte de pelo</p>
                </div>
                <span className='confirmedAppointment'>
                  Confirmado
                </span>
              </div>
            </div>
            <div className='buttonNavigatePhone'>
              <div className='svgNavigate'>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  aria-hidden="true" focusable="false">
                  <polygon points="15,5 5,12 15,19"></polygon>
                </svg>
              </div>
              <div className='svgNavigate'>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  aria-hidden="true" focusable="false">
                  <circle cx="12" cy="12" r="6"></circle>
                </svg>
              </div>
              <div className='svgNavigate'>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  aria-hidden="true" focusable="false">
                  <rect x="6" y="6" width="12" height="12" rx="2" ry="2"></rect>
                </svg>
              </div>
            </div>
          </div>
          <div className='featuresList'>
            <div className='featureAppointment'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#00ff88" viewBox="0 0 24 24">
                <path d="M20.285 6.709l-11.285 11.291-5.285-5.291 1.415-1.415 3.87 3.876 9.87-9.876z" />
              </svg>
              <span>Controla tu negocio desde donde sea</span>
            </div>

            <div className='featureAppointment'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#00ff88" viewBox="0 0 24 24">
                <path d="M20.285 6.709l-11.285 11.291-5.285-5.291 1.415-1.415 3.87 3.876 9.87-9.876z" />
              </svg>
              <span>Agenda y gestiona turnos en segundos</span>
            </div>

            <div className='featureAppointment'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#00ff88" viewBox="0 0 24 24">
                <path d="M20.285 6.709l-11.285 11.291-5.285-5.291 1.415-1.415 3.87 3.876 9.87-9.876z" />
              </svg>
              <span>Recibe notificaciones y recordatorios automáticos</span>
            </div>

            <div className='featureAppointment'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#00ff88" viewBox="0 0 24 24">
                <path d="M20.285 6.709l-11.285 11.291-5.285-5.291 1.415-1.415 3.87 3.876 9.87-9.876z" />
              </svg>
              <span>Analiza estadísticas y rendimiento del negocio</span>
            </div>

            <div className='featureAppointment'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#00ff88" viewBox="0 0 24 24">
                <path d="M20.285 6.709l-11.285 11.291-5.285-5.291 1.415-1.415 3.87 3.876 9.87-9.876z" />
              </svg>
              <span>Personaliza tu agenda y horarios fácilmente</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SectionFeatures;