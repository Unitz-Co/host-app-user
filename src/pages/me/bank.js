import React from 'react';

import { ctx } from '@vl/redata';
import DIV from '@vl/redata/DIV.macro';

import App from '@uz/unitz-app-web/UserApp';
import SEO from '@uz/unitz-layout-web/SEO';

// import Layout from '@uz/unitz-layout-web/LayoutMain';
import Layout from '@uz/unitz-layout-web/LayoutUserProfile';
import withPageContext from '@uz/unitz-pages/withPageContext';
import UserBankList from '@uz/unitz-pages/UserBankList';

import PageData from '../../data/PageDataQuery';

const UserBankListIdx = withPageContext((props) => {
  return (
    <App>
      <Layout location={props.location} PageData={PageData}>
        <DIV>
          <SEO pageData={ctx.apply('ctf.findPage', { name: 'Homepage' })} />
          <Layout.POS name="app-header">{ctx.apply('ctf.renderSection', { name: 'articleNavbarSection' })}</Layout.POS>
          <Layout.POS name="app-body">
            <div className="min-h-full bg-background1">
              <UserBankList />
            </div>
          </Layout.POS>
          <Layout.POS name="app-footer">
            <div className="hidden min-lg:block">
              {ctx.apply('ctf.renderSection', { name: 'articleFooterSection' })}
            </div>
          </Layout.POS>
        </DIV>
      </Layout>
    </App>
  );
});

export default UserBankListIdx;
