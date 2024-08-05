import './select.scss';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import chevron from '../../../assets/chevron.png';
import { SelectProps } from '../../interface/props.interface.ts';

const Select = forwardRef(({ label, itemList }: SelectProps, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const optionsRef = useRef<HTMLDivElement[]>([]);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [isValueChosen, setIsValueChosen] = useState({ isValid: false, message: '' });

  useEffect(() => {
    if (isOpen || !hasBeenOpened) {
      return;
    }
    if (selectedOption.length > 0) {
      setIsValueChosen({ isValid: true, message: '' });
    } else {
      setIsValueChosen({ isValid: false, message: 'You must select an option' });
    }
  }, [isOpen]);

  /**
   * expose the value from the selectedOption to the parent component by using a ref without input DOM element
   */
  useImperativeHandle(ref, () => ({
    getValue: () => selectedOption,
  }));

  /**
   * Handle the click on the select to open close it
   */
  const handleClick = () => {
    setIsOpen(previousValue => !previousValue);
    !hasBeenOpened ? setHasBeenOpened(true) : null;
  };

  /**
   * Handle the click on an option
   * set the chosen value so the local state
   * @param option
   */
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  /**
   * Handle the key down event on the select
   * when it is closed, we can open it with enter or space
   * when it is open, we can navigate with the keyboard tab, select an option with enter and close it with escape
   * @param event
   */
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen) {
      if (event.key === 'Enter' || event.key === ' ') {
        setIsOpen(true);
        event.preventDefault(); // prevent to natural enter and so keep current focus on the select
      }
      return;
    }
    switch (event.key) {
      //if tab is pressed with shift go back, else go forward
      case 'Tab':
        setHighlightedIndex(prevIndex => {
          if (event.shiftKey) {
            if (prevIndex > 0) {
              return prevIndex - 1;
            } else {
              return itemList.length - 1;
            }
          } else {
            if (prevIndex < itemList.length - 1) {
              return prevIndex + 1;
            } else {
              return 0;
            }
          }
        });

        event.preventDefault(); //prevent to go to the next element at same time : that is default comportment
        break;
      case 'Enter':
        handleOptionClick(itemList[highlightedIndex]);
        setIsOpen(false);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  /**
   * useEffect to keep focus on the options with the highlighted option when the select is open
   */
  useEffect(() => {
    if (isOpen && highlightedIndex >= 0) {
      optionsRef.current[highlightedIndex]?.focus();
    }
  }, [isOpen, highlightedIndex]);

  return (
    <div className="select-component">
      {isOpen && <div id="overlay" onClick={() => setIsOpen(false)}></div>}
      <span className="labels">{label}</span>
      <div
        className={`select-container${isOpen ? ' select-container--open' : ''}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        id="custom-select">
        <div className="select-selected">
          {selectedOption || 'Select an option'}
          <img src={chevron} alt="chevron" className={`chevron${isOpen ? ' chevron--open' : ''}`} />
        </div>
        <div className={`select-options select-options${isOpen ? '--open' : '--close'}`} role="listbox">
          {itemList.map((item, index) => (
            <div
              key={item}
              className={`select-option${highlightedIndex === index ? ' highlighted' : ''}`}
              onClick={() => handleOptionClick(item)}
              role="option"
              aria-selected={selectedOption === item}
              tabIndex={-1}
              ref={el => (optionsRef.current[index] = el!)}>
              {item}
            </div>
          ))}
        </div>
      </div>
      <span className={`input-error ${!isValueChosen.isValid ? 'fade-in' : ''}`}>{isValueChosen.message}</span>
    </div>
  );
});

export default Select;
