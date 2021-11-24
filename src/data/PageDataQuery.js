import React from 'react';
import _ from 'lodash';
import useRoute from '@vl/hooks/useGbRoute';

import PageData_vi from './locales/vi';
import PageData_en from './locales/en';

const locales = {
  vi: PageData_vi,
  en: PageData_en,
};

export const PageData = ({ children }) => {
  // eslint-disable-next-line
  const pageContext = useRoute().getPageContext();
  const lang = _.get(pageContext, 'lang', 'en');
  const Component = _.get(locales, lang);
  if (lang) {
    // eslint-disable-next-line
    return <Component children={children} />;
  }
  return null;
};

export default PageData;
