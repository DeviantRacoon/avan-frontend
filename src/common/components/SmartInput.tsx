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
 * 
 * Props:
 * @param onChange      Función callback al cambiar el valor (value: string)
 * @param name          Nombre del campo
 * @param type          Tipo del input (text, password, email, etc.)
 * @param placeholder   Placeholder del input (también actúa como label si no se da explícitamente)
 * @param minLength     Longitud mínima permitida
 * @param maxLength     Longitud máxima permitida
 * @param size          Tamaño visual del input (small | medium | large)
 * @param isTextArea    Si es un campo de texto multilinea
 * @param defaultValue  Valor inicial
 * @param fullWidth     Si debe ocupar todo el ancho del contenedor
 * @param label         Etiqueta visual (opcional)
 * @param className     Clases personalizadas
 * @param leftIcon      Ícono ReactNode que aparece al inicio del input
 */

import {
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Box
} from '@mui/material'
import { useId, useState, useCallback } from 'react'
import React from 'react'

interface SmartInputProps {
  onChange?: (value: string) => void
  name?: string
  type?: string
  placeholder?: string
  minLength?: number
  maxLength?: number
  size?: 'small' | 'medium' | 'large'
  isTextArea?: boolean
  defaultValue?: string
  fullWidth?: boolean
  label?: string
  className?: string
  leftIcon?: React.ReactNode
}

function SmartInput({
  onChange,
  name,
  type = 'text',
  placeholder = '',
  minLength,
  maxLength,
  size = 'medium',
  isTextArea = false,
  defaultValue = '',
  fullWidth = true,
  label,
  className,
  leftIcon
}: SmartInputProps) {
  const autoId = useId()
  const generatedId =
    (label || placeholder).toLowerCase().replace(/\s+/g, '-') || autoId

  const [value, setValue] = useState(defaultValue)
  const [showPassword, setShowPassword] = useState(false)

  const isPassword = type === 'password'

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setValue(newValue)
      onChange?.(newValue)
    },
    [onChange]
  )

  return (
    <Box sx={{ position: 'relative' }} className={className}>
      <TextField
        id={generatedId}
        name={name}
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        type={isPassword && !showPassword ? 'password' : 'text'}
        size={size === 'large' ? 'medium' : size}
        multiline={isTextArea}
        minRows={isTextArea ? 3 : undefined}
        maxRows={isTextArea ? 8 : undefined}
        inputProps={{
          minLength,
          maxLength
        }}
        fullWidth={fullWidth}
        variant="outlined"
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
                {showPassword ?
                  <img src="/assets/svg/eye-off-outline.svg" alt="ocultar" width="20" />
                  :
                  <img src="/assets/svg/eye-outline.svg" alt="mostrar" width="20" />
                }
              </IconButton>
            </InputAdornment>
          ) : undefined
        }}
      />

      {maxLength && (
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 8,
            color: 'text.secondary',
            fontSize: '0.7rem'
          }}>
          {value.length}/{maxLength}
        </Typography>
      )}
    </Box>
  )
}

export default React.memo(SmartInput)
