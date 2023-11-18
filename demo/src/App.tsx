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

export default App
