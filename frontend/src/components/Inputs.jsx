import React, { useState } from 'react';
import { inputStyles } from '../assets/dummystyle';
import { EyeOff, Eye } from 'lucide-react';

export const Input = ({ value, onChange, label, placeholder, type = "text", id }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const styles = inputStyles;

  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={styles.label} htmlFor={id || label}>
          {label}
        </label>
      )}
      <div className={typeof styles.inputContainer === 'function' ? styles.inputContainer(isFocused) : styles.inputContainer}>
        <input
          id={id || label}
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          className={styles.inputField}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {type === 'password' && (
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()} // prevent focus loss
            onClick={() => setShowPassword((prev) => !prev)}
            className={styles.toggleButton}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};
