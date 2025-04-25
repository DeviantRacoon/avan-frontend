'use client'

// Libraries
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// MUI
import AddIcon from '@mui/icons-material/Add'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'

// Components
import RootLayout from '@/common/components/ui/layout'
import { SmartTable, Header, SmartButton } from '@/common/components'
import type { Row } from '@/common/models/interfaces/common/table-props.interface'

export default function Dashboard() {
  const router = useRouter()

  const [rows, setRows] = useState<Row[]>([])
  const [total, setTotal] = useState(0)

  const fetchData = () => {
    const allRows = [
      { id: 1, name: 'Juan Pérez Juan Pérez Juan Pérez', email: 'ZqV9y@example.com', phone: '1234567890', address: 'Calle 123, Ciudad', status: 'activo', createdAt: '2023-10-01T12:00:00Z' },
      { id: 2, name: 'María López', email: 's4NtI@example.com', phone: '9876543210', address: 'Calle 456, Ciudad', status: 'inactivo', createdAt: '2023-10-01T12:00:00Z' },
      { id: 3, name: 'Pedro González', email: 'kK3q2@example.com', phone: '5555555555', address: 'Calle 789, Ciudad', status: 'activo', createdAt: '2023-10-01T12:00:00Z' },
      { id: 4, name: 'Ana Martínez', email: 'B4CfA@example.com', phone: '1111111111', address: 'Calle 321, Ciudad', status: 'inactivo', createdAt: '2023-10-01T12:00:00Z' },
      { id: 5, name: 'Luis Fernández', email: 'z7kX6@example.com', phone: '2222222222', address: 'Calle 654, Ciudad', status: 'activo', createdAt: '2023-10-01T12:00:00Z' },
      { id: 6, name: 'Laura Ramírez', email: 'Gn5wF@example.com', phone: '3333333333', address: 'Calle 987, Ciudad', status: 'inactivo', createdAt: '2023-10-01T12:00:00Z' }
    ]

    setRows(allRows)
    setTotal(allRows.length)
  };

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <RootLayout>
      <Header
        title="Usuarios"
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
        onClick={(row) => console.log(row)}
        filters={[
          {
            label: 'Estatus',
            key: 'status',
            options: [
              { label: 'Activo', value: 'activo' },
              { label: 'Inactivo', value: 'inactivo' }
            ]
          }
        ]}
        columns={[
          { id: 'name', label: 'Nombre', tooltip: true },
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
