module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://47.120.26.35:8081',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}