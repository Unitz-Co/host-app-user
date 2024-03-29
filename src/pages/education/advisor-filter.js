import React from 'react';

import { ctx } from '@vl/redata';
import DIV from '@vl/redata/DIV.macro';

import EducationAdvisorFilter from '@uz/unitz-pages/EducationAdvisorFilter';
import FacebookMessenger from '@uz/unitz-components-web/FacebookMessenger';
import withPageContext from '@uz/unitz-pages/withPageContext';
import App from '@uz/unitz-app-web/UserApp';
import SEO from '@uz/unitz-layout-web/SEO';

import Layout from '@uz/unitz-layout-web/LayoutMain';

import PageData from '../../data/PageDataQuery';

const AdvisorFilterIndex = withPageContext((props) => {
  return (
    <App>
      <Layout location={props.location} PageData={PageData}>
        <DIV>
          <SEO pageData={ctx.apply('ctf.findPage', { name: 'Homepage' })} />
          <Layout.POS name="app-header">{ctx.apply('ctf.renderSection', { name: 'articleNavbarSection' })}</Layout.POS>
          <Layout.POS name="app-body">
            <EducationAdvisorFilter />
            <FacebookMessenger />
          </Layout.POS>
          <Layout.POS name="app-footer">{ctx.apply('ctf.renderSection', { name: 'FooterSection' })}</Layout.POS>
        </DIV>
      </Layout>
    </App>
  );
});

export default AdvisorFilterIndex;
