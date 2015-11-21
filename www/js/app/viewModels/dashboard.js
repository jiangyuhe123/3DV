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
        self.template = "dashboard-tpl";

        self.myPostProcessingLogic = function(elements) {
            $(".am-scrollspy-init").scrollspy();
        };

        self.errorMsgs = ko.observableArray([]);
        self.waitingApprovalNum = ko.observable();
        self.weeklyNewlyAddedNum = ko.observable();
        self.nextLvlUnionNum = ko.observable();
        self.enterpriseWithUnionNum = ko.observable();

        self.loadStaticsNumber = function(){
            self.loadWaitingApprovalNum();
            self.loadWeeklyNewlyAddedNum();
            self.loadNextLvlUnionNum();
            self.loadEnterpriseWithUnionNum();
        };

        self.loadWaitingApprovalNum = function(){
            var waitingApprovalNumURL = $a.servicesUrl + "tu/tradeUnions/mine/pendingApprovalUsers/count?authToken="+$.cookie("token");
            $.ajax({
                type: "get",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                url: waitingApprovalNumURL,
                success: function (json) {
                    self.waitingApprovalNum(json);
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

        self.loadWeeklyNewlyAddedNum = function(){
            var weeklyNewlyAddedNumURL = $a.servicesUrl + "tu/tradeUnions/mine/users/new/count?authToken="+$.cookie("token");
            $.ajax({
                type: "get",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                url: weeklyNewlyAddedNumURL,
                success: function (json) {
                    self.weeklyNewlyAddedNum(json);
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

        self.loadNextLvlUnionNum = function(){
            var nextLvlUnionNumURL = $a.servicesUrl + "tu/tradeUnions/mine/supervised/count?authToken="+$.cookie("token");
            $.ajax({
                type: "get",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                url: nextLvlUnionNumURL,
                success: function (json) {
                    self.nextLvlUnionNum(json);
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

        self.loadEnterpriseWithUnionNum = function(){
            var enterpriseWithUnionNumURL = $a.servicesUrl + "tu/tradeUnions/mine/supervised/enterprises/count?authToken="+$.cookie("token");
            $.ajax({
                type: "get",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                url: enterpriseWithUnionNumURL,
                success: function (json) {
                    self.enterpriseWithUnionNum(json);
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

        self.loadStaticsNumber();
    };

    return viewModel;
});
