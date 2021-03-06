const path = require('path')

module.exports = {
  entry: path.join(__dirname, 'src', 'index.ts'),
  output: {
    filename: 'worker.js',
    path: path.join(__dirname, 'dist'),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      crypto: path.resolve(__dirname, "./null.js"),
      fs: path.resolve(__dirname, "./null.js"),
    },
  },
  // devtool: 'cheap-module-source-map',
  target: "webworker",
  mode: 'production',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    fallback: {
      buffer: require.resolve('buffer/')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          // transpileOnly is useful to skip typescript checks occasionally:
          // transpileOnly: true,
        },
      },
    ],
  },
}