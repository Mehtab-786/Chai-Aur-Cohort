import { useState } from "react"

function Foundation04() {
    const [value, setValue] = useState(0)

    const increment = () => {
        setValue(value+1)
    }
    const decrement = () => {
        if(value >= 1) setValue(value-1)
    }
    
  return (
    <div>
        <button onClick={increment}>Increment</button>
        <h3>Value : {value}</h3>
        <button onClick={decrement}>Decrement</button>
    </div>
    
  )
}

export default Foundation04