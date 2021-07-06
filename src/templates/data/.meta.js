const path = require('path');
const _ = require('lodash');
// const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');

require('@vl/mod-config/web');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

// const hasuraClient = require('@vl/mod-clients/hasuraCtf');

exports.createPages = async (item, gatsby) => {
  // @update query
  const allNodes = await gatsby.graphql(`
  query DataQuery {
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
    allContentfulSection {
      nodes {
        id
        name
        shortText
        longText {
          longText
        }
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
          ... on ContentfulItem {
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
            component {
              id
              name
            }
          }
        }
        layout {
          id
          name
        }
        enhancers {
          id
          name
        }
      }
    }
    allContentfulItem {
      nodes {
        id
        name
        shortText
        longText {
          longText
        }
        detailText {
          detailText
        }
        action
        linkHref
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
        component {
          id
          name
        }
        enhancers {
          id
          name
        }
      }
    }
  }`);

  const data = _.get(allNodes, 'data', {});
  const slug = '/data';
  const pageContext = _.cloneDeep({
    data,
  });

  return gatsby.actions.createPage({
    path: slug,
    component: item.resolvers.component(gatsby),
    context: pageContext,
  });
};
