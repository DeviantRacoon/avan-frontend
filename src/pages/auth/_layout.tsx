import React from 'react'
import { Container } from '@mui/material'

export default function AuthLayout({ children }: any) {
  return (
    <Container component={"main"} sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      {children}
    </Container>
  )
}

