'use client'

import React from 'react'
import {
  Typography,
  Stack,
  Divider,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material'

import InfoOutlineIcon from '@mui/icons-material/InfoOutline';

import Modal from './Modal'
import SmartButton from './SmartButton'

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  loading?: boolean
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirmar acción',
  message = '¿Estás seguro de que deseas continuar?',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  loading = false,
}: ConfirmModalProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" noIconClose>
      <Stack spacing={3}>

        <Stack direction="row" spacing={1} alignItems="center">
          <InfoOutlineIcon  fontSize='inherit' sx={{ fontSize: 60, color: 'text.primary' }} />
          <Typography variant="subtitle1" fontWeight={700} color="text.primary">
            {title}
            <Typography variant="body2" color="text.secondary">
              {message}
            </Typography>
          </Typography>
        </Stack>


        <Divider />

        <Stack direction={isMobile ? 'column' : 'row'} spacing={1} justifyContent="flex-end">
          <SmartButton
            label={cancelText}
            variant="outlined"
            onClick={onClose}
            loading={loading}
            sx={{ flex: 1, padding: '0 38px ' }}
          />
          <SmartButton
            label={confirmText}
            variant="contained"
            onClick={onConfirm}
            fullWidth
            loading={loading}
          />
        </Stack>
      </Stack>
    </Modal>
  )
}