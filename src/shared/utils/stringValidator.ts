import {hasNoSpecialChars, hasNotOnlySpaces, isNotEmpty, isNotTooLong} from './string.utils.ts';

export enum StringValidatorRules {
    notEmpty = 'notEmpty',
    notTooLong = 'notTooLong',
    noSpecialChars = 'noSpecialChars',
    hasNotOnlySpaces = 'hasNotOnlySpaces'
}

const isStringValid = (value: string, rules: StringValidatorRules[]) => {
    let isValidString = {isValid: true, message: ''}

    const messages = {
        notEmpty: 'This form field can not be empty',
        notTooLong: 'This form field cannot exceed 100 characters',
        noSpecialChars: 'This form field cannot contain special characters',
        hasNotOnlySpaces: 'This form field cannot be filled of only spaces'
    }

    const test = {
        notEmpty: isNotEmpty(value),
        notTooLong: isNotTooLong(value, 100),
        noSpecialChars: hasNoSpecialChars(value),
        hasNotOnlySpaces: hasNotOnlySpaces(value)
    }

    rules.forEach(rule => {
        const canContinue = test[rule];
        if (!canContinue) {
            isValidString = {
                isValid: false,
                message: messages[rule]
            }
        }
    });
    return isValidString;
};

export default isStringValid;
