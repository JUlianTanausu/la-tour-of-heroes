
export default class AuraCommands {

	static getHome() {
		return this.getAuraCommand('intent.tour-of-heroes.home');
	}

	static getHeroes() {
		return this.getAuraCommand('intent.tour-of-heroes.heroes');
	}

	static getNext() {
		return this.getAuraCommand('intent.operation.tour-of-heroes.next');
	}

	static getPrevious() {
		return this.getAuraCommand('intent.operation.tour-of-heroes.previous');
	}

	static getVillains() {
		return this.getAuraCommand('intent.tour-of-heroes.villains');
	}

	static getAuraCommandSingle(intent: string, entity: any) {
		return this.getAuraCommand(intent, [entity]);
	}

	static getAuraCommand(intent: string, entities?: any[]): any {
		return { intent: intent, entities: entities || [] };
	}
};
