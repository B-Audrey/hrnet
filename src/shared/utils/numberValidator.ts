/**
 * Check if a number is valid compare to min and max parameters
 * @param value
 * @param min
 * @param max
 */
export const isNumberValid = (value: number, min: number = 0, max: number) => {
    let isValidNumber = {isValid: true, message: ''};
    if(!value) {
        isValidNumber = {
            isValid: false,
            message: 'This field can not be empty'
        }
    }
    if (value < min) {
        isValidNumber = {
            isValid: false,
            message: `This field cannot be less than ${min}`
        }
    } else if (max && value > max) {
        isValidNumber = {
            isValid: false,
            message: `This filed cannot be more than ${max}`
        }
    }
    return isValidNumber;
}
