import React from 'react';
import importAll from 'import-all.macro';

importAll.sync('./src/templates/**/.route.js');

export const wrapPageElement = ({ element }) => {
  return <div>{element || null}</div>;
};
