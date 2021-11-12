import React from 'react';
import _ from 'lodash';

import { ctx } from '@vl/redata';
import DIV from '@vl/redata/DIV.macro';
import { graphql, useStaticQuery } from 'gatsby';

import App from '@uz/unitz-app-web/UserApp';
import SEO from '@uz/unitz-layout-web/SEO';

import CategoryListPage from '@uz/unitz-pages/CategoryList';
import withPageContext, { provideData } from '@uz/unitz-pages/withPageContext';
import useRoute from '@vl/hooks/useGbRoute';

import Layout from '@uz/unitz-layout-web/LayoutMain';

import PageData from '../data/PageDataQuery';

const CategoryIndex = withPageContext((props) => {
  const route = useRoute();
  const pageContext = route.getPageContext();

  const allContentfulCategory = useStaticQuery(graphql`
    query CategoryIndexQuery {
      allContentfulCategory {
        nodes {
          node_locale
          id: contentful_id
          displayName
          avatarUrl {
            id
            fixed {
              src
            }
          }
          icon
          longText {
            longText
          }
          slug
          images {
            fixed(width: 1600) {
              width
              height
              src
              srcSet
            }
          }
          image {
            fixed(width: 1600) {
              width
              height
              src
              srcSet
            }
          }
          children: chidlren {
            ... on ContentfulCategory {
              id: contentful_id
            }
          }
        }
      }
    }
  `);
  const categories = _.get(allContentfulCategory, 'allContentfulCategory.nodes', []);
  provideData('categories', _.filter(categories, { node_locale: pageContext.locale }));

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
          <Layout.POS name="app-footer">{ctx.apply('ctf.renderSection', { name: 'FooterSection' })}</Layout.POS>
        </DIV>
      </Layout>
    </App>
  );
});

export default CategoryIndex;
