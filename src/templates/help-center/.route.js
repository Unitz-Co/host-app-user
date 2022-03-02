const _ = require('lodash');
const slugify = require('slugify');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');

routeStore.addRule('help-center', {
  url: (params) => {
    const slug = _.get(params, 'slug') || _.get(params, 'name') || _.get(params, 'id');
    return `/help-center/${slugify(slug)}`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'help-center';
  },
});
