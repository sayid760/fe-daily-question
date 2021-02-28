module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
  },
  mini: {},
  h5: {
    devServer: {
      // host: 'localhost',
      // port: 10086,
      proxy: {
          '/api': {  // rest服务的path
              target: 'http://localhost:3001',  // 服务端地址
              changeOrigin: true
          }
      }
  },
  }
}
