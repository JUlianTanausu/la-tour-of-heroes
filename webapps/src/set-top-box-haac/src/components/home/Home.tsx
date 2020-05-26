import './Home.scss';
import React, { useCallback, useEffect } from 'react';
import { Preloadable, useAura, debounce, NavigableButton } from 'la-web-sdk';
import { AuraCommands } from '../../../../common';

export const HomeComponent = ({ onReady }: Preloadable) => {
	const aura = useAura();

	useEffect(() => {
		onReady();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const goToHeroes = useCallback(() => {
		debounce(() => aura.sendCommand(AuraCommands.getHeroes()), 3000);
	}, [aura]);

	const goToVillains = useCallback(() => {
		debounce(() => aura.sendCommand(AuraCommands.getVillains()), 3000);
	}, [aura]);

	return (
		<div id='home-wrapper'>
			<div id='heroes-wrapper'>
				<NavigableButton id='heroes-button' defaultClass='home-button' focusedClass='focused-home' defaultFocused={true} onClick={goToHeroes}>Go to Heroes</NavigableButton>
			</div>
			<div id='villains-wrapper'>
				<NavigableButton id='villains-button' defaultClass='home-button' focusedClass='focused-home' onClick={goToVillains}>Go to Villains</NavigableButton>
			</div>
		</div>
	)
}