import React from 'react'
import { TableHead, TableRow, TableCell, Checkbox, Typography } from '@mui/material'
import type { Column } from './types'

interface SmartTableHeaderProps {
  columns: Column[]
  filteredRows: any[]
  selected: Set<string | number>
  onSelectAllClick: (checked: boolean) => void
  actions?: boolean
}

const sizeUnitsMap: Record<NonNullable<Column['size']>, number> = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 5,
  xxl: 6,
};

const getColumnWidth = (columns: Column[], column: Column): string => {
  const specifiedUnits = columns.reduce((sum, col) => {
    const units = col.size ? sizeUnitsMap[col.size] : 0;
    return sum + units;
  }, 0);

  const defaultColumns = columns.filter(col => !col.size).length;

  if (column.size) {
    const units = sizeUnitsMap[column.size];
    return `${(units / 12) * 100}%`;
  }

  // Distribuye el resto de espacio entre columnas sin size
  return `${((12 - specifiedUnits) / defaultColumns / 12) * 100}%`;
};

const SmartTableHeader = ({ columns, filteredRows, selected, onSelectAllClick, actions }: SmartTableHeaderProps) => {
  return (
    <TableHead>
      <TableRow>

        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={selected.size > 0 && selected.size < filteredRows.length}
            checked={filteredRows.length > 0 && selected.size === filteredRows.length}
            onChange={(e) => onSelectAllClick(e.target.checked)}
          />
        </TableCell>

        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            sx={{ width: getColumnWidth(columns, column), whiteSpace: 'nowrap' }}>
            <Typography fontWeight="bold" fontSize="0.875rem" textAlign={column.align}>
              {column.label}
            </Typography>
          </TableCell>
        ))}

        {actions && (<TableCell align="right">
          <Typography fontWeight="bold" fontSize="0.875rem">Acciones</Typography>
        </TableCell>)}

      </TableRow>
    </TableHead>
  )
};

export default SmartTableHeader
