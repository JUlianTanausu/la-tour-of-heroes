let currentHero = 0;
let breadcrumbs: any[] = [];

let lastResponse: any = undefined;

const script = {
	"intent.internal.living-app.start": () => splash,
	"intent.tour-of-heroes.home": () => {
		lastResponse && breadcrumbs.push(lastResponse);
		lastResponse = home;
		return home;
	},
	"intent.operation.tour-of-heroes.previous": () => {
		let response = actionPrevious(currentHero, (--currentHero + heroes.heroes.length) % heroes.heroes.length);
		breadcrumbs.push(response);
		return response;
	},
	"intent.operation.tour-of-heroes.next": () => {
		return actionNext(currentHero, (++currentHero) % heroes.heroes.length);
	},
	"intent.tour-of-heroes.heroes": () => {
		breadcrumbs.push(lastResponse);
		lastResponse = heroes;
		return lastResponse;
	},
	"intent.tour-of-heroes.villains": () => {
		breadcrumbs.push(lastResponse);
		lastResponse = villains;
		return lastResponse;
	},
	"intent.operation.tour-of-heroes.back": () => {
		lastResponse = breadcrumbs.pop() || home;
		return lastResponse;
	},
	"intent.tour-of-heroes.qna": () => { },
	"intent.operation.sdk.persist": () => { },
	"Atrás": () => { },
	"Quién es la novia de manspider?": () => { },
	"intent.living-app.close": () => close,
}

const actionNext = (oldIndex: number, newIndex: number) => ({
	"name": "LIVING_APP.NEXT",
	"parameters": {
		newIndex: newIndex,
		oldIndex: oldIndex
	}
});

const actionPrevious = (oldIndex: number, newIndex: number) => ({
	"name": "LIVING_APP.PREVIOUS",
	"parameters": {
		newIndex: newIndex,
		oldIndex: oldIndex
	}
});

const splash = {
	"screen": "splash"
}

const home = {
	"screen": "home"
}

const heroes = {
	"screen": "heroes",
	"heroes": [
		{
			"name": "Manbat",
			"realName": "Francisco Rodríguez",
			"superpower": "Super rich",
			"loveInterest": "Feline Female",
			"nemesis": "Prankster",
			"group": "Righteousness Union",
			"icon": "https://movistarhome-test.s3.amazonaws.com/test-carol/tour-of-heroes/assets/manbat.svg",
			"bgColor": "#0d751e",
			"secondaryColor": "black",
			"bgVideo": "https://movistarhome-test.s3.amazonaws.com/test-carol/tour-of-heroes/assets/manbat.mp4"
		}, {
			"name": "Steel Man",
			"realName": "Antonio Claro",
			"superpower": "Super rich too",
			"loveInterest": "Prepper Petts",
			"nemesis": "El Notas",
			"group": "Vindicators",
			"icon": "https://movistarhome-test.s3.amazonaws.com/test-carol/tour-of-heroes/assets/steelman.svg",
			"bgColor": "black",
			"secondaryColor": "red"
		}, {
			"name": "Manspider",
			"realName": "Pedro Parques",
			"superpower": "Strength, speed, agility, spider-sense",
			"loveInterest": "La Mary",
			"nemesis": "Blue Elf",
			"group": "Vindicators",
			"icon": "https://movistarhome-test.s3.amazonaws.com/test-carol/tour-of-heroes/assets/manspider.svg",
			"bgColor": "white",
			"color": "blue",
			"secondaryColor": "red"
		},
	]
};

const villains = {
	"screen": "villains",
	"villains": [
		{
			"name": "Prankster",
			"nemesis": "Manbat",
			"superpower": "Chemical engineering",
			"icon": "https://movistarhome-test.s3.amazonaws.com/test-carol/tour-of-heroes/assets/prankster.svg",
			"bgColor": "#20d63e",
			"color": "black",
			"secondaryColor": "white"
		}, {
			"name": "El Notas",
			"nemesis": "All Vindicators",
			"superpower": "Infinity Stones",
			"icon": "https://movistarhome-test.s3.amazonaws.com/test-carol/tour-of-heroes/assets/notas.svg",
			"bgColor": "#c2b200",
			"color": "green",
			"secondaryColor": "#fbbe00"
		}, {
			"name": "Blue Elf",
			"nemesis": "Manspider",
			"superpower": "Strength, reflexes, agility",
			"icon": "https://movistarhome-test.s3.amazonaws.com/test-carol/tour-of-heroes/assets/blue-elf.svg",
			"bgColor": "#009130",
			"color": "black",
			"secondaryColor": "blue"
		}, {
			"name": "Loko",
			"nemesis": "Ther",
			"superpower": "Astral projection, illusions, strength",
			"icon": "https://movistarhome-test.s3.amazonaws.com/test-carol/tour-of-heroes/assets/loko.svg",
			"bgColor": "rgb(120, 0, 145)",
			"color": "green",
			"secondaryColor": "#d1a400"
		},
	]
};

const close = {
	"activeChannels": [
		"movistar-home",
		"set-top-box-haac"
	],
	"text": "Saliendo de la Living App",
	"screen": "close"
};

export default script;