/**
 * Check if a number is valid compare to min and max parameters
 * @param value
 * @param min
 * @param max
 */
export const isNumberValid = (value: number, min: number = 0, max: number) => {
    let isValidNumber = {isValid: true, message: ''};
    if (min && value < min) {
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
