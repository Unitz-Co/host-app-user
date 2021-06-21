/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const _ = require('lodash');

// You can delete this file if you're not using it
exports.onPreInit = async (...args) => {
  const [{ actions, store }] = args;
  // console.log('args', args)
  const state = store.getState();
  const plugin = _.find(state.flattenedPlugins, { name: 'gatsby-plugin-manifest' });
  if (plugin) {
    plugin.pluginOptions = {
      ...plugin.pluginOptions,
      ...{ icon: 'src/assets/images/favicon2.png' },
    };
    actions.setPluginStatus({ pluginOptions: plugin.pluginOptions }, plugin);
  }
  throw Error('error');
};
