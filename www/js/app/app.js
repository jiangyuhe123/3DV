'use strict';

requirejs.config({
  urlArgs: "bust=" + (new Date()).getTime(),
  waitSeconds: 200,
  paths: {
    'underscore':                 'vendor/underscore',
    'jquery.cookie':              'vendor/jquery.cookie',
    'i18n':						  'jquery-i18n-properties',
    'knockout':                   'knockout-common',
    'moment':                     'moment',
    "moment-zh-cn":               'moment-zh-cn',
    'routeActions':               'app/routeActions',
    'am.tree':                    'vendor/amazeui.tree',
    'knockout.file.bind':         'vendor/knockout-file-bind',
    'select2':                    'vendor/select2/select2.min'
  },
  shim: {
    'i18n':                        	  ['jquery'],
    'underscore':                     { deps: ['jquery'], exports: '_' },
    'director':                       { exports: 'Router'},
    'routeActions':                   { deps: ['knockout']}
  }
});

define([
  'underscore',
  'knockout',  
  'director',
  'routeActions',
  'jquery.cookie',
  'i18n',
  'app.validation',
], function(
  _,
  ko,
  Router,
  routeActions
){
    // get language from client setup from mobile phone or tablet
    $.cookie("app_language", "zh_CN");
    var lang = $.cookie("app_language");
    $.i18n.properties({
      name: 'applicationResource',
      path: 'locales/',
      mode: 'both',
      language: lang,
      callback: function () {
        $('<link rel="stylesheet" type="text/css" href="./css/app/style_' + lang + '.css" />').appendTo("head");
        $('<link rel="stylesheet" type="text/css" href="./css/vendor/select2.min.css" />').appendTo("head");
        var koArray = [];
        var preprend = "app.ui.kovalidation.";
        var length = preprend.length;

        for (var key in $.i18n.map) {
          if (key.substring(0, length) === 'app.ui.kovalidation.') {
            koArray[key.substring(length, key.length)] = $.i18n.map[key];
          }
        }
        ko.validation.localize(koArray);
      }
    });

    // #############################################################
    // MESSAGE BUS
    // http://www.knockmeout.net/2012/05/using-ko-native-pubsub.html
    ko.subscribable.fn.publishOn = function (topic) {
      this.subscribe(function (newValue) {
        $a.messagebus.notifySubscribers(newValue, topic);
      });
      return this; //support chaining
    };
    ko.subscribable.fn.subscribeTo = function (topic) {
      $a.messagebus.subscribe(this, null, topic);
      return this;  //support chaining
    };
    $a.messagebus = new ko.subscribable();
    // MESSAGE BUS
    // #############################################################

    ko.extenders.numeric = function (target, precision) {
      //create a writeable computed observable to intercept writes to our observable
      var result = ko.computed({
        read: target,  //always return the original observables value
        write: function (newValue) {
          var current = target(),
              roundingMultiplier = Math.pow(10, precision),
              newValueAsNum = isNaN(newValue) ? 0 : parseFloat(+newValue),
              valueToWrite = Math.round(newValueAsNum * roundingMultiplier) / roundingMultiplier;

          //only write if it changed
          if (valueToWrite !== current) {
            target(valueToWrite);
          } else {
            //if the rounded value is the same, but a different value was written, force a notification for the current field
            if (newValue !== current) {
              target.notifySubscribers(valueToWrite);
            }
          }
        }
      });

      //initialize with current value to make sure it is rounded appropriately
      result(target());

      //return the new computed observable
      return result;
    };

    // #############################################################
    // ROUTING
    var routing = {
      // Define our route endpoints
      routes: {
        '/': {
          on: [routeActions.dashboard]
        },
        '/admin':  {
          '/login': {
            on: [routeActions.admin.login]
          }
        },
        '/menu':  {
          '/template': {
            on: [routeActions.menu.template]
          }
        }
      },
      // Set any routing options
      options: {
        strict: false // so trailing slashes are OK
      }
    };

    // Instantiate a global router
    $a.router = new Router(routing.routes).configure(routing.options).init('/admin/login');


  // #############################################################
  // DOM READY
  $(function () {
    $.ajaxSetup({
      cache: false,
      statusCode: {
        401: function() {
          alert("error happened!");
        },
        403: function() {
          alert("Auth error happened!");
        }
      },
      error:function(x,e){
        alert("error happened!");
        return false;
      }
    });

    setTimeout(function () {
      var koArray = [];
      var preprend = "app.ui.kovalidation.";
      var length = preprend.length;

      for (var key in $.i18n.map) {
        if(key.substring(0, length) === 'app.ui.kovalidation.'){
          koArray[key.substring(length, key.length)]=$.i18n.map[key];
        }
      }
      ko.validation.localize(koArray);
    });
  });
});
