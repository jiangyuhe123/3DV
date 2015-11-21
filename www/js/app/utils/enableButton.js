
/*
 * Copyright (c) 2013 WTU. All rights reserved.
 *
 * The copyright to the computer software herein is the property of
 * WTU. The software may be used and/or copied only
 * with the written permission of WTU or in accordance
 * with the terms and conditions stipulated in the agreement/contract
 * under which the software has been supplied.
 */
'use strict';
define([
  '../../vendor/jquery',
  'underscore',
  'ko'
  
], function(
  $,
  _,
  ko
){
		

  return ko.bindingHandlers.enableButton = {

    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      // Create a new tree from the Constructor
      //console.log("connection");
     
    },

    update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    	$("checkboxes").click(function(){
    		//console.log("here also");
    		$(element).attr("disabled", !checkboxes.is(":checked"));
    	});
    }
  };
});