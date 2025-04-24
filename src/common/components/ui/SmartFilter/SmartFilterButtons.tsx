import React from 'react'
import { Stack, IconButton } from '@mui/material'

interface Props {
  anchorEl: HTMLElement | null
  setAnchorEl: (el: HTMLElement | null) => void
  onToggleSort?: (field: string) => void
  order?: 'none' | 'asc' | 'desc'
}

export default function SmartFilterButtons({
  setAnchorEl,
  onToggleSort,
  order = 'none'
}: Props) {
  return (
    <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <img src="/assets/svg/options-outline.svg" alt="Default Order" width={20} />
      </IconButton>

      <IconButton onClick={() => onToggleSort?.('id')}>
        {order === 'none' && <img src="/assets/svg/swap-vertical-outline.svg" alt="Default Order" width={20} />}
        {order === 'asc' && <img src="/assets/svg/arrow-up-outline.svg" alt="up" width={20} />}
        {order === 'desc' && <img src="/assets/svg/arrow-down-outline.svg" alt="down" width={20} />}
      </IconButton>
    </Stack>
  )
}
