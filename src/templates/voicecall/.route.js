const _ = require('lodash');
const slugify = require('slugify');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');

const RULE_NAME = 'voicecall';

routeStore.addRule(RULE_NAME, {
  url: (params) => {
    // from slug from advisor profile
    const slug = _.get(params, 'slug') || _.get(params, 'profile.slug');
    if (slug) {
      return `${slug}`.replace('advisor', RULE_NAME);
    }
    // from advisor displayName
    const displayName = _.get(params, 'displayName') || _.get(params, 'display_name');
    if (displayName) {
      return `/${RULE_NAME}?${slugify(displayName)}`;
    }
    // from advisorId
    const advisorId = _.get(params, 'id') || _.get(params, 'advisor_id');
    if (advisorId) {
      return `/${RULE_NAME}?id=${advisorId}`;
    }
    return `/${RULE_NAME}`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === RULE_NAME;
  },
});
