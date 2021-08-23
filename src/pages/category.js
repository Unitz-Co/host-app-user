import React from 'react';
import _ from 'lodash';

import { ctx } from '@vl/redata';
import DIV from '@vl/redata/DIV.macro';
import { graphql, useStaticQuery } from 'gatsby';

import App from '@uz/unitz-app-web/UserApp';
import SEO from '@uz/unitz-layout-web/SEO';

import CategoryListPage from '@uz/unitz-pages/CategoryList';

import Layout from '@uz/unitz-layout-web/LayoutMain';

import PageData from '../data/PageDataQuery';

const CategoryIndex = (props) => {
  const allContentfulCategory = useStaticQuery(graphql`
    query CategoryIndexQuery {
      allContentfulCategory(filter: { node_locale: { eq: "en-US" } }) {
        nodes {
          id: contentful_id
          displayName
          longText {
            longText
          }
          image {
            fixed(width: 1600) {
              width
              height
              src
              srcSet
            }
          }
          avatarUrl {
            id
            fixed {
              src
            }
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
          <SEO pageData={ctx.apply('ctf.findPage', { name: 'Homepage' })} />
          <Layout.POS name="app-header">{ctx.apply('ctf.renderSection', { name: 'articleNavbarSection' })}</Layout.POS>
          <Layout.POS name="app-body">
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
