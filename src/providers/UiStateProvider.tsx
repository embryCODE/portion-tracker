import { createContext, ReactNode, useContext, useState } from 'react'

export interface UiStateContext {
  shouldShowLoadingIndicator: boolean
  setShouldShowLoadingIndicator: (shouldShowLoadingIndicator: boolean) => void
}
const UiStateContext = createContext<UiStateContext>({
  shouldShowLoadingIndicator: false,
  setShouldShowLoadingIndicator() {
    // do nothing
  },
})

export const UiStateProvider = ({ children }: { children: ReactNode }) => {
  const [shouldShowLoadingIndicator, setShouldShowLoadingIndicator] =
    useState(false)

  const value = {
    shouldShowLoadingIndicator,
    setShouldShowLoadingIndicator,
  }

  return (
    <UiStateContext.Provider value={value}>{children}</UiStateContext.Provider>
  )
}

export const useUiState = () => useContext(UiStateContext)
