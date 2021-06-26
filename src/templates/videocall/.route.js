const _ = require('lodash');
const slugify = require('slugify');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');

routeStore.addRule('videocall', {
  url: params => {
    const slug = _.get(params, 'slug') || _.get(params, 'displayName') || _.get(params, 'id');
    return `/videocall/${slugify(`${slug}`)}`;
  },
  parse: urlObject => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: urlObject => {
    return urlObject.pathname === 'videocall';
  },
});
