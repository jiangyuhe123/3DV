'use strict';
define([
  'knockout',
  'knockout.validation'
], function(
  ko
){

  //#############################################################
  //  VALIDATION CONFIGURATION 
  //  to change these options in viewModel
  //  ko.validation.init( /* options object */ ); function
  //  ko.applyBindingsWithValidation(viewModel, rootNode, /*options object */ ); function **contextual
  //  data-bind="validationOptions: /*options object */" binding **contextual
  //  https://github.com/Knockout-Contrib/Knockout-Validation/wiki
  

  ko.validation.configure({ 
    decorateElement: true
  });

  ko.validation.rules['greaterThan'] = {
      validator: function (val, otherVal) {
          return parseFloat(val,10) >= parseFloat(otherVal, 10);
      },
      message: 'value must be greater than or equal to {0}'
  };

  ko.validation.rules['lessThan'] = {
      validator: function (val, otherVal) {
          return parseFloat(val,10) <= parseFloat(otherVal, 10);
      },
      message: 'value must be less than or equal to {0}'
  };

  ko.validation.rules['hexidecimal'] = {
      validator: function (val, otherVal) {
        var isNotNumeric =  isNaN(Number(val)); 
        return !isNotNumeric;
      },
      message: 'not a valid hexadecimal value'
  };


  ko.validation.registerExtenders();


});