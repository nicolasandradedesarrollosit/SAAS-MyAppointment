import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/user/userLogIn/logInPageUser.css';
import GoBack from '../../components/others/GoBack';

function LogInPageUser() {
  const [errors, setErrors] = useState({});
  const [successes, setSuccesses] = useState({});
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const loginData = [
    {
      id: 'emailClient',
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    {
      id: 'passwordClient',
      regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    }
  ];

  const messages = [
    {
      name: 'email',
      error: 'El correo electrónico no es válido.',
      success: 'El correo electrónico es válido.'
    },
    {
      name: 'password',
      error: 'La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una minúscula, un número y un carácter especial.',
      success: 'La contraseña es válida.'
    }
  ]

  const validateField = (e) => {
    const value = e.target.value;
    const id = e.target.id;
    loginData.forEach(item => {
      if (item.id === id) {
        if (item.regex.test(value)) {
          setSuccesses(prev => ({ ...prev, [e.target.name]: true }));
          setErrors(prev => ({ ...prev, [e.target.name]: false }));
        } else {
          setErrors(prev => ({ ...prev, [e.target.name]: true }));
          setSuccesses(prev => ({ ...prev, [e.target.name]: false }));
        }
      }
    });
  }

  const getMessageByName = (fieldName) => {
    return messages.find(msg => msg.name === fieldName);
  };

  const eliminateSuccess = (e) => {
    const inputId = e.target.id;
    const field = loginData.find((f) => f.id === inputId);
    if (field) {
      const fieldName = field.name;
      setSuccesses((prev) => ({ ...prev, [fieldName]: false }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    let allValid = true;
    loginData.forEach(field => {
      const input = form.elements[field.id] || form.elements[field.name];
      const ok = field.regex.test(input?.value ?? '');
      setErrors(prev => ({ ...prev, [field.name]: !ok }));
      if (!ok) allValid = false;
    });
    if (!allValid) return;

    const payload = {
      email: fd.get('email')?.toString().trim() ?? '',
      password: (fd.get('password') ?? '').toString()
    };

    logInUser(payload);
  };

  const logInUser = async (payload) => {
    try {
      const resp = await fetch('http://localhost:4000/api/client/:email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!resp.ok) throw new Error('Error en la solicitud');
      setSuccess(true);
      setError(false);
      setTimeout(() => navigate('/login/business'), 2500);
    } catch (err) {
      console.error('Fallo de red o CORS:', err);
      setSuccess(false);
      setError(true);
    }
  };


  return (
    <>
      <section className='containerLogInUser'>
        <GoBack dominio={'/login'} />
        <div className='logInUserBox'>
          <h2 className='titleLogIn'>Iniciar sesion como Cliente</h2>
          <div className={error ? 'activeError fadeInUp' : 'inactiveError'}>Revisa alguno de los campos...</div>
          <div className={success ? 'activeSuccess fadeInUp' : 'inactiveSuccess'}>Iniciaste sesion con exito!</div>
          <form action="" className='formLogInUser' onSubmit={handleSubmit}>
            <div className='containerFieldForm'>
              <div className='containerSVG'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className='fieldForm'>
                <input
                  onChange={validateField}
                  onBlur={eliminateSuccess}
                  type='email'
                  id='emailClient'
                  name='email'
                  placeholder=''
                />
                <label htmlFor='clientEmail'>Correo Electrónico</label>
                <div className={`errorMessage small ${errors.email ? 'show' : ''}`}>
                  {getMessageByName('email')?.error}
                </div>
                <div className={`successMessage small ${successes.email ? 'show' : ''}`}>
                  {getMessageByName('email')?.success}
                </div>
              </div>
            </div>
            <div className='containerFieldForm'>
              <div className='containerSVG'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="16" r="1" fill="currentColor" />
                  <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className='fieldForm'>
                <input
                  onChange={validateField}
                  onBlur={eliminateSuccess}
                  type="password"
                  id='passwordClient'
                  name='password'
                  placeholder=''
                />
                <label htmlFor="passwordClient">Contraseña</label>
                <div className={`errorMessage small ${errors.password ? 'show' : ''}`}>
                  {getMessageByName('password')?.error}
                </div>
                <div className={`successMessage small ${successes.password ? 'show' : ''}`}>
                  {getMessageByName('password')?.success}
                </div>
              </div>
            </div>
            <div className='containerLinks'>
              <Link to='/register/user' className='link'>
                Registrarme como cliente
              </Link>
              <Link to={'/forgot-password/user'} className='link'>
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <div className='containerSubmit'>
              <button type='submit' className='submitBtn'>Enviar</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default LogInPageUser;