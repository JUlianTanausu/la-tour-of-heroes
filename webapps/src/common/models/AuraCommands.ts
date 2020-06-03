
export default class AuraCommands {

	static getHome() {
		return this.getAuraCommand('intent.tour-of-heroes.home');
	}

	static goToHeroes() {
		return this.getAuraCommand('intent.tour-of-heroes.heroes');
	}

	static goToVillains() {
		return this.getAuraCommand('intent.tour-of-heroes.villains');
	}

	static goBack() {
		return this.getAuraCommand('intent.operation.tour-of-heroes.back');
	}

	static goToPrevious() {
		return this.getAuraCommand('intent.operation.tour-of-heroes.previous');
	}

	static goToNext() {
		return this.getAuraCommand('intent.operation.tour-of-heroes.next');
	}

	static getAuraCommandSingle(intent: string, entity: any) {
		return this.getAuraCommand(intent, [entity]);
	}

	static getAuraCommand(intent: string, entities?: any[]): any {
		return { intent: intent, entities: entities || [] };
	}
};
