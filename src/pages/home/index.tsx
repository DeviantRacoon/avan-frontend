'use client'

import React from 'react'
import {
  Box,
  Grid,
  Paper,
  Typography,
  useTheme,
} from '@mui/material'

import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import PeopleIcon from '@mui/icons-material/People'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import { Header } from '@/common/components'
import RootLayout from '@/common/components/ui/layout'


const stats = [
  {
    title: 'Total Ventas',
    value: '$18,420',
    icon: <AttachMoneyIcon fontSize="large" color="primary" />
  },
  {
    title: 'Usuarios Activos',
    value: '1,280',
    icon: <PeopleIcon fontSize="large" color="secondary" />
  },
  {
    title: 'Ordenes Completadas',
    value: '845',
    icon: <ShoppingCartIcon fontSize="large" color="success" />
  },
  {
    title: 'Crecimiento Mensual',
    value: '+12%',
    icon: <TrendingUpIcon fontSize="large" color="info" />
  }
]

export default function DashboardPage() {
  const theme = useTheme()

  return (
    <RootLayout>
      <Header
        icon={<TrendingUpIcon fontSize="large" color="primary" />}
        title="Panel de control"
        description="Resumen general del rendimiento de tu sistema"
      />

      <Grid container spacing={2} mb={4}>
        {stats.map((stat, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Paper
              elevation={3}
              sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box>{stat.icon}</Box>
              <Box>
                <Typography variant="body2" color="text.secondary">{stat.title}</Typography>
                <Typography variant="h6" fontWeight={700}>{stat.value}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </RootLayout>
  )
}
