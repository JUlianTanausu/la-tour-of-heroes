import './Heroes.scss';

import { NavigableButton, Preloadable, Footer, useAura, useBackground, useInput, KeyEvent, KeyCode, useActions, useVideo } from '@telefonica/la-web-sdk';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AuraCommands } from '../../../../common';
import { HeroComponent } from './hero/Hero';

export const HeroesComponent = ({ onReady }: Preloadable) => {

	const background = useBackground();
	const video = useVideo();
	const aura = useAura();
	const heroes = useRef(aura.getData().heroes);
	const [currentHero, setCurrentHero] = useState<number>(0);
	const heroFocused = useRef<boolean>(true);

	const keyHandler = useCallback((e: KeyEvent) => {
		switch (e.data.keyCode) {
			case KeyCode.KEY_LEFT:
				heroFocused.current && aura.sendCommand(AuraCommands.goToPrevious());
				break;
			case KeyCode.KEY_RIGHT:
				heroFocused.current && aura.sendCommand(AuraCommands.goToNext());
				break;
			case KeyCode.KEY_UP:
				heroFocused.current = true;
				break;
			case KeyCode.KEY_DOWN:
				heroFocused.current = false;
				break;
		}
	}, [aura, heroFocused]);
	useInput(keyHandler);

	const actionsHandler = useCallback((actions: any[]) => {
		switch (actions[0].name) {
			case 'LIVING_APP.NEXT':
			case 'LIVING_APP.PREVIOUS':
				setCurrentHero(actions[0].parameters.newIndex);
				break;
		}
	}, [setCurrentHero]);
	useActions(actionsHandler);

	useEffect(() => {
		background.clearBackground();
		onReady();
	}, []);

	useEffect(() => {
		const videoUrl = heroes.current[currentHero].bgVideo;
		background.setBackgroundColor(heroes.current[currentHero].bgColor);

		if (videoUrl) {
			video.playVideo(videoUrl, true);
		} else {
			video.stopVideo();
		}

		return () => {
			video.stopVideo();
		}
 	}, [currentHero]);

	const goBack = useCallback(() => {
		aura.sendCommand(AuraCommands.goBack());
	}, [aura]);

	const goToVillains = useCallback(() => {
		aura.sendCommand(AuraCommands.goToVillains());
	}, [aura]);

	return (
		<div id='heroes-wrapper'>
			<HeroComponent hero={heroes.current[currentHero]} current={currentHero} />
			<Footer>
				<NavigableButton id='back-button' defaultClass='button' focusedClass='focused-button' onClick={goBack}>
					Go Back
				</NavigableButton>
				<NavigableButton id='villains-button' defaultClass='button' focusedClass='focused-button' onClick={goToVillains}>
					Go to Villains
				</NavigableButton>
			</Footer>
		</div>
	)
}
