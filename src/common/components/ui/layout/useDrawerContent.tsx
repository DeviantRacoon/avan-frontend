import { useMemo } from 'react'
import { getCurrentUser } from '@/common/utils'


interface MenuItem {
  label: string
  icon: React.ReactElement
  link?: string
  submenu?: { label: string; link: string }[]
}

const menuItems = useMemo<MenuItem[]>(() => [
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

export function useDrawerContent(props: any) {


  return {

  }
}
