import './src/styles/global.css';
import '@vl/mod-config/web';

// firebase features
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/messaging';

import importAll from 'import-all.macro';
const allFiles = importAll.sync('./**/.route.js');
console.warn({ allFiles });
