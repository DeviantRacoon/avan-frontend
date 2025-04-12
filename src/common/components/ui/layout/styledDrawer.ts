// File: /components/layout/styledDrawer.ts
import { styled } from '@mui/material/styles'
import { IconButton, ListItemButton } from '@mui/material'
import { motion } from 'framer-motion'

export const SidebarContainer = styled(motion.aside)(({ theme }) => ({
  width: 230,
  height: '100vh',
  position: 'relative',
  backgroundColor: 'rgba(255, 255, 255, 0.75)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  zIndex: 1100,
}))

export const ToggleButtonStyled = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: -12,
  top: '4%',
  transform: 'translateY(-50%)',
  width: 28,
  height: 28,
  zIndex: 2000,
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  },
}))

export const NavLinkStyled = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1.2, 2),
  gap: theme.spacing(1.5),
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'translateX(2px)',
  },
  '&.active': {
    backgroundColor: theme.palette.action.selected,
    fontWeight: theme.typography.fontWeightMedium,
    opacity: 0.8,
  },
}))

export const SubMenuArrow = styled(motion.span)(({ theme }) => ({
  marginLeft: 'auto',
  fontSize: '1rem',
}))
