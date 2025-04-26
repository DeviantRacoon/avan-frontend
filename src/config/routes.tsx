import { IMenuItem } from "@/common/models"

export const modulesList: IMenuItem[] = [
  { label: 'Dashboard', icon: <img src="/assets/svg/grid-outline.svg" alt="correo" width="20" />, link: '/home' },
  { label: 'Clientes', icon: <img src="/assets/svg/grid-outline.svg" alt="correo" width="20" />, link: '/clients' },
  { label: 'Usuarios', icon: <img src="/assets/svg/cart-outline.svg" alt="correo" width="20" />, link: '/users' },
  { label: 'Perfiles', icon: <img src="/assets/svg/grid-outline.svg" alt="correo" width="20" />, link: '/profiles' },
  {
    label: 'Reports',
    icon: <img src="/assets/svg/file-tray-full-outline.svg" alt="correo" width="20" />,
    submenu: [
      { label: 'Sales', link: '/reports/sales' },
      { label: 'Traffic', link: '/reports/traffic' }
    ]
  },
  { label: 'Integrations', icon: <img src="/assets/svg/grid-outline.svg" alt="correo" width="20" />, link: '/integrations' }
]