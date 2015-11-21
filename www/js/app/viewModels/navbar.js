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
  'underscore',
  'ko'
], function(
  _,
  ko
){

  var navbar = function() {
    var self = this;

    self.template = 'navbar-tpl';

    self.myPostProcessingLogic = function(elements) {

    };
  };

  return navbar;

});
