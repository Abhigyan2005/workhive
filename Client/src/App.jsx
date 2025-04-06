import Login from './components/BeforeLogin/Login'
import Home from './components/BeforeLogin/Home'
import {createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './css/App.css'
import './css/index.css'
import Dashboard from './components/AfterLogin/Dashboard'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home/>
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/dashboard',
      element: <Dashboard/>
    },
    {
      path: '*',
      element: <Navigate to= "/" replace />
    }
])

  return (
    <>
      <RouterProvider router={router} /> 
    </>
  )
}

export default App
