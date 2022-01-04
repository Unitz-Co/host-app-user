import React from 'react';

import withPageContext from '@uz/unitz-pages/withPageContext';
import App from '@uz/unitz-app-web/UserApp';
import Layout from '@uz/unitz-layout-web/LayoutMain';
import PageData from '../../data/PageDataQuery';
import DIV from '@vl/redata/DIV.macro';
import { ctx } from '@vl/redata';
import CourseDetail from '@uz/unitz-pages/CourseDetail';
import { Helmet } from 'react-helmet';

const Index = withPageContext((props) => {
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
                  <CourseDetail />
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
