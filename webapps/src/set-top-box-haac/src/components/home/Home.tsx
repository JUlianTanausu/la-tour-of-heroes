
import React, { useEffect, useCallback } from 'react';
import { NavigableButton, Preloadable, useAura } from '@telefonica/la-web-sdk';
import { AuraCommands } from '../../../../common';
import './Home.scss';

export const HomeComponent = ({ onReady }: Preloadable) => {

	const aura = useAura();

	useEffect(() => {
		onReady();
	}, []);

	const goToHeroes = useCallback(() => {
		aura.sendCommand(AuraCommands.goToHeroes());
	}, [aura]);

	const goToVillains = useCallback(() => {
		aura.sendCommand(AuraCommands.goToVillains());
	}, [aura]);

	return (
		<div id='home-wrapper'>
			<div id='heroes-wrapper'>
				<NavigableButton id='heroes-button' defaultClass='home-button' focusedClass='focused-home' defaultFocused={true} onClick={goToHeroes}>
					Go to Heroes
				</NavigableButton>
			</div>
			<div id='villains-wrapper'>
				<NavigableButton id='villains-button' defaultClass='home-button' focusedClass='focused-home' onClick={goToVillains}>
					Go to Villains
				</NavigableButton>
			</div>
		</div>
	)
}
