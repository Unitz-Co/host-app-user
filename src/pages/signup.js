import React from 'react';

import { ctx } from '@vl/redata';
import DIV from '@vl/redata/DIV.macro';

import SignupPage from '@uz/unitz-pages/SignupPage';

import App from '@uz/unitz-app-web/UserApp';
import SEO from '@uz/unitz-layout-web/SEO';

import Layout from '@uz/unitz-layout-web/LayoutMain';
import withPageContext from '@uz/unitz-pages/withPageContext';
import PageData from '../data/PageDataQuery';

const RegisterIndex = withPageContext((props) => {
  return (
    <App>
      <Layout location={props.location} PageData={PageData}>
        <DIV>
          <SEO pageData={ctx.apply('ctf.findPage', { name: 'AuthPage' })} />
          <Layout.POS name="app-header">{ctx.apply('ctf.renderSection', { name: 'authNavbarSection' })}</Layout.POS>
          <Layout.POS name="app-body">
            <SignupPage />
          </Layout.POS>
          <Layout.POS name="app-footer">{ctx.apply('ctf.renderSection', { name: 'authFooterSection' })}</Layout.POS>
        </DIV>
      </Layout>
    </App>
  );
});

export default RegisterIndex;
