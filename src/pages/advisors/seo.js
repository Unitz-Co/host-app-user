import { Helmet } from 'react-helmet';
import React from 'react';

import { ctx } from '@vl/redata';
import DIV from '@vl/redata/DIV.macro';

import App from '@uz/unitz-app-web/UserApp';
import _ from 'lodash';
import Layout from '@uz/unitz-layout-web/LayoutMain';
import AdvisorProfile from '@uz/unitz-pages/AdvisorProfile';
import withPageContext from '@uz/unitz-pages/withPageContext';
import PageData from '../../data/PageDataQuery';

export const Index = withPageContext((props) => {
  return (
    <>
      <Helmet>
        <link rel="stylesheet" type="text/css" href="/seo.css" />
      </Helmet>
      <App>
        <Layout location={props.location} PageData={PageData}>
          <DIV>
            <Layout.POS name="app-header">
              {ctx.apply('ctf.renderSection', { name: 'articleNavbarSection' })}
            </Layout.POS>
            <Layout.POS name="app-body">
              <div className="min-lg:bg-background1">
                <div className="wrapper app-row">
                  <AdvisorProfile />
                </div>
              </div>
            </Layout.POS>
            <Layout.POS name="app-footer">{ctx.apply('ctf.renderSection', { name: 'FooterSection' })}</Layout.POS>
          </DIV>
        </Layout>
      </App>
    </>
  );
});

export default Index;
