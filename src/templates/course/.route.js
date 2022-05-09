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

routeStore.addRule('course:origin', {
  url: (params) => {
    const user_id = _.get(params, 'user_id');
    if (process.env.GATSBY_APP_ENV && _.get(params, 'slug')) {
      return `${routeStore.getAppOrigin('user')}/courses/${_.get(params, 'slug')}`;
    }
    return `${routeStore.getAppOrigin('user')}/course/detail?id=${_.get(params, 'id')}`;
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

routeStore.addRule('filterCourse', {
  url: (params) => {
    const id = _.get(params, 'id', 'unknown');
    let search = `${querystring.stringify(_.pick(params, ['category', 'search']))}`;
    search = search ? `?${search}` : '';
    return `/education/course-filter${search}`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === '/education/course-filter';
  },
});

routeStore.addRule('coursePreview', {
  url: (params) => {
    if (process.env.GATSBY_APP_ENV && _.get(params, 'slug')) {
      return `${routeStore.getAppOrigin('user')}/courses/${_.get(params, 'slug')}`;
    }

    const id = _.get(params, 'id', 'unknown');
    return `${routeStore.getAppOrigin('user')}/course/detail?id=${id}`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'course/preview';
  },
});

routeStore.addRule('coursePurchase', {
  url: (params) => {
    let search = `${querystring.stringify(_.pick(params, ['id']))}`;
    const referral_code = _.get(params, 'referral_code') ? `&referral_code=${_.get(params, 'referral_code')}` : '';
    search = search ? `?${search}` : '';
    return `/course/purchase${search}${referral_code}`;
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
