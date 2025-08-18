import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import UserHomePage from '../../views/user/userHomePage.jsx';
import BusinessHomePage from '../../views/business/businessHomePage.jsx'

function Layout() {
  return (
    <>
      <main>
        <Routes>
          <Route path='/' element={<UserHomePage />} />
          <Route path='/business' element={<BusinessHomePage />} />
        </Routes>
      </main>
    </>
  )
}

export default Layout; 