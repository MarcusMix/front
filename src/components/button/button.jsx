// Button.js
import React from 'react';
import './button.css'; // Se você quiser adicionar estilos personalizados de botão

const Button = ({ type, label }) => {
  return (
    <button type={type} className="button">
      {label}
    </button>
  );
};

export default Button;
