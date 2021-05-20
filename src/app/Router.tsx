/*eslint-disable @typescript-eslint/no-var-requires*/
import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { isMeetLinksProfile, isPassportProfile } from '../app-config';
import { LayoutConfig } from '../config';
import { RoutesConfig } from '../config/routes';
import Layout from '../components/_base/Layout';

const { Route } = (() => {
  if (isPassportProfile()) return require('../config/overrides/route');
  if (isMeetLinksProfile()) return require('react-router-dom');
})();

type Props = {
  routes: RoutesConfig
}


const AppRouter: React.FC<Props> = ({ routes }: Props): JSX.Element => {
  return (
    <BrowserRouter>
      <Layout {...LayoutConfig}>
        <Switch>
          {console.log("props",routes)}
          {Object.keys(routes).map(path => <Route key={path} {...{ path, ...routes[path] }} />)}
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};
export default AppRouter;
