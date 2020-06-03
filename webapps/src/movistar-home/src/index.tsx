import 'react-app-polyfill/stable';
import './index.css';
import { init, Channel } from '@telefonica/la-web-sdk';
import { script } from '../../common'
;

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

