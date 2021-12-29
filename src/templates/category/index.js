import React from 'react';

import { ctx } from '@vl/redata';
import DIV from '@vl/redata/DIV.macro';

import App from '@uz/unitz-app-web/UserApp';
import SEO from '@uz/unitz-layout-web/SEO';

import _ from 'lodash';
import Layout from '@uz/unitz-layout-web/LayoutMain';
import useRoute from '@vl/hooks/useGbRoute';
import DetailCategory from '@uz/unitz-pages/DetailCategory';
import EducationDetailCategory from '@uz/unitz-pages/EducationDetailCategory';
import withPageContext from '@uz/unitz-pages/withPageContext';

import PageData from '../../data/PageDataQuery';

export const component = withPageContext((props) => {
  const pageContext = useRoute().getPageContext();

  const isEducation = (() => {
    const currentId = _.get(pageContext, 'id');
    if (currentId === '6LsYTrdJ3VfYGcyglw8n5c') return true;
    const allCategories = _.get(pageContext, 'allCategories');
    const objectCategories = (id) => {
      const category = _.find(allCategories, (cat) => cat.id === id);
      const children = _.get(category, 'children', null);
      if (!children) return [];
      let nextChilds = [];
      _.map(children, (child) => {
        nextChilds = _.concat(nextChilds, objectCategories(child.id));
      });
      return [...children, ...nextChilds];
    };
    const childs = objectCategories('6LsYTrdJ3VfYGcyglw8n5c');

    return !!(_.findIndex(childs, (item) => item.id === currentId) !== -1);
  })();
  console.log({ isEducation });
  return (
    <App>
      <Layout location={props.location} PageData={PageData}>
        <DIV>
          <SEO
            pageData={{
              ...ctx.apply('ctf.findPage', { name: 'Homepage' }),
              seoTitle: `${_.map(_.get(pageContext, 'params.categories'), 'displayName').join()} ${_.get(
                pageContext,
                'params.displayName'
              )}`,
              seoMetaDescription: {
                seoMetaDescription: `${_.get(pageContext, 'params.displayName')}`,
              },
            }}
          />
          <Layout.POS name="app-header">{ctx.apply('ctf.renderSection', { name: 'articleNavbarSection' })}</Layout.POS>
          <Layout.POS name="app-body">{!!isEducation ? <EducationDetailCategory /> : <DetailCategory />}</Layout.POS>
          <Layout.POS name="app-footer">{ctx.apply('ctf.renderSection', { name: 'FooterSection' })}</Layout.POS>
        </DIV>
      </Layout>
    </App>
  );
});

export default component;
