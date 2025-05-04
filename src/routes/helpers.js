const isStringInvalid = (text) => {
    return !text || typeof text === 'undefined' || text.length === 0;
}

export {isStringInvalid};
