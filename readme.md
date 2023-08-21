# use-smartvalue

A custom React hook to manage values with either `useState` or `useRef`, providing a consistent API for getting, setting, and retrieving the initial value, as well as resetting to the initial value.

## Installation

```bash
npm install use-smartvalue
```

## Features

- Use either `useState` or `useRef` to manage your values based on your preference.
- Provides a consistent API for getting, setting, and retrieving the initial value.
- Ability to reset the value to its initial state.
- Lightweight and easy to integrate into any React project.

## Usage

### Basic Usage

```tsx
import React from "react"
import useSmartValue from "use-smartvalue"

function App() {
  const value = useSmartValue({ initialValue: 0 })

  return (
    <div>
      <p>Current Value: {value.get()}</p>
      <button onClick={() => value.set((prev) => prev + 1)}>Increment</button>
      <button onClick={() => value.reset()}>Reset</button>
      <p>Initial Value: {value.getInitial()}</p>
    </div>
  )
}

export default App
```

### Using `useRef`

If you want to use `useRef` instead of `useState`, you can pass it as an option:

```tsx
const value = useSmartValue({ initialValue: 0, useRef: true })
```

## API

### `useSmartValue(options)`

- `options`: An object with the following properties:
  - `initialValue`: The initial value you want to set.
  - `useRef`: A boolean to determine if you want to use `useRef` instead of `useState`. Default is `false`.

Returns an object with the following methods:

- `get()`: Returns the current value.
- `set(value)`: Sets the new value. Can accept a direct value or a function that receives the previous value and returns the new value.
- `getInitial()`: Returns the initial value set at the beginning.
- `reset()`: Resets the value to the initial value.

## Contributing

If you find any issues or have suggestions, please [open an issue](https://github.com/DevOsamaIslam/use-smartvalue/issues) on GitHub.

## License

MIT
