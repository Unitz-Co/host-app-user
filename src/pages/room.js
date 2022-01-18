import React from 'react';

import { ctx } from '@vl/redata';
import DIV from '@vl/redata/DIV.macro';

import App from '@uz/unitz-app-web/UserApp';
import SEO from '@uz/unitz-layout-web/SEO';

import Layout from '@uz/unitz-layout-web/LayoutMain';
import withPageContext from '@uz/unitz-pages/withPageContext';
import RoomPage from '@uz/unitz-pages/RoomSession';

import PageData from '../data/PageDataQuery';
import _ from 'lodash';
import useRoute from '@vl/hooks/useGbRoute';
import CourseRoomModel from '@uz/unitz-models/CourseRoomModel';
import CourseModelFormatter from '@uz/unitz-models/CourseModel/formatter';

const RoomIndex = withPageContext((props) => {
  // const route = useRoute();
  // const roomId = _.get(route, 'params.id', '');
  // const [items, $items] = React.useState();
  // const courseData = React.useCallback(async (roomId) => {
  //   try {
  //     const result = await CourseRoomModel.find(
  //       `where: {id: {_eq: "${roomId}"}}`,
  //       'start_at end_at course{name description photo_url}'
  //     );

  //     return $items(result.toObject() || {});
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  // React.useEffect(() => {
  //   courseData(roomId);
  // }, [roomId]);

  // const room = _.get(items, '0');
  // const roomName = `${CourseModelFormatter.sessionTimeHour(ctx)(room)} ${CourseModelFormatter.startAt(ctx)(room)}`;

  return (
    <App>
      <Layout location={props.location} PageData={PageData}>
        <DIV>
          {/* <SEO
            pageData={{
              ...ctx.apply('ctf.findPage', { name: 'Homepage' }),
              seoTitle: `${roomName || ''} | ${_.get(room, 'course.name', '')}`,
              seoMetaDescription: {
                seoMetaDescription: `${_.get(room, 'course.description', '')}`,
              },
              siteImage: _.get(room, 'course.photo_url', ''),
            }}
          /> */}
          <Layout.POS name="app-header">
            <div></div>
          </Layout.POS>
          <Layout.POS name="app-body">
            <RoomPage />
          </Layout.POS>
          <Layout.POS name="app-footer">
            <div></div>
          </Layout.POS>
        </DIV>
      </Layout>
    </App>
  );
});

export default RoomIndex;
