import React from 'react';

const Button = ({ onClick, children, disabled = false, type = 'button' }) => {
  return (
      <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          aria-disabled={disabled}
      >
        {children}
      </button>
  );
};

export default Button;