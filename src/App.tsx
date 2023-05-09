import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import {
  HomePage,
  CitiesPage,
  AddSightPage,
  SightTypesPage,
  CityPage,
  AboutUsPage,
  FavoritePage,
  SightPage,
} from '@/pages';
import { Header } from '@/components';

import './App.css';
import { setLocalStorage } from './utils';

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/города" element={<CitiesPage />} />
      <Route path="/города/:name" element={<CityPage />} />
      <Route path="/новаяДост" element={<AddSightPage />} />
      <Route path="/достопримечательности/:type" element={<SightTypesPage />} />
      <Route path="/aboutUs" element={<AboutUsPage />} />
      <Route path="/избранное" element={<FavoritePage />} />
      <Route path="/достопримечательность/:name" element={<SightPage />} />
    </Route>,
  ),
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
