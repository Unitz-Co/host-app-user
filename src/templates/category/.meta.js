const path = require('path');
const _ = require('lodash');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');
const { withLocale } = require('@uz/mod-translations/utils');

exports.createPages = withLocale(async function(item, gatsby) {
  const localeConfig = this;
  // @update query
  const allNodes = await gatsby.graphql(`
  query categoriesQuery {
    allContentfulCategory(filter: { node_locale: { eq: "${localeConfig.get('locale')}" } }) {
      nodes {
        id: contentful_id
        displayName
        avatarUrl {
          id
          fixed {
            src
          }
        }
        icon
        longText {
          longText
        }
        slug
        images {
          fixed(width: 1600) {
            width
            height
            src
            srcSet
          }
        }
        image {
          fixed(width: 1600) {
            width
            height
            src
            srcSet
          }
        }
        children: chidlren {
          ... on ContentfulCategory {
            id: contentful_id
          }
        }
      }
    }
  }`);

  const categories = _.get(allNodes, 'data.allContentfulCategory.nodes', []);

  return Promise.all(
    categories.map((cat) => {
      const catSlug = routeStore.toUrl('category', cat);
      const catPath = localeConfig.langSlug(path.join('/', catSlug));
      console.log('creating page', catPath);
      return gatsby.actions.createPage({
        path: catPath,
        component: item.resolvers.component(gatsby),
        context: {
          id: _.get(cat, 'id', 'id'),
          slug: catSlug,
          params: {
            ...cat,
          },
        },
      });
    })
  );
});
