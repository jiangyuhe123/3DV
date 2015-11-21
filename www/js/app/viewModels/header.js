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

  var header = function() {
      var self = this;
      self.template = 'header-tpl';

      self.errorMsgs = ko.observableArray([]);
      self.username = ko.observable();

      /**
       * service paths
       */
      var getUserInfoURL = $a.servicesUrl + "tu/users/me?authToken="+$.cookie("token");

      self.myPostProcessingLogic = function(elements) {
          $(".am-dropdown").dropdown();
      };

      self.getUserRealName = function() {
          if($.cookie("realName") != null){
              self.username($.cookie("realName"));
          }
          else{
              self.loadUserInfo();
          }
      };

      self.loadUserInfo = function(){
          $.ajax({
              type: "get",
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              crossDomain: true,
              url: getUserInfoURL,
              success: function (json) {
                  self.username(json.name);
                  $.cookie("realName", json.name)
              },
              timeout: 1000,
              error: function (XMLHttpRequest, textStatus, errorThrown) {
                  self.errorMsgs([]);
                  if(textStatus == 'error'){
                      self.errorMsgs.push({"message": "\u8bbf\u95ee\u7684\u8d44\u6e90\u4e0d\u5b58\u5728\uff01"});
                  }
                  else{
                      self.errorMsgs.push({"message": errorThrown.message});
                  }

                  var $modal = $('#errorAlert');
                  $modal.modal();
              }
          });
      };

      self.toggleSideBar = function(){
          $(".admin-offcanvas-bar").toggle();
          $("#hrefhidesidebar").toggle();
          $("#hrefshowsidebar").toggle();
      };

      self.getUserRealName();
  };

  return header;

});

