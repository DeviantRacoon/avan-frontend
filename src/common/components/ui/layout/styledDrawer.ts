// File: /components/layout/styledDrawer.ts
import { styled } from '@mui/material/styles';
import { IconButton, InputBase, ListItemButton } from '@mui/material';
import { motion } from 'framer-motion';

export const SidebarContainer = styled(motion.aside)(({ theme }) => ({
  width: 230,
  height: '100vh',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
  borderRight: `1px solid ${theme.palette.divider}`,
  zIndex: 1100,
}));

export const ToggleButtonStyled = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: -12,
  top: '4%',
  transform: 'translateY(-50%)',
  width: 28,
  height: 28,
  zIndex: 2000,
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    backgroundColor: "#f5f5f5",
  },
}));

export const NavLinkStyled = styled(ListItemButton)(({ theme }) => ({
  borderRadius: 8,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&.active': {
    backgroundColor: theme.palette.action.selected,
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

export const SubMenuArrow = styled('span')(() => ({
  marginLeft: 'auto',
  fontSize: '1rem',
  transform: 'scale(0.9)',
  transition: 'transform 0.3s ease',
  '[aria-expanded="true"] &': {
    transform: 'rotate(180deg)',
  },
}));