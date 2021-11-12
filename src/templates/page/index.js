import React from 'react';

import { ctx } from '@vl/redata';
import DIV from '@vl/redata/DIV.macro';

import App from '@uz/unitz-app-web/UserApp';
import SEO from '@uz/unitz-layout-web/SEO';

import Layout from '@uz/unitz-layout-web/LayoutMain';
import ContentPageLayout from '@uz/unitz-ctf-theme/layouts/ContentPageLayout';
import useRoute from '@vl/hooks/useGbRoute';
import withPageContext from '@uz/unitz-pages/withPageContext';
import _ from 'lodash';
import PageData from '../../data/PageDataQuery';

const PageComponents = {
  ContentPageLayout,
};

export const component = withPageContext((props) => {
  const pageContext = useRoute().getPageContext();
  const pageLayout = _.get(pageContext, 'params.pageLayout');
  const PageComponent = _.get(PageComponents, pageLayout);
  return (
    <App>
      <Layout location={props.location} PageData={PageData}>
        <DIV>
          <SEO pageData={ctx.apply('ctf.findPage', { name: 'Homepage' })} />
          <Layout.POS name="app-header">{ctx.apply('ctf.renderSection', { name: 'articleNavbarSection' })}</Layout.POS>
          <Layout.POS name="app-body">{PageComponent ? <PageComponent /> : null}</Layout.POS>
          <Layout.POS name="app-footer">{ctx.apply('ctf.renderSection', { name: 'FooterSection' })}</Layout.POS>
        </DIV>
      </Layout>
    </App>
  );
});

export default component;
