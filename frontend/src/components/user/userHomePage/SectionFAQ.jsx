import React, { useState } from 'react';
import '../../../styles/user/userHomePage/sectionFAQ.css'

function SectionFAQ() {
  const [indexFAQ, setIndexFAQ] = useState(-1);

  const faqs = [
    {
      question: '¿Cómo funciona la suscripción mensual?',
      answer:
        'Pagás una cuota fija por mes y accedés a todas las herramientas: calendario de turnos, recordatorios por email/SMS, panel para negocios y reportes básicos. No hay costos de instalación ni permanencia.'
    },
    {
      question: '¿Puedo cancelar cuando quiera?',
      answer:
        'Sí. Podés cancelar en cualquier momento desde tu panel. La suscripción se mantiene activa hasta el final del período ya abonado y no se generan cargos futuros.'
    },
    {
      question: '¿Ofrecen prueba gratuita?',
      answer:
        'Tenemos un período de prueba de 14 días con todas las funciones del plan seleccionado. No pedimos tarjeta hasta que decidas continuar.'
    },
    {
      question: '¿Sirve para varios locales o profesionales?',
      answer:
        'Sí. Podés crear múltiples sucursales y profesionales, cada uno con su agenda y horarios. También podés asignar permisos por rol para tu equipo.'
    },
    {
      question: '¿Envían recordatorios automáticos a mis clientes?',
      answer:
        'Sí. Podés activar recordatorios por email y SMS con antelación configurable (por ejemplo, 24 h y 2 h antes). Esto reduce ausencias y mejora la ocupación.'
    },
    {
      question: '¿Puedo integrar el sistema con mi web o redes?',
      answer:
        'Te damos un link público y un widget embebible para tu sitio. Además, podés compartir la agenda en redes para que reserven sin escribirte por privado.'
    },
    {
      question: '¿Cómo manejan la seguridad y los datos?',
      answer:
        'Usamos cifrado en tránsito y en reposo, respaldos automáticos diarios y controles de acceso por rol. Tus datos son tuyos y podés exportarlos cuando quieras.'
    },
    {
      question: '¿Entregan facturas y medios de pago?',
      answer:
        'Generamos comprobantes y soportamos múltiples medios de pago a través de un proveedor de checkout. También podés emitir facturas y descargar reportes.'
    }
  ];

  const alternate = (i) => {
    setIndexFAQ((prev) => (prev === i ? -1 : i));
  };

  return (
    <>
      <div className='containerFAQSection'>
        <div className='containerTitle'>
          <h2 className='titleSectionFAQ'>Preguntas comunes</h2>
        </div>

        <div className='containerContentFAQ'>
          {faqs.map((item, i) => {
            const isActive = i === indexFAQ;
            return (
              <div className='contentFAQ' key={i}>
                <div className='containerQuestion'
                  onClick={() => alternate(i)}
                  aria-expanded={isActive}
                  aria-controls={`respuesta-${i}`}
                >
                  <span
                    className={isActive ? 'toggleQuestion active' : 'toggleQuestion'}
                    aria-hidden='true'
                  />
                  <span >
                    {item.question}
                  </span>
                </div>
                <div className={isActive ? 'containerAnswer active' : 'containerAnswer'}>
                  <span>
                    {item.answer}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div >
    </>
  )
}

export default SectionFAQ;