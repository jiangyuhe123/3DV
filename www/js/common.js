
requirejs.config({
  baseUrl: './js',
  urlArgs: "bust=" + (new Date()).getTime(),
  waitSeconds: 200,
  paths: {
    'jquery':                                   'vendor/jquery.min',
    'amazeui':					                'vendor/amazeui',
    'amazeui-widgets':                          'vendor/amazeui.widgets.helper',
    'handlebars':                               'vendor/handlebars.min',
    'd3':                                       'vendor/d3.v2',
    'three':                                    'vendor/three',
    'Detector':                                 'vendor/3modeljs/Detector',
    'OBJLoader':                                'vendor/3modeljs/loaders/OBJLoader',
    'OrbitControls':                            'vendor/3modeljs/controls/OrbitControls',
    'dat-gui':                                  'vendor/3modeljs/libs/dat.gui.min'
  },
  shim: {
    // D3
    // `exports` tells requirejs to use the global d3 object as the module value
    // it does not, however, allow you to change the name of the module to 'd9' or 'foobar'
    // `exports` can also be a function which returns a value like `return jQuery.noConflict()`
    'd3':                                       { deps: [ 'jquery' ], exports: 'd3' },
    'amazeui':                                  ['jquery'],
    'amazeui-widgets':                          ['amazeui'],
    'handlebars':                               ['amazeui-widgets'],
    'Detector':                                 ['three'],
    'OBJLoader':                                ['three'],
    'OrbitControls':                            ['three'],
    'dat-gui':                                  ['three']
  }
});

define([
    'jquery',
    'amazeui',
    'amazeui-widgets',
    'handlebars'
]);