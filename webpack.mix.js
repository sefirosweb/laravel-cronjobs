const mix = require("laravel-mix");
const path = require("path");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

const app_path = "vendor/laravel-cronjobs";

mix
  .setPublicPath(process.env.ASSET_PATH)
  .js("resources/js/app.js", `${app_path}/js`)
  .options({
    fileLoaderDirs: {
      images: `${app_path}/images`,
      fonts: `${app_path}/fonts`,
    },
  })
  .react()
  .sass("resources/sass/app.scss", `${app_path}/css`);

mix.webpackConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "resources/js/"),
    },
  },
});
