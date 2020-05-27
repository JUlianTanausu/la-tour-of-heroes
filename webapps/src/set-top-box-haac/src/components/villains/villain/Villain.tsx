import './Villain.scss';
import React from 'react';
import { NavigableWrapper } from 'la-web-sdk';

export type Villain = {
	name: string,
	nemesis: string,
	superpower: string,
	icon: string,
	bgColor: string,
	color: string,
	secondaryColor: string
}

export const Villain = ({ villain, current, focused, onFocus }: {villain: Villain, current: number, focused: boolean, onFocus: Function}) => {
	return (
		<NavigableWrapper defaultFocused={focused} id={`villain-${current}`} focusedClass='focused' onFocus={onFocus}>
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