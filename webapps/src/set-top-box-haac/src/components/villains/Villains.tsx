import './Villains.scss';

import { BaseCarousel, Preloadable, useAura, useBackground, Footer, NavigableButton, KeyEvent, KeyCode, useInput } from 'la-web-sdk';
import React, { useEffect, useCallback, useState, useRef } from 'react';

import { Villain } from './villain/Villain';
import { AuraCommands } from '../../../../common';


export const VillainsComponent = ({ onReady }: Preloadable) => {
	const aura = useAura();
	const villains = useRef(aura.getData().villains);
	const background = useBackground();
	const [villainFocused, setVillainFocused] = useState<boolean>(true);
	const [currentVillain, setCurrentVillain] = useState<number>(0);

	const onKeyPressed = useCallback((e: KeyEvent) => {
		switch (e.data.keyCode) {
			case KeyCode.KEY_LEFT:
				villainFocused && currentVillain > 0 && setCurrentVillain(old => (villains.current.length + old - 1) % villains.current.length);
				break;
			case KeyCode.KEY_RIGHT:
				villainFocused && currentVillain < villains.current.length - 1 && setCurrentVillain(old => (old + 1) % villains.current.length);
				break;
			case KeyCode.KEY_UP:
				!villainFocused && setVillainFocused(true);
				break;
			case KeyCode.KEY_DOWN:
				villainFocused && setVillainFocused(false);
				break;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [aura, villainFocused, currentVillain]);
	useInput(onKeyPressed);

	useEffect(() => {
		background.clearBackground();
		onReady();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onFocus = useCallback((e: Event) => {
		const element = e.target as any;
		var clientRect = element.getBoundingClientRect();
		if (clientRect.left <= 0) {
			element.parentElement.scrollLeft += clientRect.left - parseInt(window.getComputedStyle(element.parentElement).paddingLeft.replace("px", ""));
		}
		if (clientRect.right >= document.documentElement.clientWidth) {
			element.parentElement.scrollLeft += clientRect.right - document.documentElement.clientWidth + parseInt(window.getComputedStyle(element.parentElement).paddingRight.replace("px", ""));
		}
	}, []);

	useEffect(() => {
		background.setBackgroundColor(villains.current[currentVillain].bgColor);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentVillain]);

	const goBack = useCallback(() => {
		aura.sendCommand(AuraCommands.getBack());
	}, [aura]);

	const goToHeroes = useCallback(() => {
		aura.sendCommand(AuraCommands.getHeroes());
	}, [aura]);

	return (
		<div id='villains'>
			<h1 id='title'> Villains</h1>
			<BaseCarousel className='villains-carousel'>
				{villains.current.map((villain: Villain, index: number) => <Villain villain={villain} current={index} key={index} focused={index === currentVillain && villainFocused} onFocus={onFocus} />)}
			</BaseCarousel>
			<Footer>
				<NavigableButton onClick={goBack} id='back-button' defaultClass='button' defaultFocused={!villainFocused} focusedClass='focused-button'>
					Atrás
				</NavigableButton>
				<NavigableButton onClick={goToHeroes} id='heroes-button' defaultClass='heroes-button button'
					focusedClass='focused-button'>
					Ver Heroes
				</NavigableButton>
			</Footer>
		</div>
	)
}