# useSmartValue

A custom React hook to manage values with either `useState` or `useRef`, providing a consistent API for getting, setting, and retrieving the initial value, as well as resetting to the initial value.

## Installation

```bash
npm i use-smartvalue
```

or

```bash
yarn add use-smartvalue
```

or

```bash
pnpm add use-smartvalue
```

## Features

- Use either `useState` or `useRef` to manage your values based on your preference.
- Provides a consistent API for getting, setting, and retrieving the initial value.
- Ability to reset the value to its initial state.
- Lightweight and easy to integrate into any React project.
- Exported type `SmartValue` for type-safe usage.

## Usage

If you want to use `useRef` instead of `useState`, you can pass it as an option:

```tsx
import React from "react"
import { useSmartValue } from "../../dist/useSmartValue"

function App() {
  const value = useSmartValue({ initialValue: 0 })
  const refValue = useSmartValue({ initialValue: 0, useRef: true })

  return (
    <div>
      <button
        onClick={() => {
          value.set(value.get() + 1)
          refValue.set(refValue.get() + 5)
        }}>
        Increment
      </button>
      <button onClick={() => value.reset()}>reset</button>
      <button onClick={() => refValue.reset()}>
        reset ref (does not cause a re-render)
      </button>
      <p>Value: {value.get()}</p>
      <p>Ref Value: {refValue.get()}</p>
      <p>Initial Value: {value.getInitial()}</p>
      <p>Initial Ref Value: {refValue.getInitial()}</p>
    </div>
  )
}
```

## API

### `useSmartValue(options)`

- `options`: An object with the following properties:
  - `initialValue`: The initial value you want to set.
  - `useRef`: A boolean to determine if you want to use `useRef` instead of `useState`. Default is `false`.

Returns an object of type `SmartValue` with the following methods:

- `get()`: Returns the current value.
- `set(value)`: Sets the new value. Can accept a direct value or a function that receives the previous value and returns the new value.
- `getInitial()`: Returns the initial value set at the beginning.
- `reset()`: Resets the value to the initial value.

### `SmartValue<T>`

A type that describes the return value of the `useSmartValue` hook. It provides type-safe access to the hook's methods.

## Contributing

If you find any issues or have suggestions, please [open an issue](https://github.com/DevOsamaIslam/use-smartvalue/issues) on GitHub.

## License

MIT
