/**
 * Created by michael on 2015/7/20.
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
        self.template = "menu/unionaddress-tpl";

        self.myPostProcessingLogic = function(elements) {
            $(".am-selected").selected();
        };

        /**
         * service paths
         */
        var getCollectionUnionsURL = $a.servicesUrl + "tu/tradeUnions/federations?authToken="+$.cookie("token");
        var getCompanyListURL = $a.servicesUrl + "tu/inner/enterprises/no-tu?authToken="+$.cookie("token");

        /**
         * public attribute
         */
        var progress = $.AMUI.progress;
        self.errorMsgs = ko.observableArray([]);
        self.selectedCollectionUnion = ko.observable();
        self.selectedCompany = ko.observable();
        self.collectionUnions = ko.observableArray([]);
        self.collectedCompanys = ko.observableArray([]);
        self.companyList = ko.observableArray([]);

        /**
         * selected company detail
         */
        self.companyName = ko.observable();
        self.orgCode = ko.observable();
        self.legalRepresentative = ko.observable();
        self.economicType = ko.observable();
        self.employeeNum = ko.observable();
        self.investmentAmount = ko.observable();
        self.phoneNum = ko.observable();
        self.addressDetail = ko.observable();

        /**
         * private attribute
         */

        self.getCollectionUnions = function () {
            $.ajax({
                type: "get",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                url: getCollectionUnionsURL,
                success: function (json) {
                    self.collectionUnions(json);
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

        self.setSelectedCollectionUnion = function () {
            if(self.selectedCollectionUnion() != undefined) {
                _.find(self.collectionUnions(), function(union) {
                    if (union.id == self.selectedCollectionUnion()) {
                        var getCollectionUnionInfoURL = $a.servicesUrl + "tu/tradeUnions/"+ union.id +"?authToken="+$.cookie("token");
                        $.ajax({
                            type: "get",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            crossDomain: true,
                            url: getCollectionUnionInfoURL,
                            success: function (json) {
                                if(json != undefined) {
                                    self.collectedCompanys(json.managedEnterprises);
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
                });
            }
        };

        self.cancelBind = function(obj, event, data) {
            progress.start();
            var obj = this;

            var cancelBindURL = $a.servicesUrl + "tu/tradeUnions/federations/"+ self.selectedCollectionUnion() +"/enterprises/"+ obj.id +"?authToken="+$.cookie("token");
            $.ajax({
                headers: {
                    'Content-Type': 'application/json'
                },
                type:"DELETE",
                crossDomain: true,
                url:cancelBindURL,
                success: function(result){
                    progress.done();
                    self.collectedCompanys.remove(obj);
                    self.getCompanyList();
                    self.setSelectedCompany();
                    //remove company from collectedCompanys
                    /*_.each(self.collectedCompanys(), function(collectedCompanys){
                        if(collectedCompanys.id == result.id){
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

        self.getCompanyList = function () {
            $.ajax({
                type: "get",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                url: getCompanyListURL,
                success: function (json) {
                    self.companyList(json);
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

        self.setSelectedCompany = function () {
            if(self.selectedCompany() != undefined) {
                _.find(self.companyList(), function(company) {
                    if (company.id == self.selectedCompany()) {
                        var getSelectedCompanyDetailURL = $a.servicesUrl + "tu/inner/enterprises/"+ company.id +"?authToken="+$.cookie("token");
                        $.ajax({
                            type: "get",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            crossDomain: true,
                            url: getSelectedCompanyDetailURL,
                            success: function (json) {
                                if(json != undefined) {
                                    self.companyName(json.name);
                                    self.orgCode(json.orgCode);
                                    self.legalRepresentative(json.legalRepresentative);
                                    self.economicType(json.type.name);
                                    self.employeeNum(json.employeeNum);
                                    self.investmentAmount(json.investmentAmount);
                                    self.phoneNum(json.phoneNum);
                                    self.addressDetail(json.addressDetail);
                                }
                                else{
                                    self.companyName("");
                                    self.orgCode("");
                                    self.legalRepresentative("");
                                    self.economicType("");
                                    self.employeeNum("");
                                    self.investmentAmount("");
                                    self.phoneNum("");
                                    self.addressDetail("");
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
                });
            }
        };

        self.bindCompanyWithUnion = function() {
            progress.start();
            var $modal = $('#bind-success');
            var $modal2 = $('#bind-fail');
            var bindCompanyWithUnionURL = $a.servicesUrl + "tu/tradeUnions/federations/"+ self.selectedCollectionUnion() +"/enterprises/" + self.selectedCompany() + "?authToken="+$.cookie("token");
            $.ajax({
                headers: {
                    'Content-Type': 'application/json'
                },
                type:"POST",
                crossDomain: true,
                url:bindCompanyWithUnionURL,
                success: function(result){
                    progress.done();
                    self.setSelectedCollectionUnion();
                    self.getCompanyList();
                    self.setSelectedCompany();
                    $modal.modal();
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    progress.done();
                    $modal2.modal();
                }
            })
            .always(function(){
            });
        };

        self.getCollectionUnions();
        self.getCompanyList();
    };

    return viewModel;
});
