import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/user/userHomePage/hero.css';

function Hero() {
  return (
    <>
      <header className='containerHero'>
        <div className='containerTextHero'>
          <h2 className='titleHero'>
            My appointment: El software de gestión de turnos elegido por los negocios argentinos
          </h2>
          <span className='subtitleHero'>
            Encontrá el servicio que necesitás de forma fácil, rápida y segura
          </span>
          <div className='containerHeroButton'>
            <Link className='heroButton1' to='/register'>Comenzar ahora</Link>
            <Link className='heroButton3' to='/login'>Inicia Sesión</Link>
            <Link className='heroButton2' to='/business'>Pagina para negocios</Link>
          </div>
        </div>
        <div className='containerMockUpHero'>
          <div className='mockUpHero'>
            <div className='mockUpColumn'>
              <div className='columnItem upperItem'>
                Hora
              </div>
              <div className='columnItem upperItem'>
                11:00
              </div>
              <div className='columnItem upperItem'>
                11:30
              </div>
              <div className='columnItem upperItem'>
                12:00
              </div>
              <div className='columnItem upperItem'>
                12:30
              </div>
              <div className='columnItem upperItem'>
                13:00
              </div>
            </div>

            <div className='mockUpColumn'>
              <div className='columnItem upperItem'>
                Lunes
              </div>
              <div className='columnItem reserved3'>
                <span className='nombrePerson'>
                  Ana Gómez
                </span>
                <span className='servicePerson'>
                  Corte ✂️
                </span>
              </div>
              <div className='columnItem able'>
                Disponible
              </div>
              <div className='columnItem reserved1'>
                <span className='nombrePerson'>
                  Julián Ríos
                </span>
                <span className='servicePerson'>
                  Barba 🧔‍♂️
                </span>
              </div>
              <div className='columnItem able'>
                Disponible
              </div>
              <div className='columnItem able'>
                Disponible
              </div>
            </div>

            <div className='mockUpColumn'>
              <div className='columnItem upperItem'>
                Martes
              </div>
              <div className='columnItem able'>
                Disponible
              </div>
              <div className='columnItem able'>
                Disponible
              </div>
              <div className='columnItem reserved5'>
                <span className='nombrePerson'>
                  Sofía Torres
                </span>
                <span className='servicePerson'>
                  Coloración 🎨
                </span>
              </div>
              <div className='columnItem able'>
                Disponible
              </div>
              <div className='columnItem reserved2'>
                <span className='nombrePerson'>
                  Marcos Díaz
                </span>
                <span className='servicePerson'>
                  Peinado 💇‍♂️
                </span>
              </div>

            </div>

            <div className='mockUpColumn'>
              <div className='columnItem upperItem'>
                Miércoles
              </div>
              <div className='columnItem able'>
                Disponible
              </div>
              <div className='columnItem able'>
                Disponible
              </div>
              <div className='columnItem able'>
                Disponible
              </div>
              <div className='columnItem reserved4'>
                <span className='nombrePerson'>
                  Lucía Pérez
                </span>
                <span className='servicePerson'>
                  Manicura 💅
                </span>
              </div>
              <div className='columnItem reserved1'>
                <span className='nombrePerson'>
                  Diego Romero
                </span>
                <span className='servicePerson'>
                  Afeitado 🪒
                </span>
              </div>
            </div>

            <div className='mockUpColumn'>
              <div className='columnItem upperItem'>
                Jueves
              </div>
              <div className='columnItem reserved2'>
                <span className='nombrePerson'>
                  Martín Vega
                </span>
                <span className='servicePerson'>
                  Corte & Secado 💇‍♀️
                </span>
              </div>
              <div className='columnItem able'>
                Disponible
              </div>
              <div className='columnItem able'>
                Disponible
              </div>
              <div className='columnItem able'>
                Disponible
              </div>
              <div className='columnItem reserved5'>
                <span className='nombrePerson'>
                  Carla López
                </span>
                <span className='servicePerson'>
                  Depilación 🧴
                </span>
              </div>
            </div>

            <div className='mockUpColumn'>
              <div className='columnItem upperItem'>
                Viernes
              </div>
              <div className='columnItem reserved3'>
                <span className='nombrePerson'>
                  Paula Ruiz
                </span>
                <span className='servicePerson'>
                  Tintura 🎯
                </span>
              </div>

              <div className='columnItem reserved4'>
                <span className='nombrePerson'>
                  Tomás Silva
                </span>
                <span className='servicePerson'>
                  Diseño de barba 🧔
                </span>
              </div>
              <div className='columnItem able'>
                Disponible
              </div>
              <div className='columnItem able'>
                Disponible
              </div>
              <div className='columnItem able'>
                Disponible <span className='able'></span>
              </div>
            </div>

            <div className='mockUpColumn'>
              <div className='columnItem upperItem'>
                Sábado
              </div>
              <div className='columnItem able'>
                Disponible
              </div>
              <div className='columnItem reserved1'>
                <span className='nombrePerson'>
                  Brenda Acuña
                </span>
                <span className='servicePerson'>
                  Peinado fiesta ✨
                </span>
              </div>

              <div className='columnItem able'>
                Disponible
              </div>
              <div className='columnItem reserved2'>
                <span className='nombrePerson'>
                  Leo Castro
                </span>
                <span className='servicePerson'>
                  Corte kids 🧒✂️
                </span>
              </div>
              <div className='columnItem able'>
                Disponible
              </div>

            </div>

            <div className='mockUpColumn'>
              <div className='columnItem upperItem'>
                Domingo
              </div>
              <div className='columnItem able'>
                Disponible
              </div>
              <div className='columnItem reserved5'>
                <span className='nombrePerson'>
                  Nadia Ferreyra
                </span>
                <span className='servicePerson'>
                  Brushing 💨
                </span>
              </div>
              <div className='columnItem able'>
                Disponible
              </div>
              <div className='columnItem able'>
                Disponible
              </div>
              <div className='columnItem reserved3'>
                <span className='nombrePerson'>
                  Franco Molina
                </span>
                <span className='servicePerson'>
                  Barbería clásica 🎩
                </span>
              </div>
            </div>
          </div>

        </div>
      </header>
    </>
  )
}

export default Hero;