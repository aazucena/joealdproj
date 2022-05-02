const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
      port: process.env.PORT ?? 3333,
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/styles/_variables.scss";
        `
      },
    }
  }
})
