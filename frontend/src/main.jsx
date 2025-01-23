import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import Auth from './Components/Auth.jsx';
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
import CreateClass from './Components/CreateClass.jsx';
import JoinClass from './Components/JoinClass.jsx';
import AddQuestion from './Components/AddQuestion.jsx';
import QuestionPage from './Pages/QuestionPage.jsx';

const router = createBrowserRouter([
  {
    path: '/', element: <Home />, children: [
      { path: '', element: <HomePage /> },
      { path: 'main', element: <App /> },
      {
        path: 'user', element: <Frontpage />, children: [
          { path: 'dashboard', element: <Dashboard /> },
          { path: 'classrooms', element: <Auth> <ClassRoom /> </Auth>},
          { path: 'create-class', element: <Auth> <CreateClass /> </Auth> },
          { path: 'join-class', element: <Auth> <JoinClass /> </Auth> },
          { path: 'my-classrooms', element: <Auth> <MyClassRoom /> </Auth> },
          { path: 'contests', element: <Auth> <Contest /> </Auth> },
          { path: 'add-new-question', element: <Auth> <AddQuestion /> </Auth> },
          { path: 'question-page/:id', element: <Auth> <QuestionPage /> </Auth> },
        ]
      },
      { path: 'login-user', element: <Login /> },
      { path: 'register-user', element: <Register /> },
    ]
  }
])
// <Auth> </Auth>
createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
  </>
)
