import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as MobxProvider } from 'mobx-react';

import { stores } from '@stores/AppStore';
import { App } from './App';
import 'antd/dist/antd.css';

ReactDOM.render(
  <MobxProvider {...stores}>
    <App />
  </MobxProvider>,
  document.getElementById('app')
);
