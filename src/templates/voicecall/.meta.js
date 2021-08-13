const path = require('path');
const _ = require('lodash');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');

require('@vl/mod-config/web');

const hasuraClient = require('@vl/mod-clients/hasuraCtf');

const RULE_NAME = 'voicecall';

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

      const advisorSlug = routeStore.toUrl(RULE_NAME, advisor);
      const advisorPath = path.join('/', advisorSlug);

      console.log('creating page', advisorPath);
      const pageContext = _.cloneDeep({
        id: _.get(advisor, 'id', 'id'),
        slug: advisorSlug,
        params: {
          ...advisor,
          service_kind: 'voice',
        },
      });
      return gatsby.actions.createPage({
        path: advisorPath,
        component: item.resolvers.component(gatsby),
        context: pageContext,
      });
    })
  );
};
