const _ = require('lodash');
const slugify = require('slugify');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');

routeStore.addRule('userProfileMenu', {
  url: (params) => {
    return `/me/${params}`;
  },
  // parse: (urlObject) => {
  //   const params = {};
  //   for (let param in urlObject.searchParams) {
  //     params[param] = urlObject.searchParams.get(param);
  //   }
  //   return params;
  // },
  // match: (urlObject) => {
  //   return urlObject.pathname === 'me/${params}';
  // },
});

routeStore.addRule('activities-history-detail', {
  url: (params) => {
    return `/me/activities-history-detail?id=${_.get(params, 'id')}`;
  },
});
