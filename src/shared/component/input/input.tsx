import './input.scss';
import React, {useState} from 'react';
import {InputProps} from '../../interface/props.interface.ts';
import {isNumberValid} from '../../utils/numberValidator.ts';
import {isStringValid} from '../../utils/stringValidator.ts';

const Input = ({label, name, id, type, isRequired, validatorOptions, min, max, setValue}: InputProps) => {
    const [isValueValid, setIsValueValid] = useState({isValid: true, message: ''});

    /**
     * Handle the blur event on the input
     * Check if the input is valid or not to send error if needed
     * @param e
     */
    const errorControlBlurFn = (e: React.FocusEvent<HTMLInputElement>) => {
        if (type === 'text') {
            const isInputInError = isStringValid(e.target.value, validatorOptions!);
            return setIsValueValid(isInputInError);
        }
        if (type === 'number') {
            const isInputInError = isNumberValid(Number(e.target.value), min, max!);
            return setIsValueValid(isInputInError);
        }
    }

    return (
        <div className="input-container">
            <label className='labels' htmlFor={id}>{label}</label>
            <input
                autoComplete={"on"}
                className='input-content'
                required={isRequired}
                type={type}
                id={id}
                name={name}
                onBlur={(e) => errorControlBlurFn(e)}
                min={min && min}
                max={max && max}
                onChange={(e) => setValue && setValue(e.target.value) }
            />
            <span className={`input-error ${!isValueValid.isValid ? 'fade-in' : ''}`}>
                    {isValueValid.message}
                </span>

        </div>
    )
};

export default Input;
