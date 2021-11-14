import React from 'react';

import { ctx } from '@vl/redata';
import DIV from '@vl/redata/DIV.macro';

import App from '@uz/unitz-app-web/UserApp';
import SEO from '@uz/unitz-layout-web/SEO';

import Layout from '@uz/unitz-layout-web/LayoutUserProfile';
import withPageContext from '@uz/unitz-pages/withPageContext';
// import UserNotification from '@uz/unitz-pages/UserNotification';

import PageData from '../../data/PageDataQuery';

const UserSettingIdx = withPageContext((props) => {
  return (
    <App>
      <Layout location={props.location} PageData={PageData}>
        <DIV>
          <SEO pageData={ctx.apply('ctf.findPage', { name: 'Homepage' })} />
          <Layout.POS name="app-header">{ctx.apply('ctf.renderSection', { name: 'articleNavbarSection' })}</Layout.POS>
          <Layout.POS name="app-body">
            <div className="min-h-full bg-background1">User profile menu - Setting page</div>
          </Layout.POS>
          <Layout.POS name="app-footer">
            <div className="hidden min-lg:block">
              {ctx.apply('ctf.renderSection', { name: 'FooterSection' })}
            </div>
          </Layout.POS>
        </DIV>
      </Layout>
    </App>
  );
});

export default UserSettingIdx;
