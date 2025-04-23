'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

import React, {
  useState,
  Fragment,
  useCallback,
  useMemo
} from 'react'

import {
  Box,
  Collapse,
  List,
  ListItemText,
  Tooltip,
} from '@mui/material'

import {
  ChevronLeft,
  ChevronRight,
  ExpandMore,
} from '@mui/icons-material'

import {
  SidebarContainer,
  ToggleButtonStyled,
  NavLinkStyled,
  SubMenuArrow
} from './styledDrawer'

interface DrawerContentProps {
  expanded: boolean
  toggleExpand: () => void
}

interface MenuItem {
  label: string
  icon: React.ReactElement
  link?: string
  submenu?: { label: string; link: string }[]
}

const DrawerContent = ({ expanded, toggleExpand }: DrawerContentProps) => {
  const pathname = usePathname()
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({})

  const menuItems = useMemo<MenuItem[]>(() => [
    { label: 'Dashboard', icon: <img src="/assets/svg/grid-outline.svg" alt="correo" width="20" />, link: '/home' },
    { label: 'Dashboard', icon: <img src="/assets/svg/grid-outline.svg" alt="correo" width="20" />, link: '/home' },
    { label: 'Orders', icon: <img src="/assets/svg/cart-outline.svg" alt="correo" width="20" />, link: '/orders' },
    {
      label: 'Reports',
      icon: <img src="/assets/svg/file-tray-full-outline.svg" alt="correo" width="20" />,
      submenu: [
        { label: 'Sales', link: '/reports/sales' },
        { label: 'Traffic', link: '/reports/traffic' }
      ]
    },
    { label: 'Integrations', icon: <img src="/assets/svg/grid-outline.svg" alt="correo" width="20" />, link: '/integrations' }
  ], [])

  const toggleSubmenu = useCallback((label: string) => {
    setOpenSubmenus(prev => ({ ...prev, [label]: !prev[label] }))
  }, [])

  const isActive = (link?: string) => {
    return link && pathname?.startsWith(link)
  }

  const renderMenuItem = (item: MenuItem) => {
    const isOpen = openSubmenus[item.label] ?? false
    const active = isActive(item.link)

    if (item.submenu) {
      return (
        <Fragment key={item.label}>
          <NavLinkStyled onClick={() => toggleSubmenu(item.label)} aria-expanded={isOpen} className={active ? 'active' : ''}>
            {item.icon}
            {expanded ? (
              <>
                <ListItemText primary={item.label} />
                <SubMenuArrow as={motion.span} animate={{ rotate: isOpen ? 180 : 0 }}>
                  <ExpandMore />
                </SubMenuArrow>
              </>
            ) : (
              <ListItemText title={item.label} />
            )}
          </NavLinkStyled>

          <Collapse in={isOpen && expanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding className="submenu">
              {item.submenu.map((sub) => (
                <Link key={sub.label} href={sub.link} passHref legacyBehavior>
                  <NavLinkStyled className={isActive(sub.link) ? 'active' : ''}>
                    {expanded && <ListItemText primary={sub.label} />}
                  </NavLinkStyled>
                </Link>
              ))}
            </List>
          </Collapse>
        </Fragment>
      )
    }

    return (
      <Link key={item.label} href={item.link || '#'} passHref legacyBehavior>
        <NavLinkStyled className={active ? 'active' : ''}>
          {item.icon}
          {expanded ? (
            <ListItemText primary={item.label} />
          ) : (
            <Tooltip title={item.label} placement="right">
              <Box>{item.icon}</Box>
            </Tooltip>
          )}
        </NavLinkStyled>
      </Link>
    )
  }

  return (
    <SidebarContainer
      className={`sidebar-nav ${!expanded ? 'active' : ''}`}
      initial={false}
      animate={{ x: expanded ? 0 : '-90%' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}>

      <ToggleButtonStyled onClick={toggleExpand} className={!expanded ? 'active' : ''}>
        {expanded ? <ChevronLeft fontSize="small" /> : <ChevronRight fontSize="small" />}
      </ToggleButtonStyled>

      <Box sx={{ px: 1, pt: 2 }}>
        <List className="components">
          {menuItems.map(renderMenuItem)}
        </List>
      </Box>
    </SidebarContainer>
  )
}

export default DrawerContent
