#!/usr/bin/env node

const commandSpawn = require('./utils/terminal')

const prodOrDev = process.argv.find(item => item === 'build' || item === 'start')

// windows 实际是 npm.cmd
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'

// 先拿到前一个进程，保存到 process.env
const preProcess = process.cwd()
process.env.preProcess = preProcess

if (prodOrDev === 'build') {
  commandSpawn(npm, ['run', prodOrDev], { cwd: __dirname })
}

if (prodOrDev === 'start') {
  commandSpawn(npm, ['run', prodOrDev], { cwd: __dirname })
}
