import React from 'react';

import withPageContext from '@uz/unitz-pages/withPageContext';
import App from '@uz/unitz-app-web/UserApp';
import Layout from '@uz/unitz-layout-web/LayoutMain';
import PageData from '../../data/PageDataQuery';
import DIV from '@vl/redata/DIV.macro';
import SEO from '@uz/unitz-layout-web/SEO';
import { ctx } from '@vl/redata';
import _ from 'lodash';
import useRoute from '@vl/hooks/useGbRoute';
import DriveDetail from '@uz/unitz-pages/DriveDetail';

const Index = withPageContext((props) => {
  return (
    <>
      <App>
        <Layout location={props.location} PageData={PageData}>
          <DIV>
            <SEO
              pageData={{
                ...ctx.apply('ctf.findPage', { name: 'Homepage' }),
                seoTitle: 'Drive',
                seoMetaDescription: {
                  seoMetaDescription: 'Drive',
                },
              }}
            />
            <Layout.POS name="app-header">
              {ctx.apply('ctf.renderSection', { name: 'articleNavbarSection' })}
            </Layout.POS>
            <Layout.POS name="app-body">
              <div className="bg-white500">
                <div className="wrapper app-row">
                  <DriveDetail />
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
