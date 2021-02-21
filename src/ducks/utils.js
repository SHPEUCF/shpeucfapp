export const createActionTypes = actionTypes => actionTypes
	.map(type => ({ [type]: `module/${type}`	}))
	.reduce((types, type) => ({ ...types, ...type }), {});