import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import './assets/css/index.css';
import { HomePage } from './pages/home.page.tsx';
import { BaseLayout } from './layouts/BaseLayout.tsx';
import { TicketPage } from './pages/ticket.page.tsx';
import { AuthPage } from './pages/auth.page.tsx';
import { PrivateRoutes } from './components/PrivateRoutes.tsx';
import { VotePage } from './pages/vote.page.tsx';

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/auth',
        element: <AuthPage />
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: '/ticket',
            element: <TicketPage />
          },
          {
            path: '/vote',
            element: <VotePage />
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
