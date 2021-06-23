import React from 'react';
import importAll from 'import-all.macro';

importAll.sync('./src/templates/**/.route.js');

export const wrapPageElement = ({ element, props }) => {
  return <div {...props}>{element}</div>;
};
