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


  return ko.bindingHandlers.overlayDiv = {

    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      // Create a new tree from the Constructor


    },

    update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

    	var test = true;
    	 var target = $(valueAccessor());
    	$(element).click(function(){
    		//get the value from $root
    		if(test){
    			target.show();
    		}
    		else{
    			target.hide();
    		}
        	test=!test;

    	});

    }
  };
});