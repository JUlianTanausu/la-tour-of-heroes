import React, { useEffect } from 'react';
import './Splash.scss';
import { Preloadable, useBackground, useAura } from '@telefonica/la-web-sdk';
import bg from '../../assets/manbat-splash.svg';
import { AuraCommands } from '../../../../common';

export const SplashComponent = ({ onReady }: Preloadable) => {

	const background = useBackground();
	const aura = useAura();

	useEffect(() => {
		background.setBackground(bg, () => {
			aura.sendCommand(AuraCommands.getHome());
			onReady();
		});
	}, []);

	return (
		<div id='splash'>
			Welcome to the Tour of Heroes!
		</div>
	)
}
