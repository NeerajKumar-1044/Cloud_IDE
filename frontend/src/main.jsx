import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './Home.jsx'
import HomePage from './HomePage.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Frontpage from './Pages/Frontpage.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import ClassRoom from './Pages/ClassRoom.jsx';
import MyClassRoom from './Pages/MyClassRoom.jsx';
import Contest from './Pages/Contest.jsx';


const router = createBrowserRouter([
  {path: '/', element: <Home />, children: [
    {path: '', element: <HomePage />},
    {path: 'main', element: <App />},
    {path: 'user', element: <Frontpage />, children: [
      {path: 'dashboard', element: <Dashboard />},
      {path: 'classrooms', element: <ClassRoom />},
      {path: 'my-classrooms', element: <MyClassRoom />},
      {path: 'contests', element: <Contest />},
    ]
    },
    {path: 'login-user', element: <Login />},
    {path: 'register-user', element: <Register />},
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
  </>
)
