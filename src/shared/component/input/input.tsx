import './input.scss';
import React, {useState} from 'react';
import {InputProps} from '../../interface/props.interface.ts';
import isStringValid from '../../utils/stringValidator.ts';
import {isNumberValid} from '../../utils/numberValidator.ts';

const Input = ({label, name, id, type, isRequired, validatorOptions, min, max}: InputProps) => {
    const [isValueValid, setIsValueValid] = useState({isValid: true, message: ''});

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
            />
            <span className={`input-error ${!isValueValid.isValid ? 'fade-in' : ''}`}>
                    {isValueValid.message}
                </span>

        </div>
    )
};

export default Input;
