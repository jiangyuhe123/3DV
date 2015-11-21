'use strict';
// This module loads all the modules needed for a knockout application
//  - Infuser
//  - TrafficCop
//  - knockout.js
//  - koexternaltemplateengine

requirejs.config({
  paths: {
    'json2':       'json2',
    'infuser':     'infuser-amd',
    'TrafficCop':  'TrafficCop',
    'ko':          'knockout-2.3.0',
    'koext':       'koExternalTemplateEngine-amd'
  },
  shim: {
    // add in to support IE8
    'json2': { exports: 'JSON' },
    'TrafficCop':    { deps: [ 'json2' ]}
  }
});

define([
  'jquery',
  'infuser',
  'ko',
  'koext'
], function(
  $,
  infuser,
  ko,
  koext
) {

  infuser.defaults.templateUrl = "js/app/views";

  return ko;

});
