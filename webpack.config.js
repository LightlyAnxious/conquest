const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { basename } = require('path');

const isDev = process.env.NODE_ENV === 'development';
const isProd = false;

// * Функция генерации копий HtmlWebpackPlugin

function generateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  console.log(templateFiles);
  return templateFiles.map(item => {
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];

    if (extension === 'html') {
      return new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, `build/${name}.html`),
        template: path.resolve(
          __dirname,
          `${templateDir}/${name}.${extension}`
        ),
        minify: {
          collapseWhitespace: true
        }
      });
    } else {
      return;
    }
  });
}

console.log(isProd);

// Создание массива html плагинов
const htmlPlugins = generateHtmlPlugins('./build').filter(
  el => el !== undefined
);

// * Функция инициализации плагинов в зависимости от параметра mode:

const plugins = () => {
  let base = [
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /a\.vendor|node_modules/,
      // add errors to webpack instead of warnings
      failOnError: true,
      // set the current working directory for displaying module paths
      cwd: process.cwd()
    }),
    new DuplicatePackageCheckerPlugin()
  ];

  if (isProd) return base.concat(htmlPlugins);

  return base;
};

// Настройки

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname),
  entry: {
    main: ['./source/js/main.js']
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'build/js')
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'all'
    },
    minimize: false,
    minimizer: [new TerserPlugin()]
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: plugins()
};
