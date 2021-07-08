import React from 'react';

import { ctx } from '@vl/redata';
import DIV from '@vl/redata/DIV.macro';

import { Helmet } from 'react-helmet';
import App from '@uz/unitz-app-web/UserApp';

import Layout from '@uz/unitz-layout-web/LayoutMain';
import BeginnerGuidePage from '@uz/unitz-pages/BeginnerGuidePage';
import _ from 'lodash';
import PageData from '../../data/PageDataQuery';

export const component = (props) => {
  const pageContext = _.get(props, 'pageContext');
  return (
    <App>
      <Layout location={props.location} PageData={PageData}>
        <DIV>
          {ctx.debug(() => {
            ctx.set('pageContext', pageContext);
          })}
          <Helmet title={'siteTitle'} />
          <Layout.POS name="app-header">{ctx.apply('ctf.renderSection', { name: 'articleNavbarSection' })}</Layout.POS>
          <Layout.POS name="app-body">
            <BeginnerGuidePage />
          </Layout.POS>
          <Layout.POS name="app-footer">{ctx.apply('ctf.renderSection', { name: 'articleFooterSection' })}</Layout.POS>
        </DIV>
      </Layout>
    </App>
  );
};

export default component;
