const _ = require('lodash');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');

routeStore.addRule('room', {
  url: (room) => {
    return `/room?id=${room.id}`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'room';
  },
});
