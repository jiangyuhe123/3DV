/**
 * Created by michael on 2015/9/10.
 */

'use strict';


define([
    'underscore',
    'ko',
    'am.tree',
    'moment',
    'moment-zh-cn'
], function(
    _,
    ko,
    tree
){
    var viewModel = function(){
        var self = this;
        self.template = "menu/userquicksearch-tpl";

        self.myPostProcessingLogic = function(elements) {
            $(".am-selected").selected();
        };

        /**
         * search panel attribute
         */
        var progress = $.AMUI.progress;
        self.errorMsgs = ko.observableArray([]);
        self.userList = ko.observableArray([]);
        self.searchUserName = ko.observable();

        /**
         * detail panel attribute
         */
        self.userDetailTitle = ko.observable("");

        /**
         * user Detail
         */
        self.userID = ko.observable();
        self.userName = ko.observable().extend({required : { message: '\u7528\u6237\u59d3\u540d\u4e0d\u80fd\u4e3a\u7a7a' }});
        self.userCardType = ko.observable();
        self.userCard = ko.observable();
        self.userEmail = ko.observable();
        self.userMobile = ko.observable();
        self.userCompany = ko.observable();
        self.userIntroduction = ko.observable();
        self.userQQ = ko.observable();
        self.userWeiBo = ko.observable();
        self.userUnion = ko.observable();

        function nvl(content){
            if (typeof(content) !== 'undefined') {
                return content;
            }
            else{
                return "";
            }
        };

        function formatParameter(param){
            return encodeURIComponent($.trim(param));
        };

        function dataStringFormator(timestamp){
            moment.locale('zh-cn');
            if(typeof timestamp != 'undefined'){
                timestamp = timestamp.replace('T', ' ');
                timestamp = timestamp.replace('Z', '');
                var time = moment(timestamp).format('L');
                return time;
            }
            else {
                return timestamp;
            }
        };

        self.modifyUser = function(obj, event, data) {
            self.userID(obj.id);
            self.userDetailTitle(obj.name + "\u8be6\u7ec6\u4fe1\u606f");
            $("#do-not-say-6").collapse('open');
            var searchUserListURL = $a.servicesUrl + "tu/users/"+ self.userID() +"?authToken="+$.cookie("token");
            $.ajax({
                type: "get",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                url: searchUserListURL,
                success: function (json) {
                    if(typeof json !== 'undefined'){
                        $("#panelUserDetail").removeClass("am-hide");
                        loadUser(json);
                    }
                    else{
                        var $modal = $('#user-detail-null');
                        $modal.modal();
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
        };

        self.searchClick = function() {
            if (typeof self.searchUserName() != 'undefined' && $.trim(self.searchUserName()) != "") {
                var searchUnionListURL = $a.servicesUrl + "tu/tradeUnions/mine?authToken="+$.cookie("token");
                $.ajax({
                    type: "get",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    crossDomain: true,
                    url: searchUnionListURL,
                    success: function (json) {
                        if(typeof json !== 'undefined'){
                            var searchUserListURL = $a.servicesUrl + "tu/users/validation/name/" + formatParameter(self.searchUserName()) + "?tuId="+ json.id +"&authToken=" + $.cookie("token");
                            $.ajax({
                                type: "get",
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                crossDomain: true,
                                url: searchUserListURL,
                                success: function (json) {
                                    if (typeof json != 'undefined' && json.length > 0) {
                                        _.each(json, function (user) {
                                            if (typeof user != "undefined") {
                                                if (typeof user.tu === 'undefined') {
                                                    user.tu = {"name": ""};
                                                }
                                                if (typeof user.enterprise === 'undefined') {
                                                    user.enterprise = {"name": ""};
                                                }
                                            }
                                        });

                                        self.userList(json);
                                    } else {
                                        var $modal = $('#user-search-null');
                                        $modal.modal();
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

                $("#panelUserDetail").addClass("am-hide");
            }
        };

        function makeInputDisable(divId) {
            $("#" + divId +" input[type=text]").each(function() {
                var id = $(this).attr("id");
                $("#" + id).attr("disabled", "true");
            });
        };

        function makeInputEnable(divId) {
            $("#" + divId +" input[type=text]").each(function() {
                var id = $(this).attr("id");
                $("#" + id).removeAttr("disabled")
            });
        }

        self.submitUserBasicInfo = function() {
            $("#idFieldsetUserInfo").attr("disabled", "true");
        };

        self.editUserBasicInfo = function() {
            $("#idFieldsetUserInfo").removeAttr("disabled");
        };

        self.cancelUserBasicInfo = function() {
            $("#idFieldsetUserInfo").attr("disabled", "true");
            var searchUserListURL = $a.servicesUrl + "tu/users/"+ self.userID() +"?authToken="+$.cookie("token");
            $.ajax({
                type: "get",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                url: searchUserListURL,
                success: function (json) {
                    loadUser(json);
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

        function loadUser(json) {
            self.userID(json.id);
            self.userName(json.name);
            self.userCardType(json.identityType);
            self.userCard(json.identity);
            self.userEmail(json.email);
            self.userMobile(json.phone);
            self.userCompany(typeof json.enterprise !== 'undefined' ? json.enterprise.name: "");
            self.userIntroduction(json.introduction);
            self.userQQ (json.qq);
            self.userWeiBo(json.weibo);
            self.userUnion(typeof json.tu !== 'undefined' ? json.tu.name : "");
        };
    };

    return viewModel;
});
