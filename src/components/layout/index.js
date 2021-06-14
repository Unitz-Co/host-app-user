import React from 'react';
import GbContentfulProvider from '@uz/unitz-providers/GbContentfulProvider';
import createLayout from '@vl/mod-utils/createLayout';

import 'bootstrap/dist/css/bootstrap.css'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import '../base.css';

import Container from '../container'
import PageDataQuery from '../PageDataQuery';

export const Layout = createLayout(({ children }) => {
  return (
    <PageDataQuery>{(ctfData) => {
      return (
        <GbContentfulProvider data={ctfData}>
          <Container>
            <div style={{ background: '#fff' }} className="flex flex-column min-h-screen">
              {children}
              <div className="app-header">
                <Layout.RenderPOS name="app-header" />
              </div>
              <div className="app-body flex-1">
                <Layout.RenderPOS name="app-body" />
              </div>
              <div className="app-footer">
                <Layout.RenderPOS name="app-footer" />
              </div>
            </div>
          </Container>
        </GbContentfulProvider>
      );
    }}</PageDataQuery>
  )
});

export default Layout;

