import React from 'react';

import { ctx } from '@vl/redata';
import DIV from '@vl/redata/DIV.macro';

import { Helmet } from 'react-helmet';
import App from '@uz/unitz-app-web/UserApp';

import Layout from '@uz/unitz-layout-web/LayoutMain';
import { Button } from 'antd';

import PageData from '../../data/PageDataQuery';

export const component = (props) => {
  return (
    <App>
      <Layout location={props.location} PageData={PageData}>
        <DIV>
          <Helmet title={'siteTitle'} />
          <Layout.POS name="app-header">{ctx.apply('ctf.renderSection', { name: 'articleNavbarSection' })}</Layout.POS>
          <Layout.POS name="app-body">
            <div className="wrapper app-row">
              <h2 className="section-headline">Home</h2>
              <div>
                <div>Category</div>
                <div>
                  <>
                    <Button type="primary">Primary Button</Button>
                    <Button>Default Button</Button>
                    <Button type="dashed">Dashed Button</Button>
                    <br />
                    <Button type="text">Text Button</Button>
                    <Button type="link">Link Button</Button>
                  </>
                </div>
              </div>
            </div>
          </Layout.POS>
          <Layout.POS name="app-footer">{ctx.apply('ctf.renderSection', { name: 'articleFooterSection' })}</Layout.POS>
        </DIV>
      </Layout>
    </App>
  );
};

export default component;
