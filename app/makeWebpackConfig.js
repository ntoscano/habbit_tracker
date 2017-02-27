const path = require('path');
const get = require('lodash/get');
const set = require('lodash/set');
const merge = require('lodash/merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


const makeWebpackConfig = function(options) {
  const mainScript = get(options, 'mainScript', path.resolve(__dirname, './index.js'));
  const outputPath = get(options, 'outputPath', path.resolve(__dirname, '../dist'));
  const templatePath = get(options, 'templatePath', path.resolve(__dirname, './static/index.html'));

  const entry = {
    main: [mainScript]
  }
  if (options.testScript) {
    entry.tests = [options.testScript]
  }

  return {
    entry: entry,
    output: {
      filename: '[name].bundle.js',
      path: outputPath
    },
    resolve: {
      alias: {
        Bitmatica: path.resolve(__dirname, './')
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          options: {
            presets: [
              'stage-0',
              [ 'es2015', { modules: false } ],
              'react'
            ]
          }
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract([
            { loader: 'css-loader', options: { modules: true, sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } }
          ])
        },
        {
          test: /\.(jpe?g|png|gif|svg|ico|webp)$/,
          loader: "url-loader",
          options: { name: "/images/[name]-[hash].[ext]" },
        },
      ]
    },
    devtool: 'source-map',
    plugins: [
      new ExtractTextPlugin("styles.css"),
      new HtmlWebpackPlugin({
        template: templatePath,
        chunks: ['main']
      }),
      new HtmlWebpackPlugin({
        template: templatePath,
        chunks: ['tests'],
        filename: 'tests.html'
      })
    ]
  };
};

const makeDevConfigOverrides = (config, options) => {
  const PORT = get(options, 'PORT', 9000);
  const templatePath = get(options, 'templatePath', path.resolve(__dirname, './static/index.html'));

  // Hot Module Replacement
  config.entry.main.unshift('webpack/hot/only-dev-server');
  config.entry.main.unshift('webpack-dev-server/client?http://localhost:' + PORT);
  config.entry.main.unshift('react-hot-loader/patch'); // Must be first

  set(config, 'module.rules[1].use[0]', 'style-loader');
  config.plugins.unshift(new webpack.NamedModulesPlugin());
  config.plugins.unshift(new webpack.HotModuleReplacementPlugin()); // Must be first

  return merge(config, {
    devtool: "inline-source-map",
    devServer: {
      compress: true,
      hot: true,
      // enable HMR on the server

      contentBase: config.output.path,
      // match the output path

      publicPath: '/',
      // match the output `publicPath`

      port: PORT
    }
  });
}

makeWebpackConfig.makeWebpackConfig = makeWebpackConfig;
makeWebpackConfig.makeDevConfigOverrides = makeDevConfigOverrides;
module.exports = makeWebpackConfig;
