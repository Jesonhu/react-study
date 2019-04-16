// ====================
// 获取指定目录下面的子文件夹
// 
// @update 2019/03/13
// ====================
const path = require('path')
const fs = require('fs')

const getSonDirectory = (path) => {
  // @see http://nodejs.cn/api/fs.html#fs_fs_readdirsync_path_options
  const files = fs.readdirSync(path)
  let resStr = ''
  
  files.forEach(name => {
    resStr += `+ [${name}](${PATH}/${name})\n`
  })

  console.log(resStr)
  return resStr
}

const PATH = './src/views'
const BASE_URL = 'https://github.com/Jesonhu/react-study'
getSonDirectory(PATH)