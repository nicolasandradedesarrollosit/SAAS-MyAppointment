import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import UserHomePage from '../../views/user/userHomePage.jsx';
import BusinessHomePage from '../../views/business/businessHomePage.jsx'
import UserRegisterPage from '../../views/user/registerUserPage.jsx';
import BusinessRegisterPage from '../../views/business/businessRegisterPage.jsx';

function Layout() {
  return (
    <>
      <main>
        <Routes>
          <Route path='/' element={<UserHomePage />} />
          <Route path='/business' element={<BusinessHomePage />} />
          <Route path='/register' element={<UserRegisterPage />} />
          <Route path='/register/business' element={<BusinessRegisterPage />} />
        </Routes>
      </main>
    </>
  )
}

export default Layout; 