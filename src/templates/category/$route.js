const _ = require('lodash');
const slugify = require('slugify');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');

routeStore.addRule('category', {
  url: (params) => {
    const slug = _.get(params, 'slug') || _.snakeCase(_.get(params, 'displayName')) || _.get(params, 'id');
    return `/category/${slugify(slug, { replacement: '-' })}`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'category';
  },
});
