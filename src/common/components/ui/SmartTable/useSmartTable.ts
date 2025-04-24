import { useState, useCallback, useMemo } from 'react'
import type { SmartTableProps, Row } from './types'

export function useSmartTable({ rows, columns }: SmartTableProps) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [selected, setSelected] = useState<Set<string | number>>(new Set())
  const [search, setSearch] = useState('')
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})
  const [orderBy, setOrderBy] = useState<string | null>()
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc' | 'none'>('none')

  const handleRowClick = useCallback((id: string | number) => {
    setSelected((prev) => {
      const newSet = new Set(prev)
      newSet.has(id) ? newSet.delete(id) : newSet.add(id)
      return newSet
    })
  }, [])

  const handleSelectAllClick = useCallback((checked: boolean) => {
    if (checked) {
      setSelected(new Set(rows.map((r) => r.id)))
    } else {
      setSelected(new Set())
    }
  }, [rows])

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage)
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+e.target.value)
    setPage(0)
  }

  const handleSearch = (value: string) => setSearch(value)

  const handleFilterChange = (label: string, value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [label]: value
    }))
  }

  const handleClearFilters = () => {
    setActiveFilters({})
    setSearch('')
  }

  const handleToggleSort = (field: string) => {
    if (orderBy === field) {
      setOrderDirection(prev => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setOrderBy(field)
      setOrderDirection('asc')
    }
  }

  const filteredRows = useMemo(() => {
    let result = [...rows]

    if (search) {
      result = result.filter(row =>
        Object.values(row).some(val =>
          val?.toString().toLowerCase().includes(search.toLowerCase())
        )
      )
    }

    for (const [key, value] of Object.entries(activeFilters)) {
      if (value) {
        result = result.filter(row => row[key]?.toString() === value)
      }
    }

    if (orderBy) {
      result.sort((a, b) => {
        const aVal = a[orderBy]
        const bVal = b[orderBy]
        if (aVal === bVal) return 0
        return orderDirection === 'asc'
          ? aVal > bVal ? 1 : -1
          : aVal < bVal ? 1 : -1
      })
    }

    return result
  }, [rows, search, activeFilters, orderBy, orderDirection])

  return {
    selected,
    setOrderBy,
    filterText: search,
    search,
    activeFilters,
    orderBy,
    orderDirection,
    filteredRows,
    rowsPerPage,
    page,
    handleRowClick,
    handleSelectAllClick,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSearch,
    handleFilterChange,
    handleClearFilters,
    handleToggleSort
  }
}
