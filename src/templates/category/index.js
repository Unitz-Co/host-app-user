import React from 'react';

import { ctx } from '@vl/redata';
import DIV from '@vl/redata/DIV.macro';

import App from '@uz/unitz-app-web/UserApp';
import SEO from '@uz/unitz-layout-web/SEO';

import _ from 'lodash';
import Layout from '@uz/unitz-layout-web/LayoutMain';
import useRoute from '@vl/hooks/useGbRoute';
import DetailCategory from '@uz/unitz-pages/DetailCategory';
import withPageContext from '@uz/unitz-pages/withPageContext';

import PageData from '../../data/PageDataQuery';

export const component = withPageContext((props) => {
  const pageContext = _.get(props, 'pageContext');
  // eslint-disable-next-line
  const route = useRoute();
  route.setPageContext(pageContext);
  return (
    <App>
      <Layout location={props.location} PageData={PageData}>
        <DIV>
          <SEO pageData={ctx.apply('ctf.findPage', { name: 'Homepage' })} />
          <Layout.POS name="app-header">{ctx.apply('ctf.renderSection', { name: 'articleNavbarSection' })}</Layout.POS>
          <Layout.POS name="app-body">
            <DetailCategory />
          </Layout.POS>
          <Layout.POS name="app-footer">{ctx.apply('ctf.renderSection', { name: 'articleFooterSection' })}</Layout.POS>
        </DIV>
      </Layout>
    </App>
  );
});

export default component;
