import 'react-app-polyfill/stable';
import './index.css';
import { init, Channel } from 'la-web-sdk';
import { script } from '../../common'
import { SplashComponent } from './components/splash/Splash';
import { HomeComponent } from './components/home/Home';
import { HeroesComponent } from './components/heroes/Heroes';
import { VillainsComponent } from './components/villains/Villains';

init({
  channel: Channel.STB,
  laName: process.env.REACT_APP_LA_NAME as string,
  screens: {
    splash: () => SplashComponent,
    home: () => HomeComponent,
    heroes: () => HeroesComponent,
    villains: () => VillainsComponent
  },
  auraMockClient: process.env.REACT_APP_AURA_MOCK_CLIENT !== 'true' ? undefined : {
    script: script as any,
    pendingTerms: true
  }
});
