import React from 'react';

import { ctx } from '@vl/redata';
import DIV from '@vl/redata/DIV.macro';

import { Helmet } from 'react-helmet';
import App from '@uz/unitz-app-web/UserApp';

import Layout from '@uz/unitz-layout-web/LayoutMain';
import ContentPageLayout from '@uz/unitz-ctf-theme/layouts/ContentPageLayout';
import useRoute from '@vl/hooks/useGbRoute';

import _ from 'lodash';
import PageData from '../../data/PageDataQuery';

const PageComponents = {
  ContentPageLayout,
};

export const component = (props) => {
  const pageContext = _.get(props, 'pageContext');
  // eslint-disable-next-line
  const route = useRoute();
  route.setPageContext(pageContext);

  const pageLayout = _.get(route, 'params.pageLayout');
  const PageComponent = _.get(PageComponents, pageLayout);

  return (
    <App>
      <Layout location={props.location} PageData={PageData}>
        <DIV>
          {ctx.debug(() => {
            ctx.set('pageContext', pageContext);
          })}
          <Helmet title={'siteTitle'} />
          <Layout.POS name="app-header">{ctx.apply('ctf.renderSection', { name: 'articleNavbarSection' })}</Layout.POS>
          <Layout.POS name="app-body">{PageComponent ? <PageComponent /> : null}</Layout.POS>
          <Layout.POS name="app-footer">{ctx.apply('ctf.renderSection', { name: 'articleFooterSection' })}</Layout.POS>
        </DIV>
      </Layout>
    </App>
  );
};

export default component;
