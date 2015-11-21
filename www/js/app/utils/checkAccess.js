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


  //This binding handler is used to check for the allowed resources for the logged in user
  //When the user does not have access to the specified resource, an action is taken to either disable it or hide it	
  return ko.bindingHandlers.checkAccess = {

    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

      
      var options = allBindingsAccessor().checkAccess || {};
     
      if(options.operation && options.action){
          var isAllowed = false;
          //Check if the user is allowed the given action
          _.each($a.entitlements, function(entitlement) {
              if (options.operation === entitlement) {
                isAllowed = true;
              }
          });
          
          //If the user is not allowed to perform the operation
          if(isAllowed == false){

        	  //if the action is to disable the elements
        	  if(options.action == 'disable'){
        		  //For virtual KO element (the node name for that is #comment)
        		  if($(element)[0].nodeName == '#comment'){  
		              var child = ko.virtualElements.firstChild(element);
		              //get the child of the KO element and disable all children of that
		              if (child) {
		                child = ko.virtualElements.nextSibling(child);
		                if(child){
		                  $(child).find('*').attr('disabled', true);
		                }
		              }
	            }else{
	              //For data-bind elements disable all child elements	
	              $(element).find('*').attr('disabled', true);
	            } 
	          //if the action is to hide the elements		  
	          }else if(options.action == 'hide'){
	        	  //For KO virtual elements empty the node
	        	  if($(element)[0].nodeName == '#comment'){ 
	        		  ko.virtualElements.emptyNode(element);
	        	  }else{
	        		  //For data-bind elements, hide the element
	        		  $(element).hide();
	        	  }
	          }
          }
      	}
    },

    update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    }
    
    
  };

});