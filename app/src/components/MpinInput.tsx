import React, { useState, useRef } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';

interface MpinInputProps {
  length: number;
  onChange: (value: string) => void;
}

const MpinInput: React.FC<MpinInputProps> = ({ length, onChange }) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === '') {
      const newValues = [...values];
      newValues[index] = value;
      setValues(newValues);
      onChange(newValues.join(''));

      // Move to next input if a digit is entered
      if (value !== '' && index < length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && values[index] === '' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, length);
    if (/^\d+$/.test(pasteData)) {
      const newValues = Array(length).fill('');
      pasteData.split('').forEach((char, index) => {
        newValues[index] = char;
      });
      setValues(newValues);
      onChange(newValues.join(''));
      inputsRef.current[pasteData.length - 1]?.focus();
    }
  };

  return (
    <div className="mpin-input-container" onPaste={handlePaste}>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          type="tel" // Use tel type for digit-only input
          maxLength={1}
          value={values[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="mpin-box"
        />
      ))}
    </div>
  );
};

export default MpinInput;
