const CracoLessPlugin = require('craco-less');
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
      
    },
  ],
  babel: {
    // 支援裝飾器模式語法
    plugins: [
      ["@babel/plugin-proposal-decorators", {
        legacy: true
      }]
    ]
  }
};
