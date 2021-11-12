import React from 'react';

import { ctx } from '@vl/redata';
import DIV from '@vl/redata/DIV.macro';

import App from '@uz/unitz-app-web/UserApp';
import SEO from '@uz/unitz-layout-web/SEO';
import _ from 'lodash';
import Layout from '@uz/unitz-layout-web/LayoutMain';
import AdvisorProfile from '@uz/unitz-pages/AdvisorProfile';
import withPageContext from '@uz/unitz-pages/withPageContext';
import useRoute from '@vl/hooks/useGbRoute';
import PageData from '../../data/PageDataQuery';

export const component = withPageContext((props) => {
  const pageContext = useRoute().getPageContext();
  return (
    <App>
      <Layout location={props.location} PageData={PageData}>
        <DIV>
          <SEO
            pageData={{
              ...ctx.apply('ctf.findPage', { name: 'Homepage' }),
              seoTitle: `${_.get(pageContext, 'params.profile.displayName')} | Unitz`,
              seoMetaDescription: {
                seoMetaDescription: `${_.get(pageContext, 'params.profile.displayName')}`,
              },
            }}
          />
          <Layout.POS name="app-header">{ctx.apply('ctf.renderSection', { name: 'articleNavbarSection' })}</Layout.POS>
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
  );
});

export default component;
