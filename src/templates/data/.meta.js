const path = require('path');
const _ = require('lodash');
// const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');
const { withLocale } = require('@uz/mod-translations/utils');

require('@vl/mod-config/web');

// const hasuraClient = require('@vl/mod-clients/hasuraCtf');

exports.createPages = withLocale(async function(item, gatsby) {
  const localeConfig = this;
  // @update query
  const allNodes = await gatsby.graphql(`
  query DataQuery {
    allContentfulPage(filter: { node_locale: { eq: "${localeConfig.get('locale')}" } }) {
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
    allContentfulPage_vi_VN: allContentfulPage(filter: { node_locale: { eq: "vi-VN" } }) {
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
    allContentfulPage_en_US: allContentfulPage(filter: { node_locale: { eq: "en-US" } }) {
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
    allContentfulSection(filter: { node_locale: { eq: "en-US" } }) {
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
    allContentfulSection_en_US: allContentfulSection(filter: { node_locale: { eq: "en-US" } }) {
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
    allContentfulSection_vi_VN: allContentfulSection(filter: { node_locale: { eq: "vi-VN" } }) {
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
    allContentfulItem(filter: { node_locale: { eq: "en-US" } }) {
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
    allContentfulItem_en_US: allContentfulItem(filter: { node_locale: { eq: "en-US" } }) {
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
    allContentfulItem_vi_VN: allContentfulItem(filter: { node_locale: { eq: "vi-VN" } }) {
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
    allContentfulCategory(filter: { node_locale: { eq: "en-US" } }) {
      nodes {
        id: contentful_id
        displayName
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
    allContentfulCategory_en_US: allContentfulCategory(filter: { node_locale: { eq: "en-US" } }) {
      nodes {
        id: contentful_id
        displayName
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
    allContentfulCategory_vi_VN: allContentfulCategory(filter: { node_locale: { eq: "vi-VN" } }) {
      nodes {
        id: contentful_id
        displayName
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

  const data = _.get(allNodes, 'data', {});
  const slug = localeConfig.langSlug('/data');
  const pageContext = _.cloneDeep({
    data,
  });

  return gatsby.actions.createPage({
    path: slug,
    component: item.resolvers.component(gatsby),
    context: pageContext,
  });
});
