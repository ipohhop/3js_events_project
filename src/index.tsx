import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Loader from "./components/loader/Loader";

const App = React.lazy(() => import('./App'));

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback={<Loader/>}>

      <App/>

    </React.Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);
