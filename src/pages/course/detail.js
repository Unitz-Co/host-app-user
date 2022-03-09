import React from 'react';

import withPageContext from '@uz/unitz-pages/withPageContext';
import App from '@uz/unitz-app-web/UserApp';
import Layout from '@uz/unitz-layout-web/LayoutMain';
import PageData from '../../data/PageDataQuery';
import DIV from '@vl/redata/DIV.macro';
import SEO from '@uz/unitz-layout-web/SEO';
import { ctx } from '@vl/redata';
import _ from 'lodash';
import useRoute from '@vl/hooks/useGbRoute';
import CourseDetail from '@uz/unitz-pages/CourseDetail';
import CourseModel from '@uz/unitz-models/CourseModel';
import { Helmet } from 'react-helmet';

const Index = withPageContext((props) => {
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
  console.log({ PageData });
  return (
    <>
      <Helmet>
        <link rel="stylesheet" type="text/css" href="/seo.css" />
      </Helmet>
      <App>
        <Layout location={props.location} PageData={PageData}>
          <DIV>
            <SEO
              pageData={{
                ...ctx.apply('ctf.findPage', { name: 'Homepage' }),
                seoTitle: `${_.get(course, 'name', '')} | Unitz`,
                seoMetaDescription: {
                  seoMetaDescription: `${_.get(course, 'description', '')}`,
                },
                siteImage: _.get(course, 'photo_url', ''),
              }}
            />
            <Layout.POS name="app-header">
              {ctx.apply('ctf.renderSection', { name: 'articleNavbarSection' })}
            </Layout.POS>
            <Layout.POS name="app-body">
              <div className="bg-white500">
                <div className="wrapper app-row">
                  <CourseDetail />
                </div>
              </div>
            </Layout.POS>
            <Layout.POS name="app-footer">{ctx.apply('ctf.renderSection', { name: 'FooterSection' })}</Layout.POS>
          </DIV>
        </Layout>
      </App>
    </>
  );
});

export default Index;
