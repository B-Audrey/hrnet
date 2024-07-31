export const isNumberValid = (value: number, min: number = 0, max: number) => {
    let isValidNumber = {isValid: true, message: ''};
    if (value < min) {
        isValidNumber = {
            isValid: false,
            message: `Ce champ ne peut pas être inférieur à ${min}`
        }
    } else if (max && value > max) {
        isValidNumber = {
            isValid: false,
            message: `Ce champ ne peut pas être supérieur à ${max}`
        }
    }
    return isValidNumber;
}
