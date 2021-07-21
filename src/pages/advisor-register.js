import React from 'react';

import { ctx } from '@vl/redata';
import DIV from '@vl/redata/DIV.macro';

import { Helmet } from 'react-helmet';
import AdvisorRegisterPage from '@uz/unitz-pages/AdvisorRegisterPage';
import App from '@uz/unitz-app-web/UserApp';

import Layout from '@uz/unitz-layout-web/LayoutMain';

import PageData from '../data/PageDataQuery';

const AdvisorRegisterIndex = (props) => {
  return (
    <App>
      <Layout location={props.location} PageData={PageData}>
        <DIV>
          <Helmet title={'siteTitle'} />
          <Layout.POS name="app-header">{ctx.apply('ctf.renderSection', { name: 'articleNavbarSection' })}</Layout.POS>
          <Layout.POS name="app-body">
            <AdvisorRegisterPage />
          </Layout.POS>
          <Layout.POS name="app-footer">{ctx.apply('ctf.renderSection', { name: 'articleFooterSection' })}</Layout.POS>
        </DIV>
      </Layout>
    </App>
  );
};

export default AdvisorRegisterIndex;
