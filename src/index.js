import React from 'react';
import ReactDOM from 'react-dom';
import './shared/index.css';
import App from './views/App';
import registerServiceWorker from './registerServiceWorker';
require("react-datepicker/dist/react-datepicker-cssmodules.css");


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
