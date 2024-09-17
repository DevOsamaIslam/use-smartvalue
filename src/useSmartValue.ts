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
  getPrevious: () => T | undefined
}

export const useSmartValue = <T>(
  options?: UseValueOptions<T>
): SmartValue<T> => {
  const { useRef: shouldUseRef = false, initialValue } = options || {}
  const initialRef = useRef(initialValue)

  if (shouldUseRef) {
    const valueRef = useRef(initialValue)
    const previousRef = useRef<T | undefined>(undefined)

    const get = useCallback(() => valueRef.current as T, [valueRef])
    const getPrevious = useCallback(() => previousRef.current, [previousRef])

    const set = useCallback(
      (value: T | Updater<T>) => {
        previousRef.current = valueRef.current
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
      previousRef.current = valueRef.current
      valueRef.current = initialRef.current
    }, [valueRef, initialRef])

    return useMemo(
      () => ({ get, set, getInitial, reset, getPrevious }),
      [get, set, getInitial, reset, getPrevious]
    )
  } else {
    const [value, setValue] = useState(initialValue)
    const previousRef = useRef<T | undefined>(undefined)

    const get = useCallback(() => value as T, [value])
    const getPrevious = useCallback(() => previousRef.current, [previousRef])

    const set = useCallback(
      (newValue: T | Updater<T>) => {
        setValue((prev) => {
          previousRef.current = prev
          if (typeof newValue === "function") {
            return (newValue as Updater<T>)(prev as T)
          } else {
            return newValue
          }
        })
      },
      [setValue]
    )
    const getInitial = useCallback(() => initialRef.current as T, [initialRef])
    const reset = useCallback(() => {
      setValue((prev) => {
        previousRef.current = prev
        return initialRef.current
      })
    }, [setValue, initialRef])

    return useMemo(
      () => ({ get, set, getInitial, reset, getPrevious }),
      [get, set, getInitial, reset, getPrevious]
    )
  }
}
