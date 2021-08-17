require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'production'}`,
});
const _ = require('lodash');
const { gatsbyMergeConfig } = require('@vl/mod-utils/gatsbyMergeConfig');

const domainConfigs = {
  'unitz.app': require('./domains/unitz.app/gatsby-config'),
  'unitz.vn': require('./domains/unitz.vn/gatsby-config'),
};

const targetDomain = _.get(domainConfigs, process.env.TARGET_DOMAIN || 'unitz.app') || {};

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || process.env.CONTENTFUL_DELIVERY_TOKEN,
};

// If you want to use the preview API please define
// CONTENTFUL_HOST and CONTENTFUL_PREVIEW_ACCESS_TOKEN in your
// environment config.
//
// CONTENTFUL_HOST should map to `preview.contentful.com`
// CONTENTFUL_PREVIEW_ACCESS_TOKEN should map to your
// Content Preview API token
//
// For more information around the Preview API check out the documentation at
// https://www.contentful.com/developers/docs/references/content-preview-api/#/reference/spaces/space/get-a-space/console/js
//
// To change back to the normal CDA, remove the CONTENTFUL_HOST variable from your environment.
if (process.env.CONTENTFUL_HOST) {
  contentfulConfig.host = process.env.CONTENTFUL_HOST;
  contentfulConfig.accessToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;
}

const { spaceId, accessToken } = contentfulConfig;

if (!spaceId || !accessToken) {
  throw new Error('Contentful spaceId and the access token need to be provided.');
}

const gbConfig = gatsbyMergeConfig(
  {
    siteMetadata: {
      title: 'Gatsby Contentful starter',
    },
    pathPrefix: '/gatsby-contentful-starter',
    plugins: [
      'gatsby-transformer-remark',
      'gatsby-transformer-sharp',
      'gatsby-plugin-react-helmet',
      'gatsby-plugin-sharp',
      'gatsby-plugin-postcss',
      'gatsby-plugin-sass',
      {
        resolve: 'gatsby-source-contentful',
        options: contentfulConfig,
      },
      {
        resolve: 'gatsby-source-contentful',
        options: {
          spaceId: process.env.CONTENTFUL_SPACE_ID_WEBSITE,
          // Learn about environment variables: https://gatsby.dev/env-vars
          accessToken: process.env.CONTENTFUL_ACCESS_TOKEN_WEBSITE,
        },
      },
      {
        resolve: 'gatsby-source-contentful',
        options: {
          spaceId: process.env.CONTENTFUL_SPACE_ID_APP,
          accessToken: process.env.CONTENTFUL_ACCESS_TOKEN_APP,
        },
      },
      {
        resolve: 'gatsby-plugin-manifest',
        options: {
          name: 'gatsby-starter-default',
          short_name: 'starter',
          start_url: '/',
          background_color: '#663399',
          theme_color: '#663399',
          display: 'minimal-ui',
          icon: 'src/assets/images/favicon.png', // This path is relative to the root of the site.
        },
      },
      'gatsby-manifest-contentful',
      {
        resolve: 'gatsby-plugin-firebase',
        options: {
          credentials: {
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
            databaseURL: process.env.FIREBASE_DATABASE_URL,
            projectId: process.env.FIREBASE_PROJECT_ID,
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.FIREBASE_APP_ID,
          },
        },
      },
      {
        resolve: 'gatsby-plugin-import',
        options: {
          libraryName: 'antd',
          style: false, // or 'css'
        },
      },
      {
        resolve: 'gatsby-plugin-import',
        options: {
          libraryName: 'lodash',
        },
      },
      {
        resolve: 'gatsby-plugin-svgr-svgo',
        options: {
          inlineSvgOptions: [
            {
              test: /\.(svg|svgx)$/,
              svgoConfig: {
                plugins: [
                  {
                    removeViewBox: false,
                    convertStyleToAttrs: true,
                  },
                ],
              },
            },
          ],
        },
      },
      // {
      //   resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
      //   options: {
      //     analyzerMode: 'server',
      //     analyzerPort: '8888',
      //     defaultSizes: 'gzip',
      //   },
      // },
    ],
  },
  targetDomain
);

module.exports = gbConfig;
