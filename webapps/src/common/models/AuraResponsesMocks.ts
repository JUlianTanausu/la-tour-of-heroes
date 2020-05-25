const script = {
	"intent.living-app.start": () => splash,
	"intent.tour-of-heroes.home": () => { },
	"intent.tour-of-heroes.qna": () => { },
	"intent.operation.tour-of-heroes.back": () => { },
	"intent.operation.sdk.persist": () => { },
	"Atrás": () => { },
	"intent.living-app.close": () => close,
};

const splash = {
	"activeChannels": [
		"movistar-home",
		"set-top-box-haac"
	],
	"screen": "splash"
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