import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import './index.scss'
import './styles/global.scss'

import ErrorPage from './error-page'
import Loading from './routes/components/LoadingSpinner'
const Layout = lazy(() => import('./routes/layout.jsx'))
const UserLayout = lazy(() => import('./routes/user-layout.jsx'))
import SplashScreen from './routes/splashScreen.jsx'
import Whitelist from './routes/whitelist.jsx'
import New from './routes/new.jsx'
import Home, { loader as homeLoader } from './routes/home.jsx'
import App, { loader as appLoader } from './routes/app.jsx'
import About from './routes/about.jsx'
import Rules from './routes/rules.jsx'
import Rewarded from './routes/rewarded.jsx'
import Tournament from './routes/tournament.jsx'
import Player from './routes/player.jsx'
import Sponsoring from './routes/sponsoring.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <AuthProvider>
          <Layout />
        </AuthProvider>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        loader: homeLoader,
        element: <Home title={`Home`} />,
      },
      {
        path: ':appId',
        loader: appLoader,
        element: <App title={`App Detail`} />,
      },
      {
        path: 'new',
        element: <New title={`New`} />,
      },
      {
        path: 'about',
        element: <About title={`About`} />,
      },
      {
        path: 'Rules',
        element: <Rules title={`Rules`} />,
      },
      {
        path: 'rewarded',
        element: <Rewarded title={`Rewarded`} />,
      },
      {
        path: 'play/tournament/:id',
        element: <Tournament title={`Tournament`} />,
      },
      {
        path: 'player/:wallet_addr/tournament/:id',
        element: <Player title={`Tournament`} />,
      },
      {
        path: 'whitelist',
        element: <Whitelist title={`Whitelist`} />,
      },
      {
        path: 'sponsoring',
        element: <Sponsoring title={`Sponsoring`} />,
      },
    ],
  },
  {
    path: 'usr',
    element: (
      <Suspense fallback={<Loading />}>
        <AuthProvider>
          <UserLayout />
        </AuthProvider>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/" replace />,
      },
    ],
  },
  {
    path: ':username',
    element: <></>,
  },
  // {
  //   path: "donate",
  //   errorElement: <ErrorPage />,
  //   children: [
  //     {
  //       index: true,
  //       element: <Navigate to="/" replace />,
  //     },
  //     {
  //       path: ":wallet_addr",
  //       element: <Donate title={`Donate`} />,
  //     },
  //   ],
  // },
])

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)
