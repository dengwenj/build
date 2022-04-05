import React, { useState } from "react"

import { DWJ } from './styled'

export default function App() {
  const [count, setCount] = useState(0)

  const name: string = 'name'
  console.log(name)

  return (
    <DWJ>
      <h2>{count}</h2>
      <button onClick={() => setCount(count + 1)}>点击+1</button>
    </DWJ>
  )
}
