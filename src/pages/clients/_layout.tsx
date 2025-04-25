import '@fontsource/inter/400.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'

import React from 'react'

import { Container } from '@mui/material'

export default function DashboardLayout({ children }: any) {
  return (
    <Container component={"main"} sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      {children}
    </Container>
  )
}

