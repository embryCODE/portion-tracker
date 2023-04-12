import { debounce } from 'lodash'
import { useMemo, useRef } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Callback = (...args: any[]) => any

const useDebouncedCallback = (callback: Callback, delay = 1000) => {
  const callbackRef = useRef<Callback>()
  callbackRef.current = callback

  return useMemo(
    () => debounce((...args) => callbackRef.current?.(...args), delay),
    [delay]
  )
}

export default useDebouncedCallback
