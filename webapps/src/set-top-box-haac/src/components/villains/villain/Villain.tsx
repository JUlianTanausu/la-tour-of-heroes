import './Villain.scss';

import { NavigableWrapper } from '@telefonica/la-web-sdk';
import React from 'react';

export type Villain = {
	name: string,
	nemesis: string,
	superpower: string,
	icon: string,
	bgColor: string,
	color: string,
	secondaryColor: string
}

export const VillainComponent = ({ villain, current, onFocus, defaultFocused }: { villain: Villain, current: number, onFocus: any, defaultFocused:boolean }) => {

	return (
		<NavigableWrapper defaultFocused={defaultFocused} id={`villain-${current}`} focusedClass='focused' onFocus={(e: Event) => onFocus(villain, e)}>
			<div className='villain-wrapper' style={{ color: villain.color || 'white' }}>
				<h1 style={{ textShadow: `10px 10px ${villain.secondaryColor || 'black'}, -10px -10px ${villain.secondaryColor || 'black'}` }}>
					{villain.name}
				</h1>
				<img src={villain.icon} className='icon' alt='villain icon' />
				<div className='villain-info'>
					<ul>
						<li>Superpowers: {villain.superpower}</li>
						<li>Nemesis: {villain.nemesis}</li>
					</ul>
				</div>
			</div>
		</NavigableWrapper>
	)
}
