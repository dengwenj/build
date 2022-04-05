import './test/index.css'
import img1 from './test/我在人间凑数的日子.jpeg'
import { name1 } from './test/dwj'

import React from 'react'
import ReactDOM from 'react-dom'
// import App from './test/react'
import App from './test/ts'

import './test/test'

const message = 'dengwenjie'
console.log(message)

import('./test/hhh.js').then((res) => {
  console.log(res)
})

const imgEl = document.createElement('img')
imgEl.src = img1
document.body.appendChild(imgEl)

const foo = () => {
  console.log('foo')
}
foo()

console.log(name1);

ReactDOM.render(<App />, document.getElementById('root'))
