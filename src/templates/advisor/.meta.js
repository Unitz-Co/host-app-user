const path = require('path');
const _ = require('lodash');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');

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

  const advisors = _.get(allNodes, 'data.allContentfulAdvisorProfile.nodes', []);

  return Promise.all(
    advisors.map((advisor) => {
      const advisorSlug = routeStore.toUrl('advisor', advisor);
      const advisorPath = path.join('/', advisorSlug);
      console.log('creating page', advisorPath);
      return gatsby.actions.createPage({
        path: advisorPath,
        component: item.resolvers.component(gatsby),
        context: {
          id: _.get(advisor, 'id', 'id'),
          slug: advisorSlug,
          params: {
            ...advisor,
          },
        },
      });
    })
  );
};
