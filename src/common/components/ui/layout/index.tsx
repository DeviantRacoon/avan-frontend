// File: /app/layout.tsx
'use client';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import DrawerContent from './DrawerContent';
import AppHeader from './AppHeader';
import { motion } from 'framer-motion';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(true);

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  const drawerWidth = 230;

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'var(--bs-body-bg)', overflow: 'hidden' }}>
      <CssBaseline />

      <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1400 }}>
        <AppHeader />
      </Box>

      <motion.div
        animate={{ x: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ position: 'fixed', top: 64, left: 0, width: drawerWidth, height: 'calc(100vh - 64px)', zIndex: 1200 }}>
        <DrawerContent expanded={expanded} toggleExpand={toggleExpand} />
      </motion.div>

      <motion.main
        animate={{ x: expanded ? 0 : -drawerWidth + drawerWidth * 0.1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ marginLeft: drawerWidth, padding: 24, paddingTop: 88, overflowY: 'auto', height: '100vh' }}>
        {children}
      </motion.main>
    </Box>
  );
}
