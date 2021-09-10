const path = require('path');
const _ = require('lodash');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');
const { withLocale } = require('@uz/mod-translations/utils');

exports.createPages = withLocale(async function(item, gatsby) {
  const localeConfig = this;
  // @update query
  const allNodes = await gatsby.graphql(`
  query pagesQuery {
    allContentfulPage(filter: { node_locale: { eq: "${localeConfig.get('locale')}" } }) {
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
      const pagePath = localeConfig.langSlug(path.join('/', pageSlug));
      const pageLayout = _.get(page, 'layout.name', 'ContentPageLayout');

      console.log('creating page', pagePath);
      return gatsby.actions.createPage({
        path: pagePath,
        component: item.resolvers.component(gatsby),
        context: {
          id: _.get(page, 'id', 'id'),
          slug: pageSlug,
          lang: localeConfig.get('lang'),
          params: {
            ...page,
            pageLayout,
          },
        },
      });
    })
  );
});
