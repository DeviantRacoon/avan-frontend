// Libraries
import React, { useCallback, useState } from 'react'
import { format as formatDate } from 'date-fns'

// MUI
import { TableBody, TableRow, TableCell, Checkbox, IconButton, Skeleton, Chip, Tooltip, Typography, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'

// Resources
import type { Column, Row, Action } from './types'
import { STATUS_TO_VARIANT } from '@/common/utils/constants'


interface TableBodyContentProps {
  columns: Column[]
  rows: Row[]
  loading: boolean
  selected: Set<string | number>
  onRowClick: (id: string | number) => void
  onClick: (row: Row) => void | null
  // onMenuClick: (event: React.MouseEvent<HTMLElement>, row: Row) => void
  actions?: Action[]
}

const pixelSizeMap: Record<NonNullable<Column['size']>, number> = {
  xs: 80,
  sm: 120,
  md: 160,
  lg: 200,
  xl: 240,
  xxl: 300
}

const TableBodyContent = ({ columns, rows, loading, selected, onRowClick, onClick, actions }: TableBodyContentProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, row: Row) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  };

  const clickMenuItem = (action: Action, row: Row) => {
    action.onClick(row)
    handleMenuClose()
  };

  const renderCellContent = useCallback((column: Column, value: any) => {
    let content: React.ReactNode = value

    switch (column.type) {
      case 'status':
        content = <Chip size="small" label={value} sx={{ textTransform: 'capitalize', width: 70 }} color={STATUS_TO_VARIANT[value] as any ?? 'default'} />
        break
      case 'date':
        content = formatDate(new Date(value), 'dd/MM/yyyy')
        break
      case 'datetime':
        content = formatDate(new Date(value), 'dd/MM/yyyy HH:mm:ss')
        break
      case 'money':
        content = `$${Number(value).toFixed(2)}`
        break
      case 'percentage':
        content = `${Number(value).toFixed(2)}%`
        break
    };

    if (column.tooltip) {
      return (<Tooltip title={content} placement='bottom'>
        <Typography suppressHydrationWarning noWrap sx={{ textOverflow: 'ellipsis', width: pixelSizeMap[column.size ?? 'md'] }}>{content}</Typography>
      </Tooltip>)
    };

    if (column.type == 'status') {
      return content
    };

    return <Typography suppressHydrationWarning>{content}</Typography>;

  }, [columns, rows]);

  if (loading) {
    return (
      <TableBody>
        {Array.from({ length: 5 }).map((_, i) => (
          <TableRow key={`skeleton-${i}`}>
            <TableCell padding="checkbox">
              <Skeleton variant="rectangular" width={20} height={20} />
            </TableCell>
            {columns.map((col) => (
              <TableCell key={col.id}>
                <Skeleton variant="text" width="100%" />
              </TableCell>
            ))}
            <TableCell>
              <Skeleton variant="circular" width={24} height={24} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  }

  return (
    <TableBody sx={{ '&:last-child td, &:last-child th': { border: 0, paddingY: 1.5 } }}>
      {rows.map((row) => (
        <TableRow key={row.id} hover selected={selected.has(row.id)}>
          <TableCell padding="checkbox" size='small'>
            <Checkbox
              checked={selected.has(row.id)}
              onChange={() => onRowClick(row.id)}
            />
          </TableCell>

          {columns.map((column) => (
            <TableCell key={column.id} align={column.align} onClick={() => onClick?.(row)} sx={{ cursor: 'pointer' }}>
              {renderCellContent(column, row[column.id])}
            </TableCell>
          ))}

          {actions && (<TableCell align="right" onProgress={() => onClick(row)} sx={{ cursor: 'pointer' }}>
            <Tooltip title="Más opciones" placement="bottom">
              <IconButton onClick={(e) => handleMenuClick(e, row)} size="small">
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </TableCell>)}

          {actions?.length && (
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              {actions.map((action) => (
                <MenuItem key={action.label} onClick={() => clickMenuItem(action, row)} hidden={!action.hidden} sx={{ cursor: 'pointer', gap: 1 }}>
                  {action.icon}
                  {action.label}
                </MenuItem>
              ))}
            </Menu>
          )}

        </TableRow>
      ))}
    </TableBody>
  );
}

export default TableBodyContent
