const { spawn } = require('child_process')

const commandSpawn = (...args) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(...args)
    // childProcess.stdout.pipe(process.stdout) // 在这个进程里面输出
    // childProcess.stderr.pipe(process.stderr)
    childProcess.on('close', () => {
      resolve('111')
    })
  })
}

module.exports = commandSpawn
