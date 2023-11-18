import { useState, useRef, useCallback, useMemo } from "react"

type UseValueOptions<T> = {
  initialValue: T
  useRef?: boolean
}

type Updater<T> = (prevValue: T) => T

export type SmartValue<T> = {
  get: () => T
  set: (value: T | Updater<T>) => void
  getInitial: () => T
  reset: () => void
}

export const useSmartValue = <T>(
  options?: UseValueOptions<T>
): SmartValue<T> => {
  const { useRef: shouldUseRef = false, initialValue } = options || {}
  const initialRef = useRef(initialValue)

  if (shouldUseRef) {
    const valueRef = useRef(initialValue)

    const get = useCallback(() => valueRef.current as T, [valueRef])
    const set = useCallback(
      (value: T | Updater<T>) => {
        if (typeof value === "function") {
          valueRef.current = (value as Updater<T>)(valueRef.current as T)
        } else {
          valueRef.current = value
        }
      },
      [valueRef]
    )
    const getInitial = useCallback(() => initialRef.current as T, [initialRef])
    const reset = useCallback(() => {
      valueRef.current = initialRef.current
    }, [valueRef, initialRef])

    return useMemo(
      () => ({ get, set, getInitial, reset }),
      [get, set, getInitial, reset]
    )
  } else {
    const [value, setValue] = useState(initialValue)

    const get = useCallback(() => value as T, [value])
    const set = useCallback(
      (value: T | Updater<T>) => {
        if (typeof value === "function") {
          setValue((prev) => (value as Updater<T>)(prev as T))
        } else {
          setValue(value)
        }
      },
      [setValue]
    )
    const getInitial = useCallback(() => initialRef.current as T, [initialRef])
    const reset = useCallback(() => {
      setValue(initialRef.current)
    }, [setValue, initialRef])

    return useMemo(
      () => ({ get, set, getInitial, reset }),
      [get, set, getInitial, reset]
    )
  }
}
