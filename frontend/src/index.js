import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
const initializeMomentCRM = () => {
  const script = document.createElement('script');
  script.src = 'https://www.momentcrm.com/embed';
  script.async = true;
  script.onload = () => {
    window.MomentCRM('init', {
      'teamVanityId': process.env.REACT_APP_MOMENTCRM_TEAM_VANITY_ID,
      'doChat': true,
      'doTimeTravel': true,
    });
  };
  document.body.appendChild(script);
};

initializeMomentCRM();
{/* <script src="https://www.momentcrm.com/embed"></script>
    <script>
      MomentCRM('init', {
        'teamVanityId': 'abc12345788',
        'doChat': true,
        'doTimeTravel': true,
      });
    </script> */}