const path = require('path');
const _ = require('lodash');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');

require('@vl/mod-config/web');

const hasuraClient = require('@vl/mod-clients/hasuraCtf');

const getAllAdvisors = async () => {
  const query = hasuraClient.gql`
    query advisor {
      advisor {
        id
        profile {
          id
          ref_ctf_eid
        }
      }
    }
  `;
  try {
    const rtn = await hasuraClient.getClient().request(query);

    const data = _.get(rtn, 'advisor', []);
    return data;
  } catch (err) {
    console.log(err);
  }
  return [];
};

exports.createPages = async (item, gatsby) => {
  // @update query
  const allNodes = await gatsby.graphql(`
  query advisorQuery {
    allContentfulAdvisorProfile {
      nodes {
        id: contentful_id
        displayName
        email
        slug
      }
    }
  }`);
  console.log({ allNodes });
  const advisors = await getAllAdvisors();
  const advisorProfiles = _.get(allNodes, 'data.allContentfulAdvisorProfile.nodes', []);
  const advisorProfilesMapByProfileId = _.keyBy(advisorProfiles, 'id');

  return Promise.all(
    advisors.map((advisorData) => {
      const profileId = _.get(advisorData, 'profile.ref_ctf_eid');
      const advisor = {
        ...advisorData,
        profile: {
          ...advisorData.profile,
          ..._.get(advisorProfilesMapByProfileId, profileId),
        },
      };

      const paymentSlug = routeStore.toUrl('payment', advisor);
      const paymentPath = path.join('/', paymentSlug);
      console.log('creating page', paymentPath);
      const pageContext = _.cloneDeep({
        id: _.get(advisor, 'id', 'id'),
        slug: paymentSlug,
        params: {
          ...advisor,
        },
      });
      return gatsby.actions.createPage({
        path: paymentPath,
        component: item.resolvers.component(gatsby),
        context: pageContext,
      });
    })
  );
};
