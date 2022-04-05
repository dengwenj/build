#!/usr/bin/env node

const path = require('path')
const fs = require('fs')

const commandSpawn = require('./utils/terminal')

const provOrDev = process.argv.find(item => item === 'build' || item === 'start')

// windows 实际是 npm.cmd
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'

console.log(__dirname);

async function foo() {
  // 打包
  if (provOrDev === 'build') {
    try {
      // 1 npm run build
      await commandSpawn(npm, ['run', provOrDev], { cwd: __dirname })

      // 创建文件夹
      fs.mkdir(path.resolve(process.cwd(), 'dist'), (err) => {
        if (!err) {
          // 2 copy 文件到 process.cwd()
          fs.copyFile(path.resolve(__dirname, 'dist/bundle.js'), path.resolve(process.cwd(), 'dist/bundle.js'), (err) => {
            console.log(err)
          })
        }
      })
      
      // 3 delete 这里面的 dist 文件夹
      
    } catch (error) {
      console.log(error)
    }
  }
}
foo()


// 开启本地服务
if (provOrDev === 'start') {
  try {
    // npm run start
    commandSpawn(npm, ['run', provOrDev])
  } catch (error) {
    console.log(error)
  }
}
