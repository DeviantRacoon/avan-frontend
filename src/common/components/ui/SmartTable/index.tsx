'use client'

import React, { useMemo } from 'react'
import {
  Paper, Box, TableContainer, Table, TablePagination, Typography
} from '@mui/material'

import TableHeader from './SmartTableHeader'
import TableBodyContent from './SmartTableBody'
import SmartFilter from '../SmartFilter'

import { useSmartTable } from './useSmartTable'

import { ISmartTableProps } from '@/common/models'

const SmartTable = (props: ISmartTableProps) => {
  const { columns, actions, onClick, filters, loading = false } = props

  const {
    selected,
    search,
    activeFilters,
    orderBy,
    rowsPerPage,
    filteredRows,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRowClick,
    handleSelectAllClick,
    handleSearch,
    handleFilterChange,
    handleClearFilters,
    handleToggleSort,
    page,
    orderDirection
  } = useSmartTable(props)

  const paginatedRows = useMemo(() => {
    if (loading) return []

    const start = page * rowsPerPage
    return filteredRows.slice(start, start + rowsPerPage)
  }, [filteredRows, page, rowsPerPage])

  return (
    <Paper elevation={1} sx={{ borderRadius: 1 }}>
      <SmartFilter
        placeholder="Buscar..."
        orderDirection={orderDirection}
        search={search}
        onSearch={handleSearch}
        filters={filters || []}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        orderBy={orderBy || ''}
        onToggleSort={handleToggleSort}
      />

      <TableContainer>
        <Table stickyHeader>
          <TableHeader
            columns={columns}
            filteredRows={filteredRows}
            selected={selected}
            onSelectAllClick={handleSelectAllClick}
            actions={!!actions}
          />

          <TableBodyContent
            columns={columns}
            rows={paginatedRows}
            loading={loading}
            selected={selected}
            onRowClick={handleRowClick}
            onClick={(row) => onClick?.(row)}
            actions={actions}
          />
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`}
      />

      {selected.size > 0 && (
        <Box px={2} py={1} bgcolor="action.hover">
          <Typography variant="body2">{selected.size} seleccionados</Typography>
        </Box>
      )}
    </Paper>
  )
}

export default React.memo(SmartTable)
