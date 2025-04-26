'use client'

import React, { useMemo, useRef, useEffect } from 'react'
import {
  Stack,
  Typography,
  Divider,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

import Grid from '@mui/material/GridLegacy';

import Modal from './Modal'
import SmartInput, { SmartInputRef } from './SmartInput'
import SmartSelect, { SmartSelectRef } from './SmartSelect'
import SmartButton from './SmartButton'

interface FieldSchema {
  key: string
  label: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'textarea' | 'checkbox' | 'select'
  placeholder?: string
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: { message?: string; value: RegExp };
  autoFocus?: boolean
  error?: boolean
  helperText?: string
  options?: { label: string, value: string }[]
  onChange?: (e: any) => void
  breakpoint?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
}

interface ModalFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (values: Record<string, any>) => void
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  loading?: boolean
  schema: FieldSchema[]
  data?: Record<string, any>
}

export default function ModalForm({
  isOpen,
  onClose,
  onSubmit,
  title = 'Formulario',
  description,
  confirmText = 'Guardar',
  cancelText = 'Cerrar',
  loading = false,
  schema,
  data = {}
}: ModalFormProps) {
  const refs = useRef<Record<string, SmartInputRef | SmartSelectRef>>({})

  useEffect(() => {
    if (isOpen && data) {
      for (const [key, value] of Object.entries(data)) {
        refs.current[key]?.setValue?.(value)
      }
    }
  }, [isOpen, data])

  const gridFields = useMemo(() => (
    schema.map((field) => {
      const { breakpoint = { xs: 12 } } = field
      const defaultValue = data[field.key] ?? ''

      if (field.type === 'checkbox') {
        return (
          <Grid item {...breakpoint} key={field.key}>
            <FormControlLabel
              control={<Checkbox defaultChecked={!!defaultValue} onChange={field.onChange} />}
              label={field.label}
            />
          </Grid>
        )
      }

      if (field.type === 'select') {
        return (
          <Grid item {...breakpoint} key={field.key}>
            <SmartSelect
              ref={(el) => { if (el) refs.current[field.key] = el; }}
              label={field.label}
              required={field.required}
              placeholder={field.placeholder}
              options={field.options || []}
              defaultValue={defaultValue}
              onChange={field.onChange}
              size="small"
              fullWidth
            />
          </Grid>
        )
      }

      return (
        <Grid item {...breakpoint} key={field.key}>
          <SmartInput
            ref={(el) => { if (el) refs.current[field.key] = el; }}
            type={field.type === 'textarea' ? 'text' : field.type}
            isTextArea={field.type === 'textarea'}
            label={field.label}
            placeholder={field.placeholder}
            required={field.required}
            defaultValue={defaultValue}
            onChange={field.onChange}
            minLength={field.minLength}
            maxLength={field.maxLength}
            pattern={field.pattern}
            size="small"
            fullWidth
          />
        </Grid>
      )
    })
  ), [schema, data])

  const handleSubmit = () => {
    let isValid = true
    const values: Record<string, any> = {}

    for (const key of Object.keys(refs.current)) {
      const fieldRef = refs.current[key]
      const valid = fieldRef?.validate()
      if (!valid) isValid = false
      values[key] = fieldRef?.getValue()
    }

    if (!isValid) return

    onSubmit(values)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" noIconClose>
      <Typography variant="h5" color="text.primary" fontWeight={700} mb={2}>
        {title}
        {description && (
          <Typography variant="body2" color="text.secondary" mb={2}>
            {description}
          </Typography>
        )}
      </Typography>

      <Grid container spacing={2}>
        {gridFields}
      </Grid>

      <Divider sx={{ my: 2 }} />

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} justifyContent="flex-end">
        <SmartButton
          label={cancelText}
          variant="outlined"
          onClick={onClose}
          sx={{ flex: 1, padding: '0 38px' }}
          loading={loading}
        />
        <SmartButton
          label={confirmText}
          variant="contained"
          onClick={handleSubmit}
          fullWidth
          loading={loading}
        />
      </Stack>
    </Modal>
  )
}
