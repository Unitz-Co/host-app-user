const path = require('path');
const _ = require('lodash');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');
const { withLocale } = require('@uz/mod-translations/utils');

exports.createPages = withLocale(async function(item, gatsby) {
  const localeConfig = this;

  // return Promise.all(
  //   categories.map((cat) => {
  //     const catSlug = routeStore.toUrl('category', cat);
  //     const catPath = localeConfig.langSlug(path.join('/', catSlug));
  //     console.log('creating page', catPath);

  //     return gatsby.actions.createPage({
  //       path: catPath,
  //       component: item.resolvers.component(gatsby),
  //       context: _.cloneDeep({
  //         id: _.get(cat, 'id', 'id'),
  //         slug: catSlug,
  //         lang: localeConfig.get('lang'),
  //         params: {
  //           ...cat,
  //         },
  //       }),
  //     });
  //   })
  // );
});
