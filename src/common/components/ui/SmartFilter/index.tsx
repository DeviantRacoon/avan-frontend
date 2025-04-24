import React from 'react'
import {
  Box, Stack, useTheme, useMediaQuery
} from '@mui/material'

import SmartFilterInput from './SmartFilterInput'
import SmartFilterButtons from './SmartFilterButtons'
import SmartFilterMenu from './SmartFilterMenu'

import { IFilterProps } from '@/common/models'

export interface SmartFilterProps {
  placeholder?: string
  search: string
  onSearch: (value: string) => void
  filters: IFilterProps[]
  activeFilters: Record<string, string>
  onFilterChange: (label: string, value: string) => void
  onClearFilters: () => void
  orderBy: string | null
  onToggleSort: (field: string) => void,
  orderDirection?: 'asc' | 'desc' | 'none'
}

export default function SmartFilter({
  placeholder = 'Buscar...',
  search,
  onSearch,
  filters,
  activeFilters,
  onFilterChange,
  onClearFilters,
  onToggleSort,
  orderDirection
}: SmartFilterProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  return (
    <Box mb={2} p={2} borderRadius={1}>
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="stretch" justifyContent="space-between" spacing={2} width="100%">
        <SmartFilterInput
          value={search}
          onChange={onSearch}
          onSearch={() => onSearch(search)}
          placeholder={placeholder}
        />

        <SmartFilterButtons
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          onToggleSort={onToggleSort}
          order={orderDirection}
        />

      </Stack>

      <SmartFilterMenu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        filters={filters}
        activeFilters={activeFilters}
        onFilterSelect={onFilterChange}
        onClearFilters={onClearFilters}
        isMobile={isMobile}
      />
    </Box>
  )
}
