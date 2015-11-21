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

    var sidebar = function() {
        var self = this;

        self.template = 'sidebar-tpl';

        self.myPostProcessingLogic = function(elements) {
            $(".am-collapse").collapse();
        };
        var progress = $.AMUI.progress;
        /**
         * service paths
         */
        var logoutURL = $a.servicesUrl + "common/users/logout?authToken="+$.cookie("token");

        self.logout = function() {
            progress.start();
            $a.router.setRoute('/admin/login');
            $.ajax({
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded'
                },
                type : "DELETE",
                crossDomain: true,
                url : logoutURL,
                success : function(token) {
                },
                error : function(XMLHttpRequest, textStatus, errorThrown) {
                }
            })
                .always(function(){
                    progress.done();
                    $.cookie("token", null);
                    $.cookie("realName", null);
                });
        };
    };


    return sidebar;

});
