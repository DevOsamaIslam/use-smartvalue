import useValue from "../../src/useValue"

function App() {
  const value = useValue<number>()

  return (
    <div>
      <button onClick={() => value.set((prev) => prev + 1)}>Increment</button>
      <button onClick={() => value.reset()}>reset</button>
      <p>Current Value: {value.get()}</p>
      <p>Initial Value: {value.getInitial()}</p>
    </div>
  )
}

export default App
