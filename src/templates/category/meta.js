const path = require('path');
const _ = require('lodash');

exports.createPages = async (item, gatsby) => {
  // @update query
  const pages = await gatsby.graphql(`
  query categoriesQuery {
    allContentfulPage {
      nodes {
        id
        name
        sections {
          ... on ContentfulSection {
            id
            name
            sys {
              type
              contentType {
                sys {
                  type
                  linkType
                  id
                }
              }
            }
          }
        }
      }
    }
  }`);

  const categories = _.get(pages, 'data.allContentfulPage.nodes', []);

  return Promise.all(
    categories.map((cat) => {
      const catSlug = _.get(cat, 'name');
      const catPath = path.join(item.base, catSlug);
      console.log('creating page', catPath);
      return gatsby.actions.createPage({
        path: catPath,
        component: item.resolvers.component(gatsby),
        context: {
          id: 'id',
          category: 'category',
          slug: catSlug,
        },
      });
    })
  );
};
