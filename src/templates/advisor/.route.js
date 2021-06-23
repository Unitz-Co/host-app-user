const _ = require('lodash');
const slugify = require('slugify');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');

routeStore.addRule('advisor', {
  url: (params) => {
    const advisorId = _.get(params, 'id') || _.get(params, 'advisor_id');
    if (advisorId) {
      return `/advisor?id=${advisorId}`;
    }
    // from advisor displayName
    const displayName = _.get(params, 'displayName') || _.get(params, 'display_name');
    if (displayName) {
      return `/advisor?${slugify(displayName)}`;
    }
    return `/advisor`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'advisor';
  },
});
