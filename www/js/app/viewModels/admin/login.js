/**
 * Created by michael on 2015/7/20.
 */
/**
 * Created by michael on 2015/6/10.
 */

'use strict';


define([
    'underscore',
    'ko'
], function(
    _,
    ko
){
    var viewModel = function(){
        var self = this;
        self.template = "admin/login-tpl";

        self.myPostProcessingLogic = function(elements) {

        };

        /**
         * service paths
         */
        var loginURL = $a.servicesUrl + "common/users/logon";

        /**
         * public attribute
         */
        var progress = $.AMUI.progress;
        self.errorMsgs = ko.observableArray([]);
        self.username = ko.observable();
        self.password = ko.observable();
        self.loginsuccess = ko.observable(false);
        self.rememberMe = ko.observable(false);
        self.loginErrors = ko.validation.group([ self.username, self.password ], {
            deep : true,
            observable : false
        });
        self.username.extend({
            required : { message: '\u8bf7\u8f93\u5165\u7528\u6237\u540d' },
            maxLength : 50,
            minLength : 5

        });
        self.password.extend({
            required : { message: '\u8bf7\u8f93\u5165\u5bc6\u7801' },
            maxLength : 20,
            minLength : 5
        });

        self.loginSuccess = function () {
            $a.router.setRoute('/')
        };

        // click action on the login button
        self.btnLoginClick = function() {
            progress.start();
            if (self.loginErrors().length == 0) {
                progress.done();
                self.loginSuccess();
            } else {
                progress.done();
                self.loginErrors.showAllMessages();
                self.loginsuccess(false);
            }
            return false;
        };

        // check for the cookie on page load
        self.checkInit = function() {
            if ($.cookie("checkbox")) {
                self.rememberMe(true);
                self.username($.cookie("username"));
            }
        };

        self.saveCheckBoxCookie = function() {
            if (self.rememberMe()) {
                var date = new Date();
                date.setTime(date.getTime() + 24 * 30 * 60 * 60 * 1000);
                // set it for approx 30 days
                $.cookie("checkbox", self.rememberMe(), {
                    expires : date
                });
                // add loginId and password
                var username = self.username();
                $.cookie("username", username, {
                    expires : date
                });
            } else {
                $.cookie("checkbox", null);
                $.cookie("username", null);
            }
            return true;
        };

        self.checkInit();
    };

    return viewModel;
});
