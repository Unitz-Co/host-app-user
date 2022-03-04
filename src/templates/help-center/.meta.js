const path = require('path');
const _ = require('lodash');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');
const { withLocale } = require('@uz/mod-translations/utils');

exports.createPages = withLocale(async function(item, gatsby) {
  const localeConfig = this;
  // @update query
  const allNodes = await gatsby.graphql(`
  query pagesQuery {
    allContentfulHelpCenter(filter: { node_locale: { eq: "${localeConfig.get('locale')}" } }) {
      nodes {
        id: contentful_id
        name
        title
        richText {
          raw
          references {
            ... on ContentfulAsset {
              contentful_id
              __typename
              title
              fixed(width: 850) {
                src
              }
            }
          }
        }
        slug
      }
    }
  }`);

  const pages = _.get(allNodes, 'data.allContentfulHelpCenter.nodes', []);

  return Promise.all(
    pages.map((page) => {
      const pageSlug = routeStore.toUrl('help-center', page);
      const pagePath = localeConfig.langSlug(path.join('/', pageSlug));

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
          },
        },
      });
    })
  );
});
