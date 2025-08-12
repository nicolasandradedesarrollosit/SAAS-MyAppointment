import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import UserHomePage from '../../views/user/userHomePage.jsx';

function Layout() {
  return (
    <>
      <main>
        <Routes>
          <Route path='/' element={<UserHomePage />} />
        </Routes>
      </main>
    </>
  )
}

export default Layout; 