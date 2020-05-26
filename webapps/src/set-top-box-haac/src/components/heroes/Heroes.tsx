import './Heroes.scss';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Preloadable, useAura, useInput, KeyEvent, KeyCode, useBackground, useActions } from 'la-web-sdk';
import { AuraCommands } from '../../../../common';
import { Hero } from './hero/Hero';

export const HeroesComponent = ({ onReady }: Preloadable) => {
	const aura = useAura();
	const background = useBackground();
	const [currentHero, setCurrentHero] = useState<number>(aura.getData().current);
	const data = useRef(aura.getData());

	// Send previous/next operations to Aura
	const onKeyPressed = useCallback((e: KeyEvent) => {
		switch (e.data.keyCode) {
			case KeyCode.KEY_LEFT:
				aura.sendCommand(AuraCommands.getPrevious());
				break;
			case KeyCode.KEY_RIGHT:
				aura.sendCommand(AuraCommands.getNext());
				break;
		}
	}, [aura]);
	useInput(onKeyPressed);

	// Handle Aura actions
	const actionsHandler =	useCallback((actions: any[]) => {
		if (actions && actions.length > 0) {
			const hasNewIndex = actions[0].parameters?.newIndex !== undefined;
			const newIndex = actions[0]?.parameters?.newIndex;
			switch (actions[0].name) {
				case "LIVING_APP.NEXT":
					setCurrentHero((old: number) => hasNewIndex ? newIndex : old + 1 % data.current.heroes.length);
					break;
				case "LIVING_APP.PREVIOUS":
					setCurrentHero((old: number) => hasNewIndex ? newIndex : (data.current.heroes.length + old - 1) % data.current.heroes.length);
					break;
			}
		}
	}, [setCurrentHero]);
	useActions(actionsHandler);

	// Update bg color whenever we switch heroes
	useEffect(() => {
		background.setBackgroundColor(data.current.heroes[currentHero].bgColor);
		// eslint-disable-next-line react-hooks/exhaustive-deps 
	}, [currentHero]);

	useEffect(() => {
		background.clearBackground();
		background.setBackgroundColor(data.current.heroes[currentHero].bgColor);
		console.log("onready");
		onReady();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div id="heroes-wrapper">
			{
				<Hero hero={data.current.heroes[currentHero]} />
			}
		</div>
	)
}