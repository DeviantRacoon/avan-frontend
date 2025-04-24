export interface IMenuItem {
  label: string
  icon: React.ReactElement
  link?: string
  submenu?: { label: string; link: string }[]
}
