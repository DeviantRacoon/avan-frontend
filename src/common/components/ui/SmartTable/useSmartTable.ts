import { useState, useCallback, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

import type { SmartTableProps, Row } from './types'

interface UseSmartTableConfig {
  rows: Row[]
  columns: SmartTableProps['columns']
  onPaginate?: (page: number, rowsPerPage: number, action: 'page' | 'rowsPerPage') => void;
}

export function useSmartTable({ columns, rows, onPaginate }: UseSmartTableConfig) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [selected, setSelected] = useState<Set<string | number>>(new Set())
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    if (onPaginate) onPaginate(page, rowsPerPage, 'page')
  }, [page, rowsPerPage])

  const handleSelectAllClick = useCallback((checked: boolean) => {
    if (checked) {
      const allIds = rows.map((r) => r.id)
      setSelected(new Set(allIds))
    } else {
      setSelected(new Set())
    }
  }, [rows])

  const handleRowClick = useCallback((id: string | number) => {
    setSelected((prev) => {
      const newSet = new Set(prev)
      newSet.has(id) ? newSet.delete(id) : newSet.add(id)
      return newSet
    })
  }, [])

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage)

  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+e.target.value)
    setPage(0)
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value)
  }

  return {
    rows,
    selected,
    filterText,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSelectAllClick,
    handleRowClick,
    handleFilterChange,
    setPage,
    setRowsPerPage,
    setSelected,
  }
}
