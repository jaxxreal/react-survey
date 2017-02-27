import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';

// app styles
import '../assets/styles/index.less';

import AppWrapper from './components/AppWrapper';

render(<AppWrapper/>, document.getElementById('root'));
