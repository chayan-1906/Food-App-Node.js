const generateMissingCode = (missingField) => {
    if (missingField) return `${missingField.toUpperCase()}_MISSING`
    else return '';
}

export {generateMissingCode};
