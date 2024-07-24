import './select.scss';
import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import chevron from '../../../assets/chevron.png';

const Select = forwardRef(({label, itemList}: { label: string, itemList: string[] }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const optionsRef = useRef<HTMLDivElement[]>([]);

    useImperativeHandle(ref, () => ({
        getValue: () => selectedOption
    }));

    const handleClick = () => {
        setIsOpen((previousValue) => !previousValue);
    };

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (!isOpen) {
            if (event.key === 'Enter' || event.key === ' ') {
                setIsOpen(true);
                event.preventDefault();
            }
            return;
        }

        switch (event.key) {
            case 'Tab':
                setHighlightedIndex((prevIndex) =>
                    event.shiftKey
                        ? prevIndex > 0 ? prevIndex - 1 : itemList.length - 1
                        : prevIndex < itemList.length - 1 ? prevIndex + 1 : 0
                );
                event.preventDefault();
                break;
            case 'Enter':
                if (highlightedIndex >= 0) {
                    handleOptionClick(itemList[highlightedIndex]);
                    setIsOpen(false);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        if (isOpen && highlightedIndex >= 0) {
            optionsRef.current[highlightedIndex]?.focus();
        }
    }, [isOpen, highlightedIndex]);

    return (
        <div className='select-component'>
            {isOpen && <div id='overlay' onClick={() => setIsOpen(false)}></div>}
            <label htmlFor='custom-select' className='select-label'>{label}</label>
            <div
                className={`select-container${isOpen ? ' select-container--open' : ''}`}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                role='button'
                aria-haspopup='listbox'
                aria-expanded={isOpen}
                tabIndex={0}
                id='custom-select'
            >
                <div className='select-selected'>
                    {selectedOption || 'Select an option'}
                    <img src={chevron} alt='chevron' className={`chevron${isOpen ? ' chevron--open' : ''}`}/>
                </div>
                <div
                    className={`select-options select-options${isOpen ? '--open' : '--close'}`}
                    role='listbox'
                    aria-activedescendant={selectedOption}
                >
                    {itemList.map((item, index) => (
                        <div
                            key={item}
                            className={`select-option${highlightedIndex === index ? ' highlighted' : ''}`}
                            onClick={() => handleOptionClick(item)}
                            role='option'
                            aria-selected={selectedOption === item}
                            tabIndex={-1}
                            ref={(el) => (optionsRef.current[index] = el!)}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

export default Select;
