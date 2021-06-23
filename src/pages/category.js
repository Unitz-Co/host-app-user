import React from 'react';
import _ from 'lodash';

import { ctx } from '@vl/redata';
import DIV from '@vl/redata/DIV.macro';
import { graphql, useStaticQuery } from 'gatsby';

import { Helmet } from 'react-helmet';
import App from '@uz/unitz-app-web/UserApp';
import CategoryListPage from '@uz/unitz-pages/CategoryList';

import Layout from '@uz/unitz-layout-web/LayoutMain';

import PageData from '../data/PageDataQuery';

const CategoryIndex = (props) => {
  const allContentfulCategory = useStaticQuery(graphql`
    query CategoryIndexQuery {
      allContentfulCategory {
        nodes {
          id: contentful_id
          displayName
          avatarUrl {
            id
          }
          slug
        }
      }
    }
  `);
  const categories = _.get(allContentfulCategory, 'allContentfulCategory.nodes', []);

  return (
    <App>
      <Layout location={props.location} PageData={PageData}>
        <DIV>
          <Helmet title={'siteTitle'} />
          <Layout.POS name="app-header">{ctx.apply('ctf.renderSection', { name: 'articleNavbarSection' })}</Layout.POS>
          <Layout.POS name="app-body">
            <div className="wrapper app-row">Category listing</div>
            <DIV forceCtx>
              {ctx.debug(() => {
                ctx.set('categories', categories);
              })}
              <CategoryListPage />
            </DIV>
          </Layout.POS>
          <Layout.POS name="app-footer">{ctx.apply('ctf.renderSection', { name: 'articleFooterSection' })}</Layout.POS>
        </DIV>
      </Layout>
    </App>
  );
};

export default CategoryIndex;
