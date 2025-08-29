import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import UserHomePage from '../../views/user/userHomePage.jsx';
import BusinessHomePage from '../../views/business/businessHomePage.jsx'
import UserRegisterPage from '../../views/user/registerUserPage.jsx';
import BusinessRegisterPage from '../../views/business/businessRegisterPage.jsx';
import UserRegisterForm from '../../views/user/registerUserForm.jsx';
import LogInPageUser from '../../views/user/logInPageUser.jsx';

function Layout() {
  return (
    <>
      <main>
        <Routes>
          <Route path='/' element={<UserHomePage />} />
          <Route path='/business' element={<BusinessHomePage />} />
          <Route path='/register' element={<UserRegisterPage />} />
          <Route path='/register/business' element={<BusinessRegisterPage />} />
          <Route path='/register/user' element={<UserRegisterForm />} />
          <Route path='/login/user' element={<LogInPageUser />}></Route>
        </Routes>
      </main>
    </>
  )
}

export default Layout; 