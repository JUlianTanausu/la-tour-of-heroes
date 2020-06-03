import './Villains.scss';

import { Footer, NavigableButton, Preloadable, useAura, useBackground, BaseCarousel } from '@telefonica/la-web-sdk';
import React, { useCallback, useEffect, useRef } from 'react';
import { AuraCommands } from '../../../../common';
import { VillainComponent, Villain } from './villain/Villain';

export const VillainsComponent = ({ onReady }: Preloadable) => {

	const background = useBackground();
	const aura = useAura();
	const villains = useRef(aura.getData().villains);

	useEffect(() => {
		background.clearBackground();
		onReady();
	}, []);

	const goBack = useCallback(() => {
		aura.sendCommand(AuraCommands.goBack());
	}, [aura]);

	const goToHeroes = useCallback(() => {
		aura.sendCommand(AuraCommands.goToHeroes());
	}, [aura]);


	const onVillainFocus = useCallback((villain: Villain, e: Event) => {
		const element = e.target as any;
		var clientRect = element.getBoundingClientRect();
		if (clientRect.left <= 0) {
			element.parentElement.scrollLeft += clientRect.left - parseInt(window.getComputedStyle(element.parentElement).paddingLeft.replace("px", ""));
		}
		if (clientRect.right >= document.documentElement.clientWidth) {
			element.parentElement.scrollLeft += clientRect.right - document.documentElement.clientWidth + parseInt(window.getComputedStyle(element.parentElement).paddingRight.replace("px", ""));
		}
		
		background.setBackgroundColor(villain.bgColor);
	}, [background]);

	return (
		<div id='villains'>
			<h1 id='title'> Villains</h1>
			<BaseCarousel className='villains-carousel'>
				{villains.current.map((villain: Villain, index: number) =>
					<VillainComponent key={index} villain={villain} current={index} onFocus={onVillainFocus} defaultFocused={index === 0}/>
				)}
			</BaseCarousel>
			<Footer>
				<NavigableButton id='back-button' defaultClass='button' focusedClass='focused-button' onClick={goBack}>
					Go Back
				</NavigableButton>
				<NavigableButton id='heroes-button' defaultClass='button' focusedClass='focused-button' onClick={goToHeroes}>
					Go to Heroes
				</NavigableButton>
			</Footer>
		</div>
	)
}
