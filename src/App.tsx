import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
  RouterProvider,
} from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
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
  UpdateSightPage,
} from '@/pages';
import { Header } from '@/components';

import './App.css';

const queryClient = new QueryClient();

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Header />}>
//       <Route path="/" element={<HomePage />} />
//       <Route path="/города" element={<CitiesPage />} />
//       <Route path="/города/:name" element={<CityPage />} />
//       <Route path="/новаяДост" element={<AddSightPage />} />
//       <Route path="/достопримечательности/:type" element={<SightTypesPage />} />
//       <Route path="/aboutUs" element={<AboutUsPage />} />
//       <Route path="/избранное" element={<FavoritePage />} />
//       <Route path="/достопримечательность/:name" element={<SightPage />} />
//       <Route path="/достопримечательность/:name/изменить" element={<UpdateSightPage />} />
//     </Route>,
//   ),
// );

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        {/* <RouterProvider router={router} /> */}
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/города" element={<CitiesPage />} />
            <Route path="/города/:name" element={<CityPage />} />
            <Route path="/новаяДост" element={<AddSightPage />} />
            <Route path="/достопримечательности/:type" element={<SightTypesPage />} />
            <Route path="/aboutUs" element={<AboutUsPage />} />
            <Route path="/избранное" element={<FavoritePage />} />
            <Route path="/достопримечательность/:name" element={<SightPage />} />
            <Route path="/достопримечательность/:name/изменить" element={<UpdateSightPage />} />
          </Route>
        </Routes>
      </div>
      <ReactQueryDevtools />
      <Analytics />
    </QueryClientProvider>
  );
}

export default App;
