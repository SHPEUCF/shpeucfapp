export const createActiontypes = actionTypes => actionTypes
    .map(type => ({
        [type]: `module/${type}`
    }))
    .reduce((types, type) => ({
        ...types,
        ...type
    }), {});