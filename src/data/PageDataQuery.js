import { graphql, useStaticQuery } from 'gatsby';

const pageDataQuery = graphql`
  query GbCtfProviderQuery {
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
        longText
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
  }
`;

export const PageData = ({ children }) => {
  const res = useStaticQuery(pageDataQuery);
  return children(res);
};

export default PageData;
