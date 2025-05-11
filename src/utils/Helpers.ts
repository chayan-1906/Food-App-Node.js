const isStringInvalid = (text: string | undefined | null): boolean => !text || text.trim().length === 0 || equals(text.trim().toLowerCase(), 'null');

const isNumberInvalid = (value: any): boolean => typeof value !== 'number' || isNaN(value);

const isBooleanInvalid = (value: any): boolean => typeof value !== 'boolean';

const isListEmpty = (list: any[] | null | undefined): boolean => !list || list.length === 0;

const equals = (string1: any, string2: any, caseInSensitive: boolean = true): boolean => {
    if (caseInSensitive) {
        return string1?.toString().toLowerCase() === string2?.toString().toLowerCase();
    }
    return string1?.toString() === string2?.toString();
}

const updateIfValid = <T>(key: keyof T, value: any, oldValue: any, isInvalid: (val: any) => boolean): {} | null => {
    if (!isInvalid(value) && value !== oldValue) {
        return {[key]: value};
    }
    return null;
}

export {isStringInvalid, isNumberInvalid, isBooleanInvalid, isListEmpty, equals, updateIfValid};
