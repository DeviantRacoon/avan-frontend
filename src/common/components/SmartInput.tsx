/**
 * SmartInput - Input profesional basado en MUI TextField
 * 
 * Características:
 * - Autogenera `id` en base al `label` o `placeholder`.
 * - Contador de caracteres actual / máximo visible en la esquina inferior derecha.
 * - Soporte para `type="password"` con botón de mostrar/ocultar.
 * - Soporte para `textarea` con `isTextArea`.
 * - Admite ícono a la izquierda del input.
 * - Optimizado con React.memo y useCallback.
 * - Accesible, semántico, limpio y optimizado.
 * - Soporte de validaciones
 * 
 * Props:
 * @param onChange      Función callback al cambiar el valor (value: string)
 * @param name          Nombre del campo
 * @param type          Tipo del input (text, password, email, etc.)
 * @param placeholder   Placeholder del input (también actúa como label si no se da explícitamente)
 * @param required      Si es obligatorio
 * @param minLength     Longitud mínima permitida
 * @param maxLength     Longitud máxima permitida
 * @param pattern       Expresión regular para validar el input
 * @param size          Tamaño visual del input (small | medium | large)
 * @param isTextArea    Si es un campo de texto multilinea
 * @param defaultValue  Valor inicial
 * @param fullWidth     Si debe ocupar todo el ancho del contenedor
 * @param label         Etiqueta visual (opcional)
 * @param className     Clases personalizadas
 * @param leftIcon      Ícono ReactNode que aparece al inicio del input
 */
import React, {
  useId,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef
} from 'react';

import {
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Box
} from '@mui/material';

export interface SmartInputRef {
  isValid: () => boolean;
  getValue: () => string;
  validate: () => boolean;
}

interface SmartInputProps {
  onChange?: (value: string) => void;
  name?: string;
  type?: string;
  placeholder?: string;
  size?: 'small' | 'medium' | 'large';
  isTextArea?: boolean;
  defaultValue?: string;
  fullWidth?: boolean;
  label?: string;
  className?: string;
  leftIcon?: React.ReactNode;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: { message?: string; value: RegExp };
}

const SmartInputComponent = forwardRef<SmartInputRef, SmartInputProps>((props, ref) => {
  const {
    onChange,
    name,
    type = 'text',
    placeholder = '',
    required = false,
    minLength,
    maxLength,
    pattern,
    size = 'medium',
    isTextArea = false,
    defaultValue = '',
    fullWidth = true,
    label,
    className,
    leftIcon
  } = props;

  const autoId = useId();
  const generatedId = (label || placeholder).toLowerCase().replace(/\s+/g, '-') || autoId;

  const [value, setValue] = useState(defaultValue);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  const isPassword = type === 'password';

  const validateInput = useCallback((valueToValidate: string): boolean => {
    if (required && valueToValidate.trim() === '') {
      setError('El campo es obligatorio');
      return false;
    }

    if (minLength && valueToValidate.length < minLength) {
      setError(`Debe tener al menos ${minLength} caracteres`);
      return false;
    }

    if (maxLength && valueToValidate.length > maxLength) {
      setError(`Debe tener como máximo ${maxLength} caracteres`);
      return false;
    }

    if (pattern && !pattern.value.test(valueToValidate)) {
      setError(pattern.message || 'Formato inválido');
      return false;
    }

    setError('');
    return true;
  }, [required, minLength, maxLength, pattern]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      validateInput(newValue);
      onChange?.(newValue);
    },
    [onChange, validateInput]
  );

  const handleBlur = () => {
    setTouched(true);
    validateInput(value);
  };

  useImperativeHandle(ref, () => ({
    isValid: () => error === '',
    getValue: () => value,
    validate: () => {
      setTouched(true);
      return validateInput(value);
    }
  }));

  const inputValidationProps = {
    required,
    minLength,
    maxLength
  };

  return (
    <Box sx={{ position: 'relative' }} className={className}>
      <TextField
        id={generatedId}
        name={name}
        required={required}
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={() => setTouched(true)}
        type={isPassword ? (showPassword ? 'text' : 'password') : type}
        size={size === 'large' ? 'medium' : size}
        multiline={isTextArea}
        minRows={isTextArea ? 3 : undefined}
        maxRows={isTextArea ? 8 : undefined}
        error={!!error && touched}
        inputProps={inputValidationProps}
        fullWidth={fullWidth}
        variant="outlined"
        helperText={touched && error ? error : ''}
        InputLabelProps={{
          sx: { color: 'text.secondary' },
        }}
        InputProps={{
          startAdornment: leftIcon ? (
            <InputAdornment position="start">{leftIcon}</InputAdornment>
          ) : undefined,
          endAdornment: isPassword ? (
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                onClick={() => setShowPassword(!showPassword)}
                edge="end">
                {showPassword ? (
                  <img src="/assets/svg/eye-off-outline.svg" alt="ocultar" width="20" />
                ) : (
                  <img src="/assets/svg/eye-outline.svg" alt="mostrar" width="20" />
                )}
              </IconButton>
            </InputAdornment>
          ) : undefined
        }}
      />

      {inputValidationProps.maxLength && (
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 8,
            color: 'text.secondary',
            fontSize: '0.7rem'
          }}>
          {value.length}/{inputValidationProps.maxLength}
        </Typography>
      )}
    </Box>
  );
});

export default React.memo(SmartInputComponent);
