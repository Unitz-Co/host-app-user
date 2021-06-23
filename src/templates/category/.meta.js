const path = require('path');
const _ = require('lodash');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');

exports.createPages = async (item, gatsby) => {
  // @update query
  const allNodes = await gatsby.graphql(`
  query categoriesQuery {
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
  }`);

  const categories = _.get(allNodes, 'data.allContentfulCategory.nodes', []);

  return Promise.all(
    categories.map((cat) => {
      const catSlug = routeStore.toUrl('category', cat);
      const catPath = path.join('/', catSlug);
      console.log('creating page', catPath);
      return gatsby.actions.createPage({
        path: catPath,
        component: item.resolvers.component(gatsby),
        context: {
          id: _.get(cat, 'id', 'id'),
          slug: catSlug,
        },
      });
    })
  );
};
