import React, { useCallback } from 'react'
import { TextField, InputAdornment, IconButton } from '@mui/material'

interface Props {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
  placeholder?: string
}

export default function SmartFilterInput({ value, onChange, onSearch, placeholder }: Props) {
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSearch()
  }, [onSearch])

  return (
    <TextField
      size="small"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={onSearch} edge="end">
              <img src="/assets/svg/search-outline.svg" alt="Default Order" width={20} />
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  )
}
