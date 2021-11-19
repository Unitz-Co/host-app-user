import React from 'react';

import { ctx } from '@vl/redata';
import DIV from '@vl/redata/DIV.macro';

import App from '@uz/unitz-app-web/UserApp';
import SEO from '@uz/unitz-layout-web/SEO';

import Layout from '@uz/unitz-layout-web/LayoutMain';
import CtfPage404 from '@uz/unitz-pages/404Page';
import withPageContext from '@uz/unitz-pages/withPageContext';
import PageData from '../data/PageDataQuery';

export const Page404 = withPageContext((props) => {
  return (
    <App>
      <Layout location={props.location} PageData={PageData}>
        <DIV>
          <SEO pageData={ctx.apply('ctf.findPage', { name: 'Page404' })} />
          <Layout.POS name="app-body">
            <div className="flex justify-center items-center h-screen">
              <CtfPage404 />
            </div>
          </Layout.POS>
        </DIV>
      </Layout>
    </App>
  );
});

export default Page404;
