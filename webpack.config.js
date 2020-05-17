// global dependencies
const path = require('path');
const HTMLWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: "production",
  // DOC: https://webpack.js.org/configuration/output/
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js'
  },
  // DOC: https://webpack.js.org/configuration/dev-server/
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },

  resolve: {
    alias: {
      "react": "preact-compat",
      "react-dom": "preact-compat"
      // there might be a defination for react native, keep it.
    } 
  },

  module: {
    rules: [
        {
        test: /\.jsx?$/ ,
        exclude: /(node_modules|bower_components)/,
        use: {
            // `.swcrc` in the root can be used to configure swc
            loader: "swc-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },

      {
        test: /\.scss/i,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    // DOC: https://webpack.js.org/plugins/html-webpack-plugin/
    new HTMLWebpackPlugin({
      filename: "./index.html",
      template: path.join(__dirname, 'public/index.html')
    }),
    // DOC: https://github.com/webpack-contrib/webpack-bundle-analyzer
    new BundleAnalyzerPlugin()
  ]
};
