'use client'

import React, { createContext, useContext, useState } from 'react'

type TUIContext = {
  asideOpen: boolean
  setAsideOpen: (open: boolean) => void
}

export const UIContext = createContext<TUIContext>({
  asideOpen: false,
  setAsideOpen: () => {}
})

interface Props {
  children: React.ReactNode
}

export const UIContextProvider: React.FC<Props> = ({ children }: Props) => {
  const [asideOpen, setAsideOpen] = useState<boolean>(false)

  return (
    <UIContext.Provider
      value={{
        asideOpen,
        setAsideOpen
      }}>
      {children}
    </UIContext.Provider>
  )
}

export const useUiContext = (): TUIContext => {
  return useContext(UIContext)
}
