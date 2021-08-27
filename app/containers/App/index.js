/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import LabelPage from 'containers/LabelPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { Layout } from 'antd';
import Nav from '../../components/Nav';
import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <Layout>
      <Nav />
      <Layout.Content className="content">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/label" component={LabelPage} />
          <Route component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
      </Layout.Content>
    </Layout>
  );
}
