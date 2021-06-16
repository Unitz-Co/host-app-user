import React from 'react';

// load web config
import '@vl/mod-config/web';

// load web translation
import '@uz/mod-translations/web';

import Providers from '@uz/unitz-providers/Providers';
import RefProvider from '@uz/unitz-providers/RefProvider';
import I18nProvider from '@uz/unitz-providers/I18nProvider';
import ValidateProvider from '@uz/unitz-providers/ValidateProvider';
import AuthProvider from '@uz/unitz-providers/AuthWebProvider';
import UserProvider from '@uz/unitz-providers/UserProvider';

const App = ({ children }) => (
  <Providers providers={[
    RefProvider,
    ValidateProvider,
    I18nProvider,
    AuthProvider,
    UserProvider,
  ]}>
    {children}
  </Providers>
);

export default App;
