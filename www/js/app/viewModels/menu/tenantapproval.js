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
        self.template = "menu/tenantapproval-tpl";

        self.myPostProcessingLogic = function(elements) {
            $(".am-tabs").tabs();
            $(".am-dropdown").dropdown();
        };

        /**
         * public attribute
         */
        var progress = $.AMUI.progress;
        self.errorMsgs = ko.observableArray([]);
        self.waitApproveList = ko.observableArray([]);
        self.rejectApproveList = ko.observableArray([]);
        self.attachmentsList = ko.observableArray([]);
        self.popTenantName = ko.observable();
        self.popCompanyName = ko.observable();
        self.popAddressDetail = ko.observable();
        self.popPhoneNum = ko.observable();
        self.popEmail = ko.observable();
        self.popLegalRepresentative = ko.observable();
        self.popTenantRegisterCardType = ko.observable();
        self.popLegalRepresentativeIDCard = ko.observable();
        self.popCreatedAt = ko.observable();

        self.mineTUId = ko.observable();

        /**
         * service paths
         */
        var waitApproveListURL = $a.servicesUrl + "tu/tenants/tradeUnion/" + self.mineTUId() +"/pendingApprovalTenant?authToken="+$.cookie("token");

        /**
         * local attribute
         */
        var mouseClickTenantId = '';

        self.getWaitApproveList = function () {
            $.ajax({
                type: "get",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
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
            self.rejectApproveList("");
            $(".am-dropdown").dropdown();
        };

        self.operationClick = function(obj, event, data) {
            mouseClickTenantId = obj.id;
        };

        self.approveTenant = function() {
            progress.start();
            var obj = this;
            var approveUserURL = $a.servicesUrl + "tu/tenant/"+ mouseClickTenantId+ "/registration/approve?authToken="+$.cookie("token");
            $.ajax({
                headers: {
                    'Content-Type': 'application/json'
                },
                type:"POST",
                crossDomain: true,
                url:approveUserURL,
                success: function(result){
                    self.waitApproveList.remove(obj);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                }
            })
                .always(function(){
                    progress.done();
                });
        };

        self.rejectTenant = function() {
            progress.start();
            var obj = this;
            var rejectUserURL = $a.servicesUrl + "tu/tenant/"+ mouseClickTenantId+ "/registration/reject?authToken="+$.cookie("token");
            $.ajax({
                headers: {
                    'Content-Type': 'application/json'
                },
                type:"POST",
                crossDomain: true,
                url:rejectUserURL,
                success: function(result){
                    self.waitApproveList.remove(obj);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                }
            })
                .always(function(){
                    progress.done();
                });
        };

        self.getTenantDetailInfo = function(obj, event, data) {
            self.popTenantName(obj.tenantName);
            self.popCompanyName(obj.companyName);
            self.popAddressDetail(obj.addressDetail);
            self.popPhoneNum(obj.phoneNum);
            self.popEmail(obj.email);
            self.popLegalRepresentative(obj.legalRepresentative);
            self.popTenantRegisterCardType(obj.tenantRegisterCardType.name);
            self.popLegalRepresentativeIDCard(obj.legalRepresentativeIDCard);
            self.popCreatedAt(obj.createdAt);
            self.attachmentsList(obj.attachments);
        };

        self.getTenantAttachment = function(obj, event, data){
            var downloadAttachmentURL = $a.servicesUrl + "tu/tenants/certificants/" + obj.id +"?authToken="+$.cookie("token");
            window.open(downloadAttachmentURL);
        };

        self.getMineTradeUnion = function(){
            var searchUnionListURL = $a.servicesUrl + "tu/tradeUnions/mine?authToken="+$.cookie("token");
            $.ajax({
                type: "get",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                url: searchUnionListURL,
                success: function (json) {
                    if(typeof json !== 'undefined'){
                        self.mineTUId(json.id);

                        var waitApproveListURL = $a.servicesUrl + "tu/tenants/tradeUnion/" + json.id +"/pendingApprovalTenant?authToken="+$.cookie("token");
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

        self.getMineTradeUnion();
    };

    return viewModel;
});
