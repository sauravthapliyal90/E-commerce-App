import React from 'react'
import { Navigate,Routes, Route } from 'react-router'
import { useAuth } from '@clerk/react';
import LoginPage from './pages/LoginPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import OrderPage from './pages/OrderPage.jsx';
import CustomerPage from './pages/CustomerPage.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import PageLoader from './components/PageLoader.jsx';

function App() {

  const { isSignedIn, isLoaded } = useAuth();

  if(!isLoaded) return <PageLoader/>;
  return (

    <div>

      <Routes>
        <Route path='/login' element={isSignedIn ? <Navigate to={"/dashboard"} /> : <LoginPage />} />
          <Route path='/' element={isSignedIn ? <DashboardLayout /> : <Navigate to={"/login"} />} >
          <Route index element={<Navigate to={"dashboard"} />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="orders" element={<OrderPage />} />
          <Route path="customers" element={<CustomerPage />} />
        </Route>
      </Routes>

      {/* <h1 className='text-red-500'>HOME PAGE</h1>
      <button className='btn btn-primary'>click me</button>
      <Show when="signed-out">
        <SignInButton />
        <SignUpButton />
      </Show>
      <Show when="signed-in">
        <UserButton />
      </Show> */}



    </div>

  )
}

export default App