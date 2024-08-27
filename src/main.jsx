import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Floating from './components/Floating/Floating.jsx'
// import Header from './components/Header/Header.jsx'

import HomePage from './pages/HomePage.jsx'
import Products from './pages/Products.jsx'
import Contact from './pages/Contact.jsx'
import Affiliate from './pages/Affiliate.jsx'
import AddMarketer from './pages/MarketerSignup.jsx'
import MarketerDash from './pages/MarketerDashboard.jsx'

import './index.css'

const router = createBrowserRouter([
{
  path: '/',
  element: <HomePage />,
},
{
  path: '/products',
  element: <Products />
},
{
  path: '/affiliate',
  element: <Affiliate />
},
{
  path: '/contact',
  element: <Contact />
},
{
  path: '/signup-marketer',
  element: <AddMarketer /> 
},
{
  path: '/marketer-dashboard',
  element: <MarketerDash /> 
}]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <Header /> */}
    <Floating />
  </React.StrictMode>,
)
