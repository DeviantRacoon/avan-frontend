'use client'

import React, { useState, Fragment, useMemo, useCallback } from 'react'
import Link from 'next/link'

import {
  Box,
  Collapse,
  List,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

import {
  ChevronLeft,
  ChevronRight,
  ExpandMore,
  Dashboard,
  ShoppingCart,
  BarChart,
  Layers
} from '@mui/icons-material'

// Styled components
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

const menuItems = [
  { label: 'Dashboard', icon: <Dashboard />, link: '/dashboard' },
  { label: 'Orders', icon: <ShoppingCart />, link: '/orders' },
  {
    label: 'Reports',
    icon: <BarChart />,
    submenu: [
      { label: 'Sales', link: '/reports/sales' },
      { label: 'Traffic', link: '/reports/traffic' }
    ]
  },
  { label: 'Integrations', icon: <Layers />, link: '/integrations' }
]

export default function DrawerContent({ expanded, toggleExpand }: DrawerContentProps) {
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({})

  const toggleSubmenu = useCallback((label: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [label]: !prev[label] }))
  }, [])

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
          {menuItems.map((item) => (
            <Fragment key={item.label}>
              {item.submenu ? (
                <>
                  <NavLinkStyled
                    onClick={() => toggleSubmenu(item.label)}
                    aria-expanded={openSubmenus[item.label] || false}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    {expanded && <ListItemText primary={item.label} />}
                    {expanded && <SubMenuArrow> <ExpandMore /></SubMenuArrow>}
                  </NavLinkStyled>

                  <Collapse in={openSubmenus[item.label] && expanded} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding className="submenu">
                      {item.submenu.map((sub) => (
                        <Link key={sub.label} href={sub.link} passHref legacyBehavior>
                          <NavLinkStyled sx={{ pl: 4 }}>
                            {expanded && <ListItemText primary={sub.label} />}
                          </NavLinkStyled>
                        </Link>
                      ))}
                    </List>
                  </Collapse>
                </>
              ) : (
                <Link key={item.label} href={item.link || '#'} passHref legacyBehavior>
                  <NavLinkStyled>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    {expanded && <ListItemText primary={item.label} />}
                  </NavLinkStyled>
                </Link>
              )}
            </Fragment>
          ))}
        </List>
      </Box>
    </SidebarContainer>
  )
}