import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import './assets/css/index.css';
import { App } from './pages/App.tsx';
import { BaseLayout } from './layouts/BaseLayout.tsx';
import { Ticket } from './pages/ticket.page.tsx';

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/ticket',
        element: <Ticket />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
