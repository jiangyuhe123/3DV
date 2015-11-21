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
        self.template = "menu/approval-tpl";

        self.myPostProcessingLogic = function(elements) {
            $(".am-tabs").tabs();
            $(".am-dropdown").dropdown();
        };

        /**
         * service paths
         */
        var waitApproveListURL = $a.servicesUrl + "tu/tradeUnions/mine/pendingApprovalUsers?authToken="+$.cookie("token");

        /**
         * public attribute
         */
        var progress = $.AMUI.progress;
        self.errorMsgs = ko.observableArray([]);
        self.waitApproveList = ko.observableArray([]);
        self.waitHighLevelApproveList = ko.observableArray([]);
        self.rejectApproveList = ko.observableArray([]);

        /**
         * local attribute
         */
        var mouseClickUserId = '';

        self.getWaitApproveList = function () {
            $.ajax({
                type: "get",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                url: waitApproveListURL,
                success: function (json) {
                    self.waitApproveList(json);
                    $(".am-dropdown").dropdown();
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

        self.getRejectList = function () {
            var list = [
                {"code": "18616712345", "email": "andy@hp.com", "id": 1, "name": "andy", "phone": "18616712345", "username": "andy", "version": 1},
                {"code": "13918741910", "email": "andy2@hp.com", "id": 2, "name": "andy2", "phone": "13918741910", "username": "andy2", "version": 1},
                {"code": "15001712419", "email": "andy3@hp.com", "id": 3, "name": "andy3", "phone": "15001712419", "username": "andy3", "version": 1}

            ];
            self.rejectApproveList(list);

            //TODO here is a problem, it need force init the am event again when rebind the data
            $(".am-dropdown").dropdown();
        };

        self.operationClick = function(obj, event, data) {
            mouseClickUserId = obj.id;
        };

        self.approveUser = function() {
            progress.start();
            var obj = this;
            var approveUserURL = $a.servicesUrl + "tu/users/"+ mouseClickUserId+ "/registration/approve?authToken="+$.cookie("token");
            $.ajax({
                headers: {
                    'Content-Type': 'application/json'
                },
                type:"POST",
                crossDomain: true,
                url:approveUserURL,
                success: function(result){
                    progress.done();
                    self.waitApproveList.remove(obj);
                    //remove user from approval list when get approved
                    /*_.each(self.waitApproveList(), function(approvalList){
                        if(approvalList.id == mouseClickUserId){
                            _.remove(this);
                        }
                    });*/
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    progress.done();
                }
            })
            .always(function(){
            });
        };

        self.rejectUser = function() {
            progress.start();
            var obj = this;
            var rejectUserURL = $a.servicesUrl + "tu/users/"+ mouseClickUserId+ "/registration/reject?authToken="+$.cookie("token");
            $.ajax({
                headers: {
                    'Content-Type': 'application/json'
                },
                type:"POST",
                crossDomain: true,
                url:rejectUserURL,
                success: function(result){
                    progress.done();
                    self.waitApproveList.remove(obj);
                    //remove user from approval list when get approved
                    /*_.each(self.waitApproveList(), function(approvalList){
                        if(approvalList.id == result.id){
                            _.remove(this);
                        }
                    });*/
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    progress.done();
                }
            })
            .always(function(){
            });
        };

        self.getWaitApproveList();
    };

    return viewModel;
});
