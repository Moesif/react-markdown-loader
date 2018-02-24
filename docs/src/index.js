import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import './style/app.scss';

const container = document.createElement('div');
container.className = 'root';

document.body.appendChild(container);
ReactDOM.render(<App />, container);
