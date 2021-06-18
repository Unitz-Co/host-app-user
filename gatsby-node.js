require('@vl/mod-config/web');

const path = require('path');
const fs = require('fs-extra');
const _ = require('lodash');

const glob = require('glob');

const items = [];
const PREFIX_PATH = './src/templates';
glob.sync( './src/templates/**/index.js' ).forEach( function( file ) {
  const templateDir = file.replace('index.js', '')
  const itemBase = templateDir.replace(PREFIX_PATH, '');
  const templateMetaFile = path.resolve(path.join(templateDir, 'meta.js'));
  let meta;
  if (fs.existsSync(templateMetaFile)) {
    meta = require(templateMetaFile);
  }

  const item = {
    base: itemBase,
    component: path.resolve(file),
    meta,
    resolvers: {
      path: (gatsby) => {
        if(_.isFunction(_.get(meta, 'path'))) {
          return meta.path(item, gatsby);
        }
        return itemBase;
      },
      context: (gatsby) => {
        if(_.isFunction(_.get(meta, 'context'))) {
          return meta.context(item, gatsby);
        }
      },
      component: () => {
        return path.resolve(file);
      },
      createPages: (gatsby) => {
        if(_.isFunction(_.get(meta, 'createPages'))) {
          return meta.createPages(gatsby);
        }
      },
    }
  };

  items.push(item);
});

exports.createPages = (gatsby) => {
  const { graphql, actions } = gatsby;

  items.map(item => {
    const pagePath = path.join(item.base, 'slug');
    console.log('createPage', pagePath);
    // item.resolvers.createPages(gatsby);

    actions.createPage({
      path: item.resolvers.path(gatsby),
      component: item.resolvers.component(gatsby),
      context: item.resolvers.context(gatsby),
    })
  });
}
