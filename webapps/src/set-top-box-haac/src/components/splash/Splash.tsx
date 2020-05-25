import React, { useEffect } from 'react';
import { Preloadable, useBackground } from 'la-web-sdk';
import './Splash.scss';
import bg from '../../assets/batman-splash.svg';

export const SplashComponent = ({ onReady }: Preloadable) => {
	const background = useBackground();

	useEffect(() => {
		background.setBackground(bg, (img) => {
			if (!img) {
				background.setBackgroundColor('#28ACD1');
			}
			onReady();
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div id="splash">
			Welcome to the Tour of Heroes!
		</div>
	)
}

