const _ = require('lodash');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');

const RULE_NAME = 'videocall';
const RULE_NAMES = `${RULE_NAME}s`;

routeStore.addRule(RULE_NAME, {
  url: (params) => {
    // from slug from advisor profile
    const slug = _.get(params, 'slug') || _.get(params, 'profile.slug');
    if (process.env.GATSBY_APP_ENV && slug) {
      return `${slug}`.replace('advisor', RULE_NAMES);
    }

    // from advisorId
    const advisorId = _.get(params, 'id') || _.get(params, 'advisor_id');
    if (advisorId) {
      return `/${RULE_NAME}/${advisorId}`;
    }
    return `/${RULE_NAMES}/detail?id=${advisorId}`;
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
