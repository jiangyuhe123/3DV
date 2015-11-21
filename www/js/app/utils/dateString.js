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
  'ko',
  '../../vendor/moment'
], function(
  $,
  ko,
  moment
){

  ko.bindingHandlers.dateString = {
    update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
    	var timestamp = valueAccessor();
    	timestamp = timestamp.replace('T', ' ');
    	timestamp = timestamp.replace('Z', '');
    	
    	var dateString = moment(timestamp).format('LLL');
    	$(element).text(dateString);
    }
  };

});