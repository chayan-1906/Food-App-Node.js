const isStringInvalid = (text: string | undefined | null) => {
    return !text || typeof text === 'undefined' || text.length === 0;
}

export {isStringInvalid};
