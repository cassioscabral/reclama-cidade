const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const SERVICE_WORKER_FILENAME = 'service-worker.js'
const SERVICE_WORKER_CACHEID = 'reclama-cidade'
const PRODUCTION = process.env.NODE_ENV === 'production'
module.exports = {
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      PRODUCTION ? new SWPrecacheWebpackPlugin({cacheId: SERVICE_WORKER_CACHEID,
        filename: SERVICE_WORKER_FILENAME,
        staticFileGlobs: ['dist/**/*.{js,html,css}'],
        minify: true,
        stripPrefix: 'dist/',
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
            handler: 'cacheFirst'
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
            handler: 'cacheFirst'
          },
          {
            urlPattern: /^https:\/\/code\.getmdl\.io\//,
            handler: 'cacheFirst'
          },
          {
            urlPattern: /^https:\/\/thecatapi\.com\/api\/images\/get\.php\?id/,
            handler: 'cacheFirst'
          },
          {
            urlPattern: /^https:\/\/(\d+)\.media\.tumblr\.com\//,
            handler: 'cacheFirst'
          },
          {
            urlPattern: /^http:\/\/(\d+)\.media\.tumblr\.com\//,
            handler: 'cacheFirst'
          }
        ]
      }) : null
    ]
  }
}
