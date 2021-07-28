import { graphql, useStaticQuery } from 'gatsby';

const pageDataQuery = graphql`
  query GbCtfProviderQuery {
    allContentfulPage {
      nodes {
        id
        name
        slug
        sections {
          ... on ContentfulSection {
            id
            name
            className
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
        detailText {
          detailText
        }
        richText {
          raw
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
            className
            shortText
            slug
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
            shortText
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
        contentful_id
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
    allContentfulItem {
      nodes {
        id
        name
        shortText
        richText {
          raw
        }
        longText {
          longText
        }
        detailText {
          detailText
        }
        className
        action
        linkHref
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
        component {
          id
          name
        }
        enhancers {
          id
          name
        }
        contentful_id
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
        longText {
          longText
        }
      }
    }
    allContentfulCategory {
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
      }
    }
  }
`;

export const PageData = ({ children }) => {
  const res = useStaticQuery(pageDataQuery);
  return children(res);
};

export default PageData;
