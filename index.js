import './test/index.css'
import img1 from './test/我在人间凑数的日子.jpeg'
import { name1 } from './test/dwj'

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
