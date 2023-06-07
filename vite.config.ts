const path = require('path')

export default {
  root: path.resolve(__dirname, 'src'),
  base: 'https://github.com/SpoodsTheDood/socketTest',
  build: {
    outDir: '../dist'
  },
  server: {
    port: 8080
  }
}