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

        var baseRoleCodeList = ['ADMIN','MEMBERCARD_MANAGER','PENDING_APPROVAL_POOL_MANAGER','TU_ROLE_MANAGER','TU_WORKER','TU_FUNDING_REVIEW_COMMITTEE_DIRECTOR',
        'TU_CHAIRMAN','FEDERATION_TU_CHAIRMAN','ENTERPRISE_TU_CHAIRMAN'];
        // click action on the login button
        self.btnLoginClick = function() {
            progress.start();
            var $modal = $('#login-fail');
            if (self.loginErrors().length == 0) {
                $.ajax({
                     headers : {
                        'Content-Type' : 'application/x-www-form-urlencoded'
                    },
                    type : "POST",
                    crossDomain: true,
                    url : loginURL,
                    data : "username=" + self.username() +"&password=" + self.password(),
                    success : function(token) {
                        $.cookie("token", token);
                        self.saveCheckBoxCookie();
                        //check user permission
                        var getUserInfoURL = $a.servicesUrl + "tu/users/me?authToken="+token;
                        $.ajax({
                            type: "get",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            crossDomain: true,
                            url: getUserInfoURL,
                            success: function (json) {
                                var isAdmin;
                                if(typeof json.roles !== 'undefined'){
                                    _.each(json.roles, function (role) {
                                        if (role.category == 'EXTENDED') {
                                            if($.inArray(role.parent.code, baseRoleCodeList) != -1){
                                                if(typeof isAdmin === 'undefined'){
                                                    isAdmin = true;
                                                }
                                            }
                                        }
                                        else {
                                            if($.inArray(role.code, baseRoleCodeList)){
                                                if(typeof isAdmin === 'undefined'){
                                                    isAdmin = true;
                                                }
                                            }
                                        }
                                    });
                                }
                                if(isAdmin){
                                    self.loginSuccess();
                                }
                                else{
                                    var $modal2 = $('#login-fail-premission');
                                    $modal2.modal();
                                }
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
                    },
                    error : function(XMLHttpRequest, textStatus, errorThrown) {
                        $modal.modal();
                        self.password("");
                        self.password.isModified(false);
                        self.loginsuccess(false);
                    }
                 })
                    .always(function(){
                        progress.done();
                    });
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
