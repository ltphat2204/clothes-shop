import { useState, useEffect, useRef } from 'react';
import { TiTick } from 'react-icons/ti';
import './Dropdown.css';

export default function Dropdown({ value, setValue, lisOption, title, require, multiselect }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [selectedOptions, setSelectedOptions] = useState(multiselect ? [lisOption[0]] : []);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionSelect = (id, name) => {
        if (multiselect) {
            const isOptionSelected = selectedOptions.some(option => option.id === id);
            if (isOptionSelected) {
                const updatedOptions = selectedOptions.filter(option => option.id !== id);
                setSelectedOptions(updatedOptions);
                setValue(updatedOptions.map(val=>val.id), updatedOptions.map(val=>val.name));
            } else {
                const updatedOptions = [...selectedOptions, { id, name }];
                setSelectedOptions(updatedOptions);
                setValue(updatedOptions.map(val=>val.id), updatedOptions.map(val=>val.name));
            }
        } else {
            setIsOpen(false);
            setValue(id, name);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="input-wrap dropdown-container">
            <div className="input-label">{`${title} ${require ? '*' : ''}`}</div>
            <div ref={dropdownRef}>
                <div className="dropdown-toggle" onClick={handleToggle}>
                    {multiselect && selectedOptions.length > 0
                        ? selectedOptions.map(option => option.name).join(', ')
                        : value}
                </div>
                <div className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
                    {lisOption && lisOption.map((val, indx) => (
                        <div
                            key={indx}
                            className={`dropdown-option ${multiselect && selectedOptions.some(option => option.id === val.id) ? 'selected' : ''}`}
                            onClick={() => handleOptionSelect(val.id, val.name)}
                        >
                            {val.name}
                            <TiTick/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
