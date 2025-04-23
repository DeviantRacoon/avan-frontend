'use client'

import React from 'react'

import { Paper, Box, TextField, TableContainer, Table, TablePagination, Typography } from '@mui/material'

import TableHeader from './SmartTableHeader'
import TableBodyContent from './SmartTableBody'
import { useSmartTable } from './useSmartTable'

import SmartFilter from '../SmartFilter'

import type { SmartTableProps } from './types'

const SmartTable = (props: SmartTableProps) => {
  const { columns, rows, actions, total, onClick, page = 0, loading = false } = props

  const {
    selected,
    filterText,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSelectAllClick,
    handleRowClick,
    rowsPerPage,
  } = useSmartTable(props)

  return (
    <Paper elevation={1} sx={{ borderRadius: 1 }}>
      <SmartFilter filters={[
        {
          label: 'Buscar',
          options: [
            { label: 'Activos', value: 'active', selected: filterText === 'active' },
            { label: 'Inactivos', value: 'inactive', selected: filterText === 'inactive' },
          ]
        }
      ]} />
      <TableContainer sx={{ minWidth: '100%' }}>
        <Table stickyHeader>
          <TableHeader
            columns={columns}
            filteredRows={rows}
            selected={selected}
            onSelectAllClick={handleSelectAllClick}
            actions={!!actions}
          />

          <TableBodyContent
            columns={columns}
            rows={rows}
            loading={loading}
            selected={selected}
            onRowClick={handleRowClick}
            onClick={(row) => { onClick?.(row) }}
            actions={actions}
          />
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={total ?? 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {selected.size > 0 && (
        <Box px={2} py={1} bgcolor="action.hover">
          <Typography variant="body2">
            {selected.size} seleccionados
          </Typography>
        </Box>
      )}

    </Paper>
  )
}

export default React.memo(SmartTable)
