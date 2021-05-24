import React from 'react';
import { MemoryRouter as Router, BrowserRouter, Switch, Route } from 'react-router-dom';

import Layout from '@components/Layout';
import Prepocessor from '@components/Preprcoessor';
import Postprocessor from '@components/Postprocessor';

export const App: React.FC<{}> = () => {
  return (
    <div>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Prepocessor} />
            <Route path="/postprocessor" component={Postprocessor} />
          </Switch>
        </Layout>
      </Router>
    </div>
  );
};
