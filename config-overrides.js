const {
  override,
  overrideDevServer,
  fixBabelImports,
  addLessLoader,
  disableEsLint,
  watchAll,
  addPostcssPlugins
} = require("customize-cra")

var px2rem = require('postcss-plugin-px2rem')

module.exports = {
  webpack: override(

    // 用js的方式导入antd及其样式：style为true表示导入antd.less; 为false表示不使用js的方式导入antd.less或antd.css；为'css'表示使用antd.css;
    fixBabelImports("import", {
      libraryName: "antd-mobile", libraryDirectory: "es", style: false  // 为false或css会导致addLessLoader失效
    }),
    addLessLoader({
      javascriptEnabled: false,
      // modifyVars: { "@primary-color": "#D24545" } // 深红色
    }),
    addPostcssPlugins([

    ]),
    disableEsLint() // 取消eslint检查，加快yarn start速度
  ),
  devServer: overrideDevServer(
    // dev server plugin
    watchAll()
  )
}
