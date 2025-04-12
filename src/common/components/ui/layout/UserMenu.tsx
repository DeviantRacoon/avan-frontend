// File: /components/layout/UserMenu.tsx
'use client';

import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
  useTheme,
  Paper
} from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import Person from '@mui/icons-material/Person';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';

export default function UserMenu() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    handleClose();
  };

  return (
    <Box display="flex" alignItems="center">
      <IconButton
        onClick={handleOpen}
        sx={{ p: 0, display: 'flex', alignItems: 'center', gap: 1 }}
        aria-controls={open ? 'user-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar alt="Juan Pérez" sx={{ width: 36, height: 36, bgcolor: theme.palette.secondary.main }}>
          JP
        </Avatar>
        <Typography variant="body2" fontWeight={500} color="primary.contrastText" sx={{ display: { xs: 'none', sm: 'block' } }}>
          Juan Pérez
        </Typography>
        <ArrowDropDown />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="user-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: Paper,
          elevation: 6,
          sx: {
            mt: 1,
            borderRadius: 2,
            minWidth: 220,
            px: 1,
            py: 0.5,
            background: `linear-gradient(to right, ${theme.palette.background.paper}, ${theme.palette.grey[50]})`,
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          Perfil
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Configuración
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleLogout} sx={{ color: theme.palette.error.main }}>
          <ListItemIcon>
            <Logout fontSize="small" color="error" />
          </ListItemIcon>
          Cerrar sesión
        </MenuItem>
      </Menu>
    </Box>
  );
}