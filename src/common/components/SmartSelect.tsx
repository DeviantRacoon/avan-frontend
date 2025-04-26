'use client'

import React, {
  useId,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef
} from 'react'

import {
  Autocomplete,
  TextField,
  Box,
  IconButton,
  InputAdornment
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export interface SmartSelectRef {
  isValid: () => boolean
  getValue: () => string
  validate: () => boolean
}

export interface Option {
  label: string
  value: string
}

interface SmartSelectProps {
  name?: string
  label?: string
  placeholder?: string
  required?: boolean
  defaultValue?: string
  options: Option[]
  size?: 'small' | 'medium'
  fullWidth?: boolean
  helperText?: string
  onChange?: (value: string) => void
  className?: string
}

const SmartSelectComponent = forwardRef<SmartSelectRef, SmartSelectProps>((props, ref) => {
  const {
    name,
    label,
    placeholder,
    required = false,
    defaultValue = '',
    options,
    size = 'medium',
    fullWidth = true,
    helperText = '',
    onChange,
    className
  } = props

  const autoId = useId()
  const generatedId = (label || placeholder || autoId).toLowerCase().replace(/\s+/g, '-')

  const [value, setValue] = useState<Option | null>(
    options.find((opt) => opt.value === defaultValue) || null
  )
  const [error, setError] = useState('')
  const [touched, setTouched] = useState(false)

  const validate = useCallback((val: Option | null): boolean => {
    if (required && (!val || !val.value)) {
      setError('Este campo es obligatorio')
      return false
    }
    setError('')
    return true
  }, [required])

  const handleChange = useCallback(
    (_: any, newValue: Option | null) => {
      setValue(newValue)
      validate(newValue)
      if (newValue) onChange?.(newValue.value)
    },
    [validate, onChange]
  )

  const handleClear = useCallback(() => {
    setValue(null)
    setTouched(true)
    onChange?.('')
  }, [onChange])

  useImperativeHandle(ref, () => ({
    isValid: () => error === '',
    getValue: () => value?.value || '',
    validate: () => {
      setTouched(true)
      return validate(value)
    }
  }))

  return (
    <Box className={className}>
      <Autocomplete
        id={generatedId}
        options={options}
        getOptionLabel={(option) => option.label}
        value={value!}
        onChange={handleChange}
        onBlur={() => setTouched(true)}
        renderInput={(params) => (
          <TextField
            {...params}
            name={name}
            label={label}
            error={!!error && touched}
            helperText={(touched && error) || helperText}
            size={size}
            fullWidth={fullWidth}
            placeholder=""
            InputLabelProps={{
              shrink: true,
              sx: { color: 'text.primary', fontWeight: 600 }
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {value && (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Limpiar selección"
                        onClick={handleClear}
                        edge="end"
                        size="small"
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  )}
                  {params.InputProps.endAdornment}
                </>
              )
            }}
          />
        )}
        isOptionEqualToValue={(option, val) => option.value === val.value}
        fullWidth={fullWidth}
        clearOnEscape
        autoHighlight
        noOptionsText="Sin resultados"
        disableClearable
      />
    </Box>
  )
})

export default React.memo(SmartSelectComponent)
