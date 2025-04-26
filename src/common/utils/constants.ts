export { USER_MODULES } from "./constants-modules";

export const STATUS_TO_VARIANT: Record<string, string> = {
  'Online web': 'success',
  'Offline app': 'info',
  Offline: 'secondary',

  revision: 'primary',
  pendiente: 'secondary',
  warning: 'warning',
  cancelado: 'error',
  info: 'info',
  activo: 'success',
  completado: 'success'
}
