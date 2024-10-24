// Input.js
import React from 'react';
import './input.css'; // Se você quiser adicionar estilos personalizados de input

const Input = ({ type, placeholder }) => {
  return <input type={type} className="input" placeholder={placeholder} />;
};

export default Input;
