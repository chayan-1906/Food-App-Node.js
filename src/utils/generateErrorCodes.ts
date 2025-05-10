const generateMissingCode = (missingField: string) => {
    if (missingField) return `${missingField.toUpperCase()}_MISSING`
    else return '';
}

const generateNotFound = (model: string) => {
    if (model) return `${model.toUpperCase()}_NOT_FOUND`;
    else return '';
}

const generateInvalid = (model: string) => {
    if (model) return `INVALID_${model.toUpperCase()}`;
    else return '';
}


export {generateMissingCode, generateNotFound, generateInvalid};
