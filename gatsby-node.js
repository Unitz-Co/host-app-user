require('@vl/mod-config/web');
const _ = require('lodash');

const { gatsbyLoadTemplate } = require('@vl/mod-utils/gatsbyLoadTemplate');
const path = require('path');
const { withLocale } = require('@uz/mod-translations/utils');

exports.createPages = (gatsby) => {
  return Promise.all([gatsbyLoadTemplate({ gatsby })]);
};
// eslint-disable-next-line
exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  actions.setWebpackConfig({});
};

exports.onCreatePage = withLocale(async function ({ page, actions }) {
  const localeConfig = this;
  const pageSlug = page.path;
  const pagePath = localeConfig.langSlug(path.join('/', pageSlug));

  const pageContext = _.cloneDeep({
    ...page.context,
    lang: localeConfig.get('lang'),
  });

  await actions.createPage({
    ...page,
    path: pagePath,
    context: pageContext,
  });
});
