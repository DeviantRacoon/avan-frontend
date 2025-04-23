// index.tsx
import React, { useState, useMemo, useCallback } from 'react'
import { Paper, Stack, useTheme, useMediaQuery, Box, Typography, Chip, Collapse } from '@mui/material'

import SmartFilterInput from './SmartFilterInput'
import SmartFilterButtons from './SmartFilterButtons'
import SmartFilterMenu from './SmartFilterMenu'

interface FilterOption {
  label: string
  value: string
  selected?: boolean
}

interface FilterItem {
  label: string
  options: FilterOption[]
}

export interface SmartFilterProps {
  placeholder?: string
  filters?: FilterItem[]
  onSearch?: (value: string) => void
  onFilterChange?: (label: string, value: string) => void
  onClearFilters?: () => void
}

export default function SmartFilter({
  placeholder = 'Buscar...',
  filters = [],
  onSearch,
  onFilterChange,
  onClearFilters
}: SmartFilterProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [search, setSearch] = useState('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})
  const [order, setOrder] = useState<'none' | 'asc' | 'desc'>('none')

  const handleSearch = useCallback(() => {
    onSearch?.(search)
  }, [search, onSearch])

  const handleFilterSelect = useCallback((filterLabel: string, value: string) => {
    const updated = { ...activeFilters, [filterLabel]: value }
    setActiveFilters(updated)
    onFilterChange?.(filterLabel, value)
  }, [activeFilters, onFilterChange])

  const handleRemoveFilter = useCallback((label: string) => {
    const updated = { ...activeFilters }
    delete updated[label]
    setActiveFilters(updated)
    onFilterChange?.(label, '')
  }, [activeFilters, onFilterChange])

  const handleClearFilters = () => {
    setActiveFilters({})
    onClearFilters?.()
    filters.forEach(filter => {
      onFilterChange?.(filter.label, '')
    })
  }

  const handleToggleSort = useCallback(() => {
    setOrder(prev => {
      if (prev === 'asc') return 'desc'
      if (prev === 'desc') return 'none'
      return 'asc'
    })
  }, [])

  const filtersArray = useMemo(() => Object.entries(activeFilters), [activeFilters])

  return (
    <Box mb={2} p={2} borderRadius={1}>
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="stretch" justifyContent="space-between" spacing={2} width="100%">
        <SmartFilterInput
          value={search}
          onChange={setSearch}
          onSearch={handleSearch}
          placeholder={placeholder}
        />
        <SmartFilterButtons
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          onToggleSort={handleToggleSort}
          order={order}
        />
      </Stack>

      <Collapse in={filtersArray.length > 0} timeout={300}>
        <Box mt={2}>
          <Typography variant="body2" color="text.secondary" mb={1}>
            Filtros activos:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {filtersArray.map(([label, value]) => (
              <Chip
                key={label}
                label={`${label}: ${value}`}
                onDelete={() => handleRemoveFilter(label)}
                sx={{ bgcolor: 'grey.100' }}
              />
            ))}
          </Stack>
        </Box>
      </Collapse>

      <SmartFilterMenu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        filters={filters}
        activeFilters={activeFilters}
        onFilterSelect={handleFilterSelect}
        onClearFilters={handleClearFilters}
        isMobile={isMobile}
      />
    </Box>
  )
}