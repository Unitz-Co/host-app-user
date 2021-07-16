const path = require('path');
const _ = require('lodash');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');

exports.createPages = async (item, gatsby) => {
  // @update query
  const allNodes = await gatsby.graphql(`
  query pagesQuery {
    allContentfulPage {
      nodes {
        id: contentful_id
        name
        slug
        layout {
          id
          name
        }
      }
    }
  }`);

  const pages = _.get(allNodes, 'data.allContentfulPage.nodes', []);

  return Promise.all(
    pages.map((page) => {
      const pageSlug = routeStore.toUrl('page', page);
      const pagePath = path.join('/', pageSlug);
      const pageLayout = _.get(page, 'layout.name', 'ContentPageLayout');

      console.log('creating page', pagePath);
      return gatsby.actions.createPage({
        path: pagePath,
        component: item.resolvers.component(gatsby),
        context: {
          id: _.get(page, 'id'),
          slug: pageSlug,
          params: {
            ...page,
            pageLayout,
          },
        },
      });
    })
  );
};
