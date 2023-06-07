const path = require('path')

export default {
  root: path.resolve(__dirname, 'src'),
  base: 'https://SpoodsTheDood.github.io/socketTest/',
  build: {
    outDir: '../dist'
  },
  server: {
    port: 8080
  }
}
