import React from 'react';

import { ctx } from '@vl/redata';
import DIV from '@vl/redata/DIV.macro';

import { Helmet } from 'react-helmet';

import VideoPage from '@uz/unitz-pages/VideoCall';

import App from '@uz/unitz-app-web/UserApp';

import Layout from '@uz/unitz-layout-web/LayoutMain';

import PageData from '../data/PageDataQuery';

const VideoCall = (props) => {
  return (
    <App>
      <Layout location={props.location} PageData={PageData}>
        <DIV>
          <Helmet title={'Video Call'}>
            <script src="https://static.opentok.com/v2/js/opentok.min.js"></script>
          </Helmet>
          {/* <Layout.POS name="app-header">{ctx.apply('ctf.renderSection', { name: 'articleNavbarSection' })}</Layout.POS> */}
          <Layout.POS name="app-body">
            <div className="relative h-screen overflow-hidden bg-main">
              <VideoPage />
            </div>
          </Layout.POS>
          {/* <Layout.POS name="app-footer">{ctx.apply('ctf.renderSection', { name: 'articleFooterSection' })}</Layout.POS> */}
        </DIV>
      </Layout>
    </App>
  );
};

export default VideoCall;
