const isStringInvalid = (text: string | undefined | null) => !text || typeof text === 'undefined' || text.length === 0

const isListEmpty = (list: any[] | null | undefined): boolean => !list || list.length === 0

const equals = (string1: any, string2: any, caseInSensitive: boolean = true): boolean => {
    if (caseInSensitive) {
        return string1?.toString().toLowerCase() === string2?.toString().toLowerCase();
    }
    return string1?.toString() === string2?.toString();
}

export {isStringInvalid, isListEmpty, equals};
