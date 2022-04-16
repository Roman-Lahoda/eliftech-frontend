import React from 'react';
import { useEffect, lazy, Suspense, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './App.module.scss';
import { refresh } from './service/auth/index.js';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const HomePage = lazy(() =>
  import('./pages/HomePage/HomePage.js' /* webpackChunkName: "HomePage" */),
);

const BanksPage = lazy(() =>
  import('./pages/BanksPage/BanksPage.js' /* webpackChunkName: "BanksPage" */),
);

const CalculatorPage = lazy(() =>
  import('./pages/CalculatorPage/CalculatorPage.js' /* webpackChunkName: "CalculatorPage" */),
);

const NotFound = lazy(() =>
  import('./pages/NotFound/NotFound.js' /* webpackChunkName: "NotFound" */),
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem('user')));

  const PrivateRoute = ({ children, redirectTo = '/', ...routeProps }) => {
    return <Route {...routeProps}>{isLoggedIn ? children : <Redirect to={redirectTo} />}</Route>;
  };

  const PublicRoute = ({ children, redirectTo = '/banks', ...routeProps }) => {
    return <Route {...routeProps}>{isLoggedIn ? <Redirect to={redirectTo} /> : children}</Route>;
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className={s.app}>
      <Header setIsLoggedIn={setIsLoggedIn} />
      <div className={s.page_content}>
        <Suspense fallback={<p>Loading</p>}>
          <Switch>
            <PublicRoute exact path="/">
              <HomePage setIsLoggedIn={setIsLoggedIn} />
            </PublicRoute>

            <PrivateRoute exact path="/banks">
              <BanksPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            </PrivateRoute>

            <PrivateRoute exact path="/calculator">
              <CalculatorPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            </PrivateRoute>

            <Route path="/">
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </div>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </div>
  );
}

export default App;
