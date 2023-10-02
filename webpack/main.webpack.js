module.exports = {
  resolve: {
    extensions: ['.ts', '.js', '.css', '.svg']
  },
  entry: './electron/main.ts',
  module: {
    rules: require('./rules.webpack'),
  }
}