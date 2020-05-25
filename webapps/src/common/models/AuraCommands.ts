
export default class AuraCommands {

	static getHome() {
		return this.getAuraCommand('intent.tour-of-heroes.home');
	}

	static getAuraCommandSingle(intent: string, entity: any) {
		return this.getAuraCommand(intent, [entity]);
	}

	static getAuraCommand(intent: string, entities?: any[]): any {
		return { intent: intent, entities: entities || [] };
	}
};
