import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home/Home';
import Layout from './components/Layout/Layout';
import { lazy, Suspense } from 'react';

const Registration = lazy(
  () => import(/* webpackChunkName: "Registration" */ './pages/Registration/Registration'),
);
const Authorization = lazy(
  () => import(/* webpackChunkName: "Authorization" */ './pages/Authorization/Authorization'),
);
const ConfirmEmail = lazy(
  () => import(/* webpackChunkName: "ConfirmEmail" */ './pages/ConfirmEmail/ConfirmEmail'),
);
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound/NotFound'));

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="registration"
            element={
              <Suspense
                fallback={
                  <div className="loader">
                    <h2 className="loading">Идет загрузка...</h2>
                  </div>
                }>
                <Registration />
              </Suspense>
            }
          />
          <Route
            path="authorization"
            element={
              <Suspense
                fallback={
                  <div className="loader">
                    <h2 className="loading">Идет загрузка...</h2>
                  </div>
                }>
                <Authorization />
              </Suspense>
            }
          />
          <Route
            path="confirm/:token"
            element={
              <Suspense
                fallback={
                  <div className="loader">
                    <h2 className="loading">Идет загрузка...</h2>
                  </div>
                }>
                <ConfirmEmail />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense
                fallback={
                  <div className="loader">
                    <h2 className="loading">Идет загрузка...</h2>
                  </div>
                }>
                <NotFound />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
