import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import { ctx } from '@vl/redata';
import DIV from '@vl/redata/DIV.macro';

import { Helmet } from 'react-helmet';
import HomePage from '@uz/unitz-pages/Home';

import Layout from '../components/layout'
import App from '../components/App';

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    return (
      <App>
        <Layout location={this.props.location}>
          <DIV>
            <Helmet title={siteTitle} />
            <Layout.POS name="app-header">
              {ctx.apply('ctf.renderSection', { name: 'articleNavbarSection' })}
            </Layout.POS>
            <Layout.POS name="app-body">
              <div className="wrapper app-row">
                <h2 className="section-headline">Home</h2>
                <HomePage />
              </div>
            </Layout.POS>
            <Layout.POS name="app-footer">
              {ctx.apply('ctf.renderSection', { name: 'articleFooterSection' })}
            </Layout.POS>
          </DIV>
        </Layout>
      </App>
    )
  }
}

export default RootIndex;

export const pageQuery = graphql`
  query HomeQuery {
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
