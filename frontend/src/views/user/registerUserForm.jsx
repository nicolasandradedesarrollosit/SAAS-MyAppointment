import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GoBack from '../../components/others/GoBack.jsx';
import '../../styles/user/userRegisterPage/userRegisterForm.css';


function UserRegisterForm() {
  const [errors, setErrors] = useState({});
  const [successes, setSuccesses] = useState({});
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const messages = [
    {
      name: 'name',
      error: 'El nombre es obligatorio.',
      success: 'El nombre es válido.'
    },
    {
      name: 'email',
      error: 'El correo electrónico no es válido, debes incluir un "@" y un dominio.',
      success: 'El correo electrónico es válido.'
    },
    {
      name: 'phone',
      error: 'El número de teléfono no es válido, debe contener solo números y tener entre 7 y 15 dígitos.',
      success: 'El número de teléfono es válido.'
    },
    {
      name: 'address',
      error: 'La dirección es obligatoria.',
      success: 'La dirección es válida.'
    },
    {
      name: 'dateBirth',
      error: 'La fecha de nacimiento es obligatoria',
      success: 'La fecha de nacimiento es válida.'
    },
    {
      name: 'password',
      error: 'La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una minúscula y un número.',
      success: 'La contraseña es válida.'
    }
  ];

  const fields = [
    {
      id: 'clientName',
      name: 'name',
      regex: /.+/
    },
    {
      id: 'clientEmail',
      name: 'email',
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    {
      id: 'clientPhone',
      name: 'phone',
      regex: /^\d{7,15}$/
    },
    {
      id: 'clientAddress',
      name: 'address',
      regex: /.+/
    },
    {
      id: 'clientDateBirth',
      name: 'dateBirth',
      regex: /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
    },
    {
      id: 'passwordClient',
      name: 'password',
      regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    }
  ];

  const validateField = (e) => {
    const inputId = e.target.id;
    const inputValue = e.target.value;

    const field = fields.find((f) => f.id === inputId);

    if (field) {
      const fieldName = field.name;

      if (!field.regex.test(inputValue)) {
        setErrors((prev) => ({ ...prev, [fieldName]: true }));
        setSuccesses((prev) => ({ ...prev, [fieldName]: false }));
      } else {
        setErrors((prev) => ({ ...prev, [fieldName]: false }));
        setSuccesses((prev) => ({ ...prev, [fieldName]: true }));
      }
    }
  };

  const getMessageByName = (fieldName) => {
    return messages.find(msg => msg.name === fieldName);
  };

  const eliminateSuccess = (e) => {
    const inputId = e.target.id;
    const field = fields.find((f) => f.id === inputId);
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
    fields.forEach(field => {
      const input = form.elements[field.id] || form.elements[field.name];
      const ok = field.regex.test(input?.value ?? '');
      setErrors(prev => ({ ...prev, [field.name]: !ok }));
      if (!ok) allValid = false;
    });
    if (!allValid) return;

    const payload = {
      name: fd.get('name')?.toString().trim() ?? '',
      email: fd.get('email')?.toString().trim() ?? '',
      phone: fd.get('phone')?.toString().trim() ?? '',
      address: fd.get('address')?.toString().trim() ?? '',
      date_birth: (fd.get('dateBirth') ?? '').toString().trim(),
      password: (fd.get('password') ?? '').toString()
    };

    createClient(payload);
  };

  const createClient = async (payload) => {
    try {
      const resp = await fetch('http://localhost:4000/api/client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!resp.ok) throw new Error('Error en la solicitud');
      setSuccess(true);
      setError(false);
      setTimeout(() => navigate('/login/user'), 2500);
    } catch (err) {
      console.error('Fallo de red o CORS:', err);
      setSuccess(false);
      setError(true);
    }
  };

  return (
    <>
      <section className='containerRegisterClient'>
        <GoBack dominio='/register' />
        <div className='registerClientForm'>
          <h2 className='titleRegisterClient'>
            Regístrate como Cliente
          </h2>
          <div className={error ? 'activeError fadeInUp' : 'inactiveError'}>Revise alguno de los campos por favor...</div>
          <div className={success ? 'activeSuccess fadeInUp' : 'inactiveSuccess'}>El registro se hizo con exito!</div>
          <form className='containerFormContent' onSubmit={handleSubmit}>
            <div className='containerFieldForm'>
              <div className='containerSVG'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L13.09 8.26L19.5 9L13.09 9.74L12 16L10.91 9.74L4.5 9L10.91 8.26L12 2Z" fill="currentColor" />
                  <path d="M19 15L20.09 18.26L23.5 19L20.09 19.74L19 23L17.91 19.74L14.5 19L17.91 18.26L19 15Z" fill="currentColor" />
                  <path d="M5 15L6.09 18.26L9.5 19L6.09 19.74L5 23L3.91 19.74L0.5 19L3.91 18.26L5 15Z" fill="currentColor" />
                </svg>
              </div>
              <div className='fieldForm'>
                <input
                  onChange={validateField}
                  onBlur={eliminateSuccess}
                  type='text'
                  id='clientName'
                  name='name'
                  placeholder=''
                />
                <label htmlFor='clientName'>Nombre</label>
                <div className={`errorMessage small ${errors.name ? 'show' : ''}`}>
                  {getMessageByName('name')?.error}
                </div>
                <div className={`successMessage small ${successes.name ? 'show' : ''}`}>
                  {getMessageByName('name')?.success}
                </div>
              </div>
            </div>

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
                  id='clientEmail'
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
                  <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.19 12.85C3.5 10.2412 2.44785 7.27099 2.12 4.18C2.09543 3.90347 2.12818 3.62476 2.21692 3.36162C2.30567 3.09849 2.44857 2.85669 2.63618 2.65162C2.82379 2.44655 3.05219 2.28271 3.30684 2.17052C3.56149 2.05833 3.83672 2.00026 4.11 2H7.11C7.59531 1.99522 8.06711 2.16708 8.43849 2.48353C8.80988 2.79999 9.05423 3.23945 9.13 3.72C9.27111 4.68007 9.52779 5.62273 9.89 6.53C10.0321 6.88792 10.0618 7.27691 9.9762 7.65088C9.89058 8.02485 9.69408 8.36811 9.41 8.64L8.09 9.96C9.51356 12.4135 11.5865 14.4864 14.04 15.91L15.36 14.59C15.6319 14.3059 15.9751 14.1094 16.3491 14.0238C16.7231 13.9382 17.1121 13.9679 17.47 14.11C18.3773 14.4722 19.3199 14.7289 20.28 14.87C20.7658 14.9459 21.2094 15.1938 21.5265 15.5708C21.8437 15.9479 22.0122 16.4226 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className='fieldForm'>
                <input
                  onChange={validateField}
                  onBlur={eliminateSuccess}
                  type='tel'
                  id='clientPhone'
                  name='phone'
                  placeholder=''
                />
                <label htmlFor='clientPhone'>Teléfono</label>
                <div className={`errorMessage small ${errors.phone ? 'show' : ''}`}>
                  {getMessageByName('phone')?.error}
                </div>
                <div className={`successMessage small ${successes.phone ? 'show' : ''}`}>
                  {getMessageByName('phone')?.success}
                </div>
              </div>
            </div>

            <div className='containerFieldForm'>
              <div className='containerSVG'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className='fieldForm'>
                <input
                  onChange={validateField}
                  onBlur={eliminateSuccess}
                  type='text'
                  id='clientAddress'
                  name='address'
                  placeholder=''
                />
                <label htmlFor='clientAddress'>Dirección</label>
                <div className={`errorMessage small ${errors.address ? 'show' : ''}`}>
                  {getMessageByName('address')?.error}
                </div>
                <div className={`successMessage small ${successes.address ? 'show' : ''}`}>
                  {getMessageByName('address')?.success}
                </div>
              </div>
            </div>

            <div className='containerFieldForm'>
              <div className='containerSVG'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12H16L14 15H10L8 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5.45 5.11L2 12V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H20C20.5304 20 21.0391 19.7893 21.4142 19.4142C21.7893 19.0391 22 18.5304 22 18V12L18.55 5.11C18.3844 4.77679 18.1292 4.49637 17.813 4.30028C17.4967 4.10419 17.1321 4.0002 16.76 4H7.24C6.86792 4.0002 6.50326 4.10419 6.18704 4.30028C5.87083 4.49637 5.61558 4.77679 5.45 5.11V5.11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className='fieldForm'>
                <input
                  onChange={validateField}
                  onBlur={eliminateSuccess}
                  type="date"
                  id='clientDateBirth'
                  name='dateBirth'
                  placeholder=''
                />
                <label htmlFor='clientDateBirth'>Fecha de nacimiento</label>
                <div className={`errorMessage small ${errors.dateBirth ? 'show' : ''}`}>
                  {getMessageByName('dateBirth')?.error}
                </div>
                <div className={`successMessage small ${successes.dateBirth ? 'show' : ''}`}>
                  {getMessageByName('dateBirth')?.success}
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
              <Link to='/login/user' className='link'>
                Ya tengo una cuenta
              </Link>
              <Link to='/register/business' className='link'>
                Registrarme como Negocio
              </Link>
            </div>
            <div className='containerSubmit'>
              <button type='submit' className='submitBtn'>Enviar</button>
            </div>
          </form>
        </div>
      </section >
    </>
  )
};

export default UserRegisterForm;