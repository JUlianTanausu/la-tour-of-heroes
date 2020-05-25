import 'react-app-polyfill/stable';
import './App.css';
import { init, Channel } from 'la-web-sdk';
import { script } from 'toh-common';

init({
  channel: Channel.STB,
  laName: process.env.REACT_APP_LA_NAME as string,
  screens: {

  },
  auraMockClient: process.env.REACT_APP_AURA_MOCK_CLIENT !== 'true' ? undefined : {
      script: script as any,
      pendingTerms: true
  }
})

