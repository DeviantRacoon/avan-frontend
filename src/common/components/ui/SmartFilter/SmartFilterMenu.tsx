import React from 'react'
import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Typography
} from '@mui/material'

import CloseIcon from '@mui/icons-material/Close';

interface FilterOption {
  label: string
  value: string
  selected?: boolean
}

interface FilterItem {
  label: string
  key: string
  options: FilterOption[]
}

interface Props {
  open: boolean
  anchorEl: HTMLElement | null
  onClose: () => void
  filters: FilterItem[]
  activeFilters: Record<string, string>
  onFilterSelect: (label: string, value: string) => void
  onClearFilters: () => void
  isMobile: boolean
}

export default function SmartFilterMenu({
  open,
  anchorEl,
  onClose,
  filters,
  activeFilters,
  onFilterSelect,
  onClearFilters,
  isMobile
}: Props) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            px: 3,
            py: 3,
            minWidth: isMobile ? '90vw' : 400,
            maxWidth: '90vw',
            boxShadow: 6,
            bgcolor: 'background.paper'
          }
        }
      }}>
      <Typography variant="h6" fontWeight={600} mb={1}>
        Filtrar resultados
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {filters.map((filter) => (
        <FormControl key={filter.key} fullWidth size="small" sx={{ mb: 2 }}>
          <InputLabel>{filter.label}</InputLabel>
          <Select
            value={activeFilters[filter.key] || ''}
            onChange={(e) => onFilterSelect(filter.key, e.target.value)}
            label={filter.label}>
            <MenuItem value="" disabled>
              Seleccione una opción
            </MenuItem>
            {filter.options.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

      ))}

      <Button
        fullWidth
        variant="outlined"
        color="secondary"
        startIcon={<CloseIcon />}
        onClick={onClearFilters}>
        Limpiar filtros
      </Button>
    </Menu>
  )
}