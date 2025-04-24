import { useMemo } from 'react'

import { IMenuItem } from '@/common/models'

import { modulesList } from '@/config/routes'
import { getCurrentUser } from '@/common/utils'

export function useDrawerContent() {

  const menuItems: IMenuItem[] = useMemo(() => {
    const { profile } = getCurrentUser()

    return modulesList.filter((module) => {
      return profile.some((item) => '/' + item.module.toLowerCase() === module.link?.toLowerCase() || module.link === '/home')
    })
  }, [])

  return {
    menuItems
  }
}
