import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { DashboardPage } from '@/pages/DashboardPage'
import { SubjectsPage } from '@/pages/SubjectsPage'
import { SubjectDetailPage } from '@/pages/SubjectDetailPage'
import { SessionsPage } from '@/pages/SessionsPage'
import { GoalsPage } from '@/pages/GoalsPage'
import { AnalyticsPage } from '@/pages/AnalyticsPage'
import { CalendarPage } from '@/pages/CalendarPage'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 1,
    },
  },
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/subjects",
    element: <SubjectsPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/subjects/:id",
    element: <SubjectDetailPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/sessions",
    element: <SessionsPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/calendar",
    element: <CalendarPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/goals",
    element: <GoalsPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/analytics",
    element: <AnalyticsPage />,
    errorElement: <RouteErrorBoundary />,
  }
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
)