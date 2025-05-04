const generateMissingCode = (missingField: string) => {
    if (missingField) return `${missingField.toUpperCase()}_MISSING`
    else return '';
}

export {generateMissingCode};
