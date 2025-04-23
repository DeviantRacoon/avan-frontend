'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

import RootLayout from '@/common/components/ui/layout'
import { SmartTable, Header, SmartButton } from '@/common/components'
import type { Row } from '@/common/components/ui/SmartTable/types'

import AddIcon from '@mui/icons-material/Add'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'

export default function Dashboard() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [rows, setRows] = useState<Row[]>([])
  const [total, setTotal] = useState(0)

  const page = parseInt(searchParams.get('page') || '0', 10)
  const limit = parseInt(searchParams.get('limit') || '15', 10)

  const updateUrlParams = (page: number, limit: number) => {
    const newParams = new URLSearchParams(searchParams.toString())
    newParams.set('page', page.toString())
    newParams.set('limit', limit.toString())
    router.push(`?${newParams.toString()}`)
  }

  const fetchData = (page: number, limit: number, action: 'page' | 'rowsPerPage') => {
    console.log(`✅ Acción: ${action} | Página: ${page + 1} | Límite: ${limit}`)
    updateUrlParams(page, limit)

    const allRows = [
      { id: 1, name: 'Juan Pérez Juan Pérez Juan Pérez', email: 'ZqV9y@example.com', phone: '1234567890', address: 'Calle 123, Ciudad', status: 'activo', createdAt: '2023-10-01T12:00:00Z' },
      { id: 2, name: 'María López', email: 's4NtI@example.com', phone: '9876543210', address: 'Calle 456, Ciudad', status: 'inactivo', createdAt: '2023-10-01T12:00:00Z' },
      { id: 3, name: 'Pedro González', email: 'kK3q2@example.com', phone: '5555555555', address: 'Calle 789, Ciudad', status: 'activo', createdAt: '2023-10-01T12:00:00Z' },
      { id: 4, name: 'Ana Martínez', email: 'B4CfA@example.com', phone: '1111111111', address: 'Calle 321, Ciudad', status: 'inactivo', createdAt: '2023-10-01T12:00:00Z' },
      { id: 5, name: 'Luis Fernández', email: 'z7kX6@example.com', phone: '2222222222', address: 'Calle 654, Ciudad', status: 'activo', createdAt: '2023-10-01T12:00:00Z' },
      { id: 6, name: 'Laura Ramírez', email: 'Gn5wF@example.com', phone: '3333333333', address: 'Calle 987, Ciudad', status: 'inactivo', createdAt: '2023-10-01T12:00:00Z' }
    ]

    const start = page * limit
    const paginated = allRows.slice(start, start + limit)

    setRows(paginated)
    setTotal(allRows.length)
  };

  useEffect(() => {
    fetchData(page, limit, 'page')
  }, [page, limit])

  return (
    <RootLayout>
      <Header
        title="Ordenes"
        description="Administra todos los usuarios registrados en el sistema."
        icon={<PeopleAltIcon fontSize="large" color="primary" />}
        actions={
          <SmartButton
            label="Agregar usuario"
            variant="contained"
            leftIcon={<AddIcon />}
            onClick={() => console.log('Agregar')}
          />
        }
      />

      <SmartTable
        page={page}
        onClick={(row) => console.log(row)}
        onPaginate={fetchData}
        columns={[
          { id: 'username', label: 'Nombre', tooltip: true },
          { id: 'email', label: 'Email' },
          { id: 'phone', label: 'Teléfono' },
          { id: 'address', label: 'Dirección' },
          { id: 'status', label: 'Estado', size: 'xs', type: 'status', align: 'center' },
          { id: 'createdAt', label: 'Creación', type: 'date', align: 'center', size: 'sm' },
        ]}
        rows={rows}
        total={total}
        actions={[
          { label: 'Editar', icon: <span>✏️</span>, onClick: (row) => console.log('Editar', row) },
          { label: 'Eliminar', icon: <span>🗑️</span>, onClick: (row) => console.log('Eliminar', row) },
        ]}
      />
    </RootLayout>
  )
}
