import React from 'react';

import { ctx } from '@vl/redata';
import DIV from '@vl/redata/DIV.macro';

import App from '@uz/unitz-app-web/UserApp';
import SEO from '@uz/unitz-layout-web/SEO';
import PurchaseCourse from '@uz/unitz-pages/PurchaseCourse';

import Layout from '@uz/unitz-layout-web/LayoutMain';
import withPageContext from '@uz/unitz-pages/withPageContext';

import _ from 'lodash';
import useRoute from '@vl/hooks/useGbRoute';
import CourseModel from '@uz/unitz-models/CourseModel';

import PageData from '../../../data/PageDataQuery';

export const component = withPageContext((props) => {
  const route = useRoute();
  const courseId = _.get(route, 'params.id', '');
  const [items, $items] = React.useState();
  const courseData = React.useCallback(async (courseId) => {
    try {
      const result = await CourseModel.find(`where: {id: {_eq: "${courseId}"}}`, 'name description photo_url');

      return $items(result.toObject() || {});
    } catch (err) {
      console.log(err);
    }
  }, []);

  React.useEffect(() => {
    courseData(courseId);
  }, [courseId]);

  const course = _.get(items, '0');
  return (
    <App>
      <Layout location={props.location} PageData={PageData}>
        <DIV>
          <SEO
            pageData={{
              ...ctx.apply('ctf.findPage', { name: 'Homepage' }),
              seoTitle: `${ctx.apply('i18n.t', 'UserPayment.payment')} - ${_.get(course, 'name', '')}`,
              seoMetaDescription: {
                seoMetaDescription: `${_.get(course, 'description', '')}`,
              },
              siteImage: _.get(course, 'photo_url', ''),
            }}
          />
          <Layout.POS name="app-header">{ctx.apply('ctf.renderSection', { name: 'articleNavbarSection' })}</Layout.POS>
          <Layout.POS name="app-body">
            <div className="wrapper app-row">
              <div className="relative overflow-hidden">
                <PurchaseCourse />
              </div>
            </div>
          </Layout.POS>
          <Layout.POS name="app-footer">{ctx.apply('ctf.renderSection', { name: 'FooterSection' })}</Layout.POS>
        </DIV>
      </Layout>
    </App>
  );
});

export default component;
