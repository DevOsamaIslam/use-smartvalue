import { useState, useRef } from "react"

type UseValueOptions<T> = {
  initialValue: T
  useRef?: boolean
}

type Updater<T> = (prevValue: T) => T

type UseValueReturn<T> = {
  get: () => T
  set: (value: T | Updater<T>) => void
  getInitial: () => T
  reset: () => void
}

function useSmartValue<T>(options?: UseValueOptions<T>): UseValueReturn<T> {
  const { useRef: shouldUseRef = false, initialValue } = options || {}

  const initialRef = useRef(initialValue)

  if (shouldUseRef) {
    const valueRef = useRef(initialValue)

    return {
      get: () => valueRef.current as T,
      set: (value: T | Updater<T>) => {
        if (typeof value === "function") {
          valueRef.current = (value as Updater<T>)(valueRef.current as T)
        } else {
          valueRef.current = value
        }
      },
      getInitial: () => initialRef.current as T,
      reset: () => {
        valueRef.current = initialRef.current
      },
    }
  } else {
    const [value, setValue] = useState(initialValue)

    return {
      get: () => value as T,
      set: (value: T | Updater<T>) => {
        if (typeof value === "function") {
          setValue((prev) => (value as Updater<T>)(prev as T))
        } else {
          setValue(value)
        }
      },
      getInitial: () => initialRef.current as T,
      reset: () => {
        setValue(initialRef.current)
      },
    }
  }
}

export default useSmartValue
