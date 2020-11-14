const mix = require('laravel-mix');

mix
  .disableSuccessNotifications()
  .babelConfig({
    plugins: ['@babel/plugin-syntax-dynamic-import'],
  })
  .webpackConfig({
    devtool: 'inline-source-map',
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.jsx'],
      alias: {
        app: __dirname + '/assets/js',
      },
    },
  })
  .setPublicPath('./webroot')
  .ts('assets/js/app.tsx', 'webroot/js')
  .sass('assets/sass/app.scss', 'webroot/css')
  .sourceMaps()
  .version();
