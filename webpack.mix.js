let mix = require('laravel-mix');

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

mix.disableSuccessNotifications();

/* ===== PUBLIC =====*/
mix.styles([
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/font-awesome/css/font-awesome.min.css',
    'node_modules/slick-carousel/slick/slick.css',
], 'public/dist/css/front-libs-style.css');

mix.scripts([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/bootbox.js/bootbox.min.js',
    'node_modules/slick-carousel/slick/slick.min.js',
], 'public/dist/js/front-libs-script.js');
/* ===== /PUBLIC =====*/

/* ===== ADMIN =====*/

/*mix.scripts([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/admin-lte/dist/js/app.min.js',
], 'public/js/admin-libs-script.js');

mix.styles([
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/font-awesome/css/font-awesome.min.css',
    'node_modules/admin-lte/dist/css/AdminLTE.min.css',
    'node_modules/admin-lte/dist/css/skins/_all-skins.min.css',
], 'public/css/admin-libs-style.css');*/

/* ===== /ADMIN =====*/

