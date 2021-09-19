import React from 'react';

import { ctx } from '@vl/redata';
import DIV from '@vl/redata/DIV.macro';

import App from '@uz/unitz-app-web/UserApp';
import SEO from '@uz/unitz-layout-web/SEO';

import Layout from '@uz/unitz-layout-web/LayoutMain';
import withPageContext from '@uz/unitz-pages/withPageContext';
import RoomPage from '@uz/unitz-pages/RoomSession';

import PageData from '../data/PageDataQuery';

const RoomIndex = withPageContext((props) => {
  return (
    <App>
      <Layout location={props.location} PageData={PageData}>
        <DIV>
          <SEO pageData={ctx.apply('ctf.findPage', { name: 'Homepage' })} />
          <Layout.POS name="app-header">
            <div></div>
          </Layout.POS>
          <Layout.POS name="app-body">
            <RoomPage />
          </Layout.POS>
          <Layout.POS name="app-footer">
            <div></div>
          </Layout.POS>
        </DIV>
      </Layout>
    </App>
  );
});

export default RoomIndex;
