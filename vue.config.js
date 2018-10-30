module.exports = {
  devServer: {
    open: true,
  },
  pluginOptions: {
    quasar: {
      theme: 'mat',
      importAll: true,
    },
  },
  transpileDependencies: [
    /[\\\/]node_modules[\\\/]quasar-framework[\\\/]/,
  ],
};
