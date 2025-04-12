'use client';
import React from 'react';
import Image from 'next/image';

import UserMenu from './UserMenu';

import { Stack, Toolbar } from '@mui/material';

export default function AppHeader() {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ backgroundColor: "primary.main" }}>
      <Toolbar>
        <Image src="/assets/img/logotipo-blanco.webp" alt="Logotipo de Avan" width={150} height={34}
          style={{ maxWidth: "100%", height: "auto" }} />
      </Toolbar>
      <UserMenu />
    </Stack>
  );
}