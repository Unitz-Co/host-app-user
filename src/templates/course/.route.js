const _ = require('lodash');
const slugify = require('slugify');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');
const querystring = require('querystring');

routeStore.addRule('course', {
  url: (params) => {
    if (process.env.GATSBY_APP_ENV && _.get(params, 'slug')) {
      return `/courses/${_.get(params, 'slug')}`;
    }

    let search = `${querystring.stringify(params)}`;
    search = search ? `?${search}` : '';
    return `/course${search}`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'course';
  },
});

routeStore.addRule('courseDetail', {
  url: (params) => {
    if (process.env.GATSBY_APP_ENV && _.get(params, 'slug')) {
      return `/courses/${_.get(params, 'slug')}`;
    }

    let search = `${querystring.stringify(_.pick(params, ['id']))}`;
    search = search ? `?${search}` : '';
    return `/course/detail${search}`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'course/detail';
  },
});

routeStore.addRule('coursePurchase', {
  url: (params) => {
    let search = `${querystring.stringify(_.pick(params, ['id']))}`;
    search = search ? `?${search}` : '';
    return `/course/purchase${search}`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'course/purchase';
  },
});

routeStore.addRule('courseEdit', {
  url: (params) => {
    const id = _.get(params, 'id', 'unknown');
    return `/course/edit?id=${id}`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'course/edit';
  },
});

routeStore.addRule('courseAdd', {
  url: () => {
    return `/course/add`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'course/add';
  },
});
