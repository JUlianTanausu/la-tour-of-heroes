import './Hero.scss';
import React from 'react';
import { NavigableWrapper } from 'la-web-sdk';


type Hero = {
	name: string,
	realName: string,
	superpower: string,
	loveInterest: string,
	nemesis: string,
	group: string
	icon: string,
	bgColor: string,
	color: string,
	secondaryColor: string
}

export const Hero = ({ hero, current, focused }: { hero: Hero, current: number, focused: boolean }) => {
	return (
		<NavigableWrapper defaultFocused={focused} id={`hero-${current}`} focusedClass='focused'>
			<div className='hero-wrapper' style={{ color: hero.color || 'white' }}>
				<h1 style={{ textShadow: `20px 20px ${hero.secondaryColor || 'black'}, -20px -20px ${hero.secondaryColor || 'black'}` }}>
					{hero.name}
				</h1>
				<img src={hero.icon} className='icon' alt='Hero icon' />
				<div className='hero-info'>
					<ul>
						<li>Real name: {hero.realName}</li>
						<li>Superpowers: {hero.superpower}</li>
						<li>Love interest: {hero.loveInterest}</li>
						<li>Nemesis: {hero.nemesis}</li>
						<li>Group: {hero.group}</li>
					</ul>
				</div>
			</div>
		</NavigableWrapper>

	);
}