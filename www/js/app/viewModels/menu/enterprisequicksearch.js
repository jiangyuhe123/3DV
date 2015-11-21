/**
 * Created by michael on 2015/9/10.
 */

'use strict';


define([
    'underscore',
    'ko',
    'moment',
    'moment-zh-cn'
], function(
    _,
    ko
){
    var viewModel = function(){
        var self = this;
        self.template = "menu/enterprisequicksearch-tpl";

        self.myPostProcessingLogic = function(elements) {
            $(".am-selected").selected();
        };

        /**
         * search panel attribute
         */
        var progress = $.AMUI.progress;
        self.errorMsgs = ko.observableArray([]);
        self.companyList = ko.observableArray([]);
        self.searchEnterpriseName = ko.observable();

        /**
         * detail panel attribute
         */
        self.companyDetailTitle = ko.observable("");

        /**
         * company Detail
         */
        self.enterpriseID = ko.observable();
        self.companyName = ko.observable().extend({maxLength: 60, required : { message: '\u4f01\u4e1a\u540d\u79f0\u4e0d\u80fd\u4e3a\u7a7a' }});
        self.companyOrgCode = ko.observable().extend({maxLength: 9, required : { message: '\u4f01\u4e1a\u7ec4\u7ec7\u4ee3\u7801\u4e0d\u80fd\u4e3a\u7a7a' }});
        self.companyCode = ko.observable();
        self.companyRepresent = ko.observable().extend({required : { message: '\u6cd5\u4eba\u4ee3\u8868\u4e0d\u80fd\u4e3a\u7a7a' }});
        self.companyPhone = ko.observable().extend({required : { message: '\u8054\u7cfb\u7535\u8bdd\u4e0d\u80fd\u4e3a\u7a7a' }});
        self.companyDuplicate = ko.observable();
        self.companyEmployeeNum = ko.observable().extend({required : { message: '\u804c\u5de5\u4eba\u6570\u4e0d\u80fd\u4e3a\u7a7a' }});
        self.companyMemberNum = ko.observable();
        self.companySourcingEmployeeNum = ko.observable();
        self.companySourcingMemberNum = ko.observable();
        self.companyIsTop500 = ko.observable();
        self.companyTop500Name = ko.observable();
        self.companyRegisterAmount = ko.observable().extend({required : { message: '\u6ce8\u518c\u8d44\u91d1\u4e0d\u80fd\u4e3a\u7a7a' }});
        self.companyInvestAmount = ko.observable();
        self.companyCountry = ko.observable().extend({required : { message: '\u56fd\u522b\u4e0d\u80fd\u4e3a\u7a7a' }});
        self.companyIsHeaderQuarter = ko.observable();
        self.companyIs10Million = ko.observable();
        self.companyCreateDate = ko.observable().extend({required : { message: '\u4f01\u4e1a\u5efa\u7acb\u65e5\u671f\u4e0d\u80fd\u4e3a\u7a7a' }});
        self.companyMemo = ko.observable();
        self.email = ko.observable();
        self.detailAddress = ko.observable().extend({required : { message: '\u4f01\u4e1a\u8be6\u7ec6\u5730\u5740\u4e0d\u80fd\u4e3a\u7a7a' }});
        self.zipCode = ko.observable();

        self.companyVisitDate = ko.observable();
        self.companyVisitContact = ko.observable();
        self.companyVisitRecord = ko.observable();
        self.companyUnionCreateDate = ko.observable();
        self.companyUnionCode = ko.observable();
        self.companyUnionName = ko.observable();
        self.companyContingentWorkerNum = ko.observable();
        self.companyContingentWorkerName = ko.observable();
        // 0: save, 1: modify
        self.switchSaveAndModify = ko.observable();

        //------------selected list-------------------------
        self.enterpriseTypeList = ko.observableArray([]);
        self.selectedEnterpriseType = ko.observable();
        self.economicTypeList = ko.observableArray([]);
        self.selectedEconomicType = ko.observable();
        self.legalRepresentativePoliticalIdentityList = ko.observableArray([]);
        self.selectedLegalRepresentativePoliticalIdentity = ko.observable();
        self.legalRepresentativePoliticalLevelList = ko.observableArray([]);
        self.selectedLegalRepresentativePoliticalLevel = ko.observable();
        self.legalRepresentativeHonourList = ko.observableArray([]);
        self.selectedLegalRepresentativeHonour = ko.observable();
        self.statusList = ko.observableArray([]);
        self.selectedstatus = ko.observable();
        self.headquartersTypeList = ko.observableArray([]);
        self.selectedheadquartersType = ko.observable();

        self.addressCityList = ko.observableArray([]);
        self.addressDistrictList = ko.observableArray([]);
        self.addressZoneList = ko.observableArray([]);
        self.addressSubZoneList = ko.observableArray([]);
        self.selectedCity = ko.observable();
        self.selectedDistrict = ko.observable();
        self.selectedZone = ko.observable();
        self.selectedSubZone = ko.observable();

        self.headquartersTypeList = ko.observableArray([]);
        self.selectedheadquartersType = ko.observable();

        self.unionEstabishStatusList = ko.observableArray([]);
        self.selectedunionEstabishStatus = ko.observable();
        self.truefalseList = ko.observableArray([]);

        self.loginErrors = ko.validation.group([
            self.companyName,
            self.companyOrgCode,
            self.companyCode,
            self.detailAddress,
            self.companyEmployeeNum,
            self.companyRegisterAmount,
            self.companyCountry,
            self.companyPhone,
            self.companyCreateDate], {
            deep : true,
            observable : false
        });

        //------------------------------------------------------------------------
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

        function datePickedChange(){
            $('#do-not-say-5').find('.wtu-datepicker').each(function(index) {
                $(this).datepicker().
                    on('changeDate.datepicker.amui', function(event) {
                        var newDate = new Date(event.date)
                        newDate.setDate(newDate.getDate() + 1);
                        if(this.id == "companyCreateDate"){
                            self.companyCreateDate(dataStringFormator(newDate.toJSON()));
                        }
                        else if(this.id == "companyVisitDate"){
                            self.companyVisitDate(dataStringFormator(newDate.toJSON()));
                        }
                        else if(this.id == "companyUnionCreateDate"){
                            self.companyUnionCreateDate(dataStringFormator(newDate.toJSON()));
                        }
                    });
            });
        };

        self.initSearch = function() {
            var newRow = {
                "name": "",
                "status": "",
                "subZone": "",
                "tradeUnionStatus": "",
                "addressDetail": "",
                "tradeUnion": "",
                "isNewRow": true
            };

            self.companyList().push(newRow);
            $("#panelCompanyDetail").addClass("am-hide");
        };

        self.getEnterpriseTypeList = function() {
            var enterpriseType = [
                {"id": "1", "name": "\u515a\u653f\u673a\u5173"},
                {"id": "10", "name": "\u8270\u82e6\u884c\u4e1a\u4f01\u4e1a"},
                {"id": "11", "name": "\u5176\u4ed6\u4f01\u4e1a"},
                {"id": "12", "name": "\u90e8\u961f"},
                {"id": "2", "name": "\u79d1\u7814\u5355\u4f4d"},
                {"id": "3", "name": "\u9ad8\u7b49\u6559\u80b2\u5355\u4f4d"},
                {"id": "4", "name": "\u4e2d\u7b49\u3001\u521d\u7b49\u6559\u80b2\u5355\u4f4d"},
                {"id": "5", "name": "\u533b\u7597\u536b\u751f\u5355\u4f4d"},
                {"id": "6", "name": "\u8270\u82e6\u884c\u4e1a\u4e8b\u4e1a\u5355\u4f4d"},
                {"id": "7", "name": "\u5176\u4ed6\u4e8b\u4e1a\u5355\u4f4d"},
                {"id": "8", "name": "\u56fd\u6709\u4f01\u4e1a"},
                {"id": "9", "name": "\u4e09\u8d44\u4f01\u4e1a"}
            ];
            self.enterpriseTypeList(enterpriseType);
        };

        self.getEconomicTypeList = function() {
            var economicType = [
                {"id": "100", "name": "\u5185\u8d44"},
                {"id": "110", "name": "\u56fd\u6709\u5168\u8d44"},
                {"id": "120", "name": "\u96c6\u4f53\u5168\u8d44"},
                {"id": "130", "name": "\u80a1\u4efd\u5408\u4f5c"},
                {"id": "140", "name": "\u8054\u8425"},
                {"id": "141", "name": "\u56fd\u6709\u8054\u8425"},
                {"id": "142", "name": "\u96c6\u4f53\u8054\u8425"},
                {"id": "143", "name": "\u56fd\u6709\u4e0e\u96c6\u4f53\u8054\u8425"},
                {"id": "149", "name": "\u5176\u4ed6\u8054\u8425"},
                {"id": "150", "name": "\u6709\u9650\u8d23\u4efb\uff08\u516c\u53f8\uff09"},
                {"id": "151", "name": "\u56fd\u6709\u72ec\u8d44\uff08\u516c\u53f8\uff09"},
                {"id": "159", "name": "\u5176\u4ed6\u6709\u9650\u8d23\u4efb\uff08\u516c\u53f8\uff09"},
                {"id": "160", "name": "\u80a1\u4efd\u6709\u9650\uff08\u516c\u53f8\uff09"},
                {"id": "170", "name": "\u79c1\u6709"},
                {"id": "171", "name": "\u79c1\u6709\u72ec\u8d44"},
                {"id": "172", "name": "\u79c1\u6709\u5408\u4f19"},
                {"id": "173", "name": "\u79c1\u8425\u6709\u9650\u8d23\u4efb\uff08\u516c\u53f8\uff09"},
                {"id": "174", "name": "\u79c1\u8425\u80a1\u4efd\u6709\u9650\uff08\u516c\u53f8\uff09"},
                {"id": "175", "name": "\u4e2a\u4f53\u7ecf\u8425"},
                {"id": "179", "name": "\u5176\u4ed6\u79c1\u6709"},
                {"id": "190", "name": "\u5176\u4ed6\u5185\u8d44"},
                {"id": "200", "name": "\u6e2f\u6fb3\u53f0\u6295\u8d44"},
                {"id": "210", "name": "\u5185\u5730\u548c\u6e2f\u6fb3\u53f0\u5408\u8d44"},
                {"id": "220", "name": "\u5185\u5730\u548c\u6e2f\u6fb3\u53f0\u5408\u4f5c"},
                {"id": "230", "name": "\u6e2f\u6fb3\u53f0\u72ec\u8d44"},
                {"id": "240", "name": "\u6e2f\u6fb3\u53f0\u6295\u8d44\u80a1\u4efd\u6709\u9650\uff08\u516c\u53f8\uff09"},
                {"id": "290", "name": "\u5176\u4ed6\u6e2f\u6fb3\u53f0\u6295\u8d44"},
                {"id": "300", "name": "\u56fd\u5916\u6295\u8d44"}
            ];
            self.economicTypeList(economicType);
        };

        self.getLegalRepresentativePoliticalIdentityList = function() {
            var legalRepresentativePoliticalIdentity = [
                {"id": "0", "name": "\u65e0"},
                {"id": "1", "name": "\u515a\u4ee3\u8868"},
                {"id": "2", "name": "\u4eba\u5927\u4ee3\u8868"},
                {"id": "3", "name": "\u653f\u534f\u59d4\u5458"},
                {"id": "4", "name": "\u5de5\u5546\u8054\u6267\u59d4"},
                {"id": "5", "name": "\u4f01\u8054\u7406\u4e8b"},
                {"id": "6", "name": "\u9752\u8054\u59d4\u5458"},
                {"id": "7", "name": "\u79d1\u534f\u59d4\u5458"}
            ];
            self.legalRepresentativePoliticalIdentityList(legalRepresentativePoliticalIdentity);
        };

        self.getLegalRepresentativePoliticalLevelList = function() {
            var legalRepresentativePoliticalLevel = [
                {"id": "0", "name": "\u65e0"},
                {"id": "1", "name": "\u5168\u56fd"},
                {"id": "2", "name": "\u7701\u90e8\u7ea7"},
                {"id": "3", "name": "\u533a\u5385\u7ea7"},
                {"id": "4", "name": "\u53bf\u5e02\u7ea7"},
                {"id": "5", "name": "\u8857\u9547\u7ea7"}
            ];
            self.legalRepresentativePoliticalLevelList(legalRepresentativePoliticalLevel);
        };

        self.getLegalRepresentativeHonourList = function() {
            var legalRepresentativeHonour = [
                {"id": "0", "name": "\u65e0"},
                {"id": "1", "name": "\u52b3\u52a8\u6a21\u8303"},
                {"id": "2", "name": "\u4e94\u4e00\u52b3\u52a8\u5956\u7ae0"},
                {"id": "3", "name": "\u4f18\u79c0\u5171\u4ea7\u515a\u5458"},
                {"id": "4", "name": "\u4f18\u79c0\u793e\u4f1a\u4e3b\u4e49\u5efa\u8bbe\u8005"},
                {"id": "5", "name": "\u515a\u5efa\u4e4b\u53cb"},
                {"id": "6", "name": "\u5de5\u4f1a\u6700\u4f73\u5408\u4f5c\u4f19\u4f34"}
            ];
            self.legalRepresentativeHonourList(legalRepresentativeHonour);
        };

        self.getStatusList = function() {
            var status = [
                {"id": "1", "name": "\u6b63\u5e38"},
                {"id": "2", "name": "\u4e8b\u5b9e\u4e0d\u5b58\u5728"},
                {"id": "3", "name": "\u4e00\u4f01\u591a\u7167"}
            ];
            self.statusList(status);
        };

        self.getHeadquartersTypeList = function() {
            var headquartersType = [
                {"id": "1", "name": "\u5168\u7403\u603b\u90e8"},
                {"id": "2", "name": "\u533a\u57df\u603b\u90e8"},
                {"id": "3", "name": "\u4e2d\u56fd\u603b\u90e8"}
            ];
            self.headquartersTypeList(headquartersType);
        };

        self.getCityList = function() {
            var addressParameterList = [
                {"id": "310", "name": "\u4e0a\u6d77\u5e02"}
            ];
            self.addressCityList(addressParameterList);
        };

        self.getDistrictList = function() {
            var addressParameterList = [
                {"id": "310115", "name": "\u6d66\u4e1c\u65b0\u533a"}
            ];
            self.addressDistrictList(addressParameterList);
        };

        self.getZoneList = function() {
            var addressParameterList = [
                {"id": "310115001", "name": "\u5f20\u6c5f"}
            ];
            self.addressZoneList(addressParameterList);
        };

        self.getSubZoneList = function() {
            var addressParameterList = [
                {"id": "310115001001", "name": "\u8f6f\u4ef6\u56ed"},
                {"id": "310115001002", "name": "\u836f\u8c37"}
            ];
            self.addressSubZoneList(addressParameterList);
        };

        self.getUnionEstabishStatusList = function() {
            var unionEstabishStatusList = [
                {"code": "UNCOMFIRMED", "value": "\u672a\u786e\u8ba4"},
                {"code": "NOT_ESTABLISHED", "value": "\u672a\u5efa\u4f1a"},
                {"code": "ESTABLISHED", "value": "\u5df2\u5efa\u4f1a"}
            ];

            self.unionEstabishStatusList(unionEstabishStatusList);
        };

        self.getTruefalseList = function(){
            var truefalseList = [
                {"id": "1", "name": "\u662f"},
                {"id": "0", "name": "\u5426"}
            ];
            self.truefalseList(truefalseList);
        };

        self.getTradeUnionInfo = function(obj){
            if(typeof obj !== 'undefined' && typeof obj.tradeUnion !== 'undefined'){
                $a.router.setRoute("/menu/unionquicksearch/" + obj.tradeUnion.id);
            }
        };

        self.nav2CreateUnion = function(){
            $a.router.setRoute("/menu/unionquicksearch/");
        };

        self.searchClick = function() {
            var newRow = {
                "name": "",
                "status": "",
                "subZone": "",
                "tradeUnionStatus": "",
                "addressDetail": "",
                "tradeUnion": "",
                "isNewRow": true
            };

            if(typeof self.searchEnterpriseName() != 'undefined' && $.trim(self.searchEnterpriseName()) != "") {
                var searchEnterpriseListURL = $a.servicesUrl + "tu/inner/enterprises/search?name=" + formatParameter(self.searchEnterpriseName()) + "&authToken=" + $.cookie("token");
                $.ajax({
                    type: "get",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    crossDomain: true,
                    url: searchEnterpriseListURL,
                    success: function (json) {
                        if (typeof json != 'undefined' && json.length > 0) {
                            _.each(json, function (enterprise) {
                                if (typeof enterprise != "undefined") {

                                    if(typeof enterprise.status === 'undefined'){
                                        enterprise.status = {"name" : ""};
                                    }

                                    if(typeof enterprise.subZone === 'undefined'){
                                        enterprise.subZone = {"name" : ""};
                                    }

                                    if(typeof enterprise.tradeUnion === 'undefined'){
                                        enterprise.tradeUnion = {"name" : ""};
                                    }

                                    _.extend(enterprise, {isNewRow: false});
                                }
                            });

                            json.push(newRow);
                            self.companyList(json);
                        } else {
                            self.companyList().push(newRow);
                            var $modal = $('#enterprise-search-null');
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

                $("#panelCompanyDetail").addClass("am-hide");
            }
        };

        function loadEnterprise(json) {
            self.getEnterpriseTypeList();
            self.getEconomicTypeList();
            self.getLegalRepresentativePoliticalIdentityList();
            self.getLegalRepresentativePoliticalLevelList();
            self.getLegalRepresentativeHonourList();
            self.getStatusList();
            self.getHeadquartersTypeList();
            self.getCityList();
            self.getDistrictList();
            self.getZoneList();
            self.getSubZoneList();
            self.getUnionEstabishStatusList();
            self.getTruefalseList();
            datePickedChange();

            self.companyName(json.name);
            self.companyOrgCode(json.orgCode);
            self.companyCode(json.code);
            self.selectedEnterpriseType(nvl(json.type) != "" ? nvl(json.type.code) : "");
            self.selectedEconomicType(nvl(json.economicType) != "" ? nvl(json.economicType.code) : "");
            self.companyRepresent(json.legalRepresentative);
            self.companyPhone(json.phoneNum);
            self.selectedLegalRepresentativePoliticalIdentity(nvl(json.legalRepresentativePoliticalIdentity) != "" ? nvl(json.legalRepresentativePoliticalIdentity.code) : "");
            self.selectedLegalRepresentativePoliticalLevel(nvl(json.legalRepresentativePoliticalLevel) != "" ? nvl(json.legalRepresentativePoliticalLevel.code) : "");
            self.selectedLegalRepresentativeHonour(nvl(json.legalRepresentativeHonour1) != "" ? nvl(json.legalRepresentativeHonour1.code) : "");
            self.selectedstatus(nvl(json.status) != "" ? nvl(json.status.code) : "");
            self.companyDuplicate(json.duplicatedName);
            self.companyEmployeeNum(json.employeeNum);
            self.companyMemberNum(json.contingentWorkerNum);
            //self.companySourcingEmployeeNum();
            //self.companySourcingMemberNum();
            self.companyIsTop500(json.isTop500);
            self.companyTop500Name(json.top500Name);
            self.companyRegisterAmount(json.registeredCapital);
            self.companyInvestAmount(json.investmentAmount);
            self.companyCountry(json.country);
            self.companyIsHeaderQuarter(json.isHeadquarters);
            self.selectedheadquartersType(nvl(json.headquartersType) != "" ? nvl(json.headquartersType.code) : "");
            self.companyIs10Million(json.isInvestmentOver100MillionUSD);
            self.companyCreateDate(nvl(dataStringFormator(json.establishedAt)));
            self.companyMemo(json.remark);
            self.email(json.email);
            self.selectedCity(nvl(json.city) != "" ? nvl(json.city.code) : "");
            self.selectedDistrict(nvl(json.district) != "" ? nvl(json.district.code) : "");
            self.selectedZone(nvl(json.zone) != "" ? nvl(json.zone.code) : "");
            self.selectedSubZone(nvl(json.subZone) != "" ? nvl(json.subZone.code) : "");
            self.detailAddress(json.addressDetail)
            self.zipCode(json.zipcode);

            self.selectedunionEstabishStatus(json.tradeUnionStatus);
            self.companyVisitDate(nvl(dataStringFormator(json.interviewDate)));
            self.companyVisitContact(json.interviewOwner);
            self.companyVisitRecord (json.interviewRemark);
            //only when the enterprise linked tradeunion, load union info
            if(typeof json.tradeUnion !== 'undefined'){
                self.companyUnionCreateDate(nvl(dataStringFormator(json.tradeUnion.createdAt)));
                self.companyUnionCode(nvl(json.tradeUnion) != "" ? nvl(json.tradeUnion.code) : "");
                self.companyUnionName(nvl(json.tradeUnion) != "" ? nvl(json.tradeUnion.name) : "");
            }

            self.companyContingentWorkerNum(json.contingentWorkerNum);
            //self.companyContingentWorkerName = ko.observable();
        };

        function initButton() {
            $("#idFieldsetBaseinfo").attr("disabled", "true");
            $("#btnEditCompanyBasicInfo").removeAttr("disabled");
            $("#btnSubmitCompanyBasicInfo").attr("disabled", "true");
            $("#btnCancelCompanyBasicInfo").attr("disabled", "true");

            $("#idFieldsetUnionInfo").attr("disabled", "true");
            $("#btnEditCompanyUnionInfo").removeAttr("disabled");
            $("#btnSubmitCompanyUnionInfo").attr("disabled", "true");
            $("#btnCancelCompanyUnionInfo").attr("disabled", "true");
        };

        self.modifyCompany = function(obj, event, data) {
            self.companyDetailTitle(obj.name + "\u8be6\u7ec6\u4fe1\u606f");
            self.enterpriseID(obj.id);
            self.switchSaveAndModify(1);

            var searchEnterpriseListURL = $a.servicesUrl + "tu/inner/enterprises/"+ obj.id +"?authToken="+$.cookie("token");
            $.ajax({
                type: "get",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                url: searchEnterpriseListURL,
                success: function (json) {
                    $("#panelCompanyDetail").removeClass("am-hide");
                    $("#do-not-say-5").collapse('open');
                    //make union info visible for create success
                    $("#divUnionInfo").removeClass("am-hide");
                    $("#divLinkUnion").removeClass("am-hide");
                    $("#divLinkUnions").removeClass("am-hide");
                    loadEnterprise(json);
                    getLinkedUnions();
                    initButton();
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

        self.addNewCompany = function() {
            $("#panelCompanyDetail").removeClass("am-hide");
            $("#divLinkUnion").addClass("am-hide");
            $("#divUnionInfo").addClass("am-hide");
            $("#do-not-say-5").collapse('open');
            self.switchSaveAndModify(0);

            self.getEnterpriseTypeList();
            self.getEconomicTypeList();
            self.getLegalRepresentativePoliticalIdentityList();
            self.getLegalRepresentativePoliticalLevelList();
            self.getLegalRepresentativeHonourList();
            self.getStatusList();
            self.getHeadquartersTypeList();
            self.getCityList();
            self.getDistrictList();
            self.getZoneList();
            self.getSubZoneList();
            self.getUnionEstabishStatusList();
            self.getTruefalseList();
            datePickedChange();

            self.companyName("");
            self.companyOrgCode("");
            self.companyCode("");
            self.selectedEnterpriseType("");
            self.selectedEconomicType("");
            self.companyRepresent("");
            self.companyPhone("");
            self.selectedLegalRepresentativePoliticalIdentity("");
            self.selectedLegalRepresentativePoliticalLevel("");
            self.selectedLegalRepresentativeHonour("");
            self.selectedstatus("");
            self.companyDuplicate("");
            self.companyEmployeeNum("");
            self.companyMemberNum("");
            //self.companySourcingEmployeeNum();
            //self.companySourcingMemberNum();
            self.companyIsTop500("");
            self.companyTop500Name("");
            self.companyRegisterAmount("");
            self.companyInvestAmount("");
            self.companyCountry("");
            self.companyIsHeaderQuarter("");
            self.selectedheadquartersType("");
            self.companyIs10Million("");
            self.companyCreateDate("");
            self.companyMemo("");
            self.email("");
            self.selectedCity("");
            self.selectedDistrict("");
            self.selectedZone("");
            self.selectedSubZone("");
            self.detailAddress("")
            self.zipCode("");
            self.selectedunionEstabishStatus("");
            self.companyVisitDate("");
            self.companyVisitContact("");
            self.companyVisitRecord ("");
            self.companyUnionCreateDate("");
            self.companyUnionCode("");
            self.companyUnionName("");
            self.companyContingentWorkerNum("");

            $("#btnEditCompanyBasicInfo").attr("disabled", "true");
            $("#btnSubmitCompanyBasicInfo").removeAttr("disabled");
            $("#btnCancelCompanyBasicInfo").removeAttr("disabled");
            $("#idFieldsetBaseinfo").removeAttr("disabled");
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
        };

        var timeTile = "T00:00:00";

        function prepareEnterpriseBaseInfoUpdate(isUpdate){
            var reqdata = ko.toJSON({
                "id": isUpdate ? self.enterpriseID() : null,
                "name" : self.companyName(),
                "orgCode" : self.companyOrgCode(),
                "type": {"code": self.selectedEnterpriseType()},
                "economicType": {"code": self.selectedEconomicType()},
                "legalRepresentative": self.companyRepresent(),
                "phoneNum": self.companyPhone(),
                "legalRepresentativePoliticalIdentity": {"code": self.selectedLegalRepresentativePoliticalIdentity()},
                "legalRepresentativePoliticalLevel": {"code": self.selectedLegalRepresentativePoliticalLevel()},
                "legalRepresentativeHonour1": {"code": self.selectedLegalRepresentativeHonour()},
                "status": {"code": self.selectedstatus()},
                "duplicatedName": self.companyDuplicate(),
                "employeeNum": self.companyEmployeeNum(),
                "contingentWorkerNum": self.companyMemberNum(),
                "isTop500": self.companyIsTop500(),
                "top500Name": self.companyTop500Name(),
                "registeredCapital": self.companyRegisterAmount(),
                "investmentAmount": self.companyInvestAmount(),
                "country": self.companyCountry(),
                "isHeadquarters": self.companyIsHeaderQuarter(),
                "headquartersType": {"code": self.selectedheadquartersType()},
                "isInvestmentOver100MillionUSD": self.companyIs10Million(),
                "establishedAt": self.companyCreateDate() + timeTile,
                "remark": self.companyMemo(),
                "email": self.email(),
                "city": {"code": self.selectedCity()},
                "district": {"code": self.selectedDistrict()},
                "zone": {"code": self.selectedZone()},
                "subZone": {"code": self.selectedSubZone()},
                "addressDetail": self.detailAddress(),
                "zipcode": self.zipCode()
            });
            return reqdata;
        };

        function prepareEnterpriseUnionUpdate(isUpdate){
            var reqdata = ko.toJSON({
                "id": isUpdate ? self.enterpriseID() : null,
                "interviewDate": self.companyVisitDate() + timeTile,
                "interviewOwner": self.companyVisitContact(),
                "interviewRemark":  self.companyVisitRecord(),
                "contingentWorkerNum":  self.companyContingentWorkerNum(),
                "establishedAt":  self.companyUnionCreateDate() + timeTile
            });
            return reqdata;
        };

        function updateEnterprise(reqdata){
            progress.start();
            if (self.loginErrors().length == 0) {
                var saveEnterpriseURL = $a.servicesUrl + "tu/inner/enterprises?authToken=" + $.cookie("token");
                var method = "";
                if (self.switchSaveAndModify() == 0) {
                    method = "POST";
                }
                else if (self.switchSaveAndModify() == 1) {
                    method = "PUT";
                }

                $.ajax({
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    type: method,
                    crossDomain: true,
                    url: saveEnterpriseURL,
                    data: reqdata,
                    success: function (result) {
                        self.enterpriseID(result);
                        var searchEnterpriseListURL = $a.servicesUrl + "tu/inner/enterprises/" + result + "?authToken=" + $.cookie("token");
                        $.ajax({
                            type: "get",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            crossDomain: true,
                            url: searchEnterpriseListURL,
                            success: function (json) {
                                //make union info visible for create success
                                $("#divUnionInfo").removeClass("am-hide");
                                $("#divLinkUnions").removeClass("am-hide");
                                loadEnterprise(json);
                                getLinkedUnions();
                                initButton();
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
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                    }
                })
                    .always(function () {
                        $("#companyCreateDate").datepicker();
                        $("#companyVisitDate").datepicker();
                        $("#companyUnionCreateDate").datepicker();
                        progress.done();
                    });
            }
            else {
                progress.done();
                self.loginErrors.showAllMessages();
            }
        };

        self.submitCompanyBasicInfo = function() {
            var reqdata;
            if(self.switchSaveAndModify() == 0) {
                reqdata = prepareEnterpriseBaseInfoUpdate(false);
            }
            else if(self.switchSaveAndModify() == 1){
                reqdata = prepareEnterpriseBaseInfoUpdate(true);
            }
            updateEnterprise(reqdata);
        };

        self.editCompanyBasicInfo = function() {
            $("#idFieldsetBaseinfo").removeAttr("disabled");
            $("#companyCreateDate").datepicker();

            $("#btnEditCompanyBasicInfo").attr("disabled", "true");
            $("#btnSubmitCompanyBasicInfo").removeAttr("disabled");
            $("#btnCancelCompanyBasicInfo").removeAttr("disabled");
        };

        self.cancelCompanyBasicInfo = function() {
            $("#idFieldsetBaseinfo").attr("disabled", "true");
            $("#btnEditCompanyBasicInfo").removeAttr("disabled");
            $("#btnSubmitCompanyBasicInfo").attr("disabled", "true");
            $("#btnCancelCompanyBasicInfo").attr("disabled", "true");
            var searchEnterpriseListURL = $a.servicesUrl + "tu/inner/enterprises/"+ self.enterpriseID() +"?authToken="+$.cookie("token");
            $.ajax({
                type: "get",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                url: searchEnterpriseListURL,
                success: function (json) {
                    loadEnterprise(json);
                    $("#companyCreateDate").datepicker();
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

        self.submitCompanyUnionInfo = function() {
            $("#idFieldsetUnionInfo").attr("disabled", "true");
            var reqdata;
            if(self.switchSaveAndModify() == 0) {
                reqdata = prepareEnterpriseUnionUpdate(false);
            }
            else if(self.switchSaveAndModify() == 1){
                reqdata = prepareEnterpriseUnionUpdate(true);
            }
            updateEnterprise(reqdata);
        };

        self.editCompanyUnionInfo = function() {
            $("#idFieldsetUnionInfo").removeAttr("disabled")

            $("#btnEditCompanyUnionInfo").attr("disabled", "true");
            $("#btnSubmitCompanyUnionInfo").removeAttr("disabled");
            $("#btnCancelCompanyUnionInfo").removeAttr("disabled");

            $("#companyVisitDate").datepicker();
            $("#companyUnionCreateDate").datepicker();
        };

        self.cancelCompanyUnionInfo = function() {
            $("#idFieldsetUnionInfo").attr("disabled", "true");
            $("#btnEditCompanyUnionInfo").removeAttr("disabled");
            $("#btnSubmitCompanyUnionInfo").attr("disabled", "true");
            $("#btnCancelCompanyUnionInfo").attr("disabled", "true");
            var searchEnterpriseListURL = $a.servicesUrl + "tu/inner/enterprises/"+ self.enterpriseID() +"?authToken="+$.cookie("token");
            $.ajax({
                type: "get",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                url: searchEnterpriseListURL,
                success: function (json) {
                    loadEnterprise(json);
                    $("#companyVisitDate").datepicker();
                    $("#companyUnionCreateDate").datepicker();
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

        self.searchUnionName = ko.observable();
        self.selectedUnion = ko.observable();
        self.unionList = ko.observableArray([]);
        self.linkedUnionList = ko.observableArray([]);

        self.searchUnionClick = function() {
            if(typeof self.searchUnionName() !== 'undefined' && self.searchUnionName() != ""){
                var searchUnionListURL = $a.servicesUrl + "tu/tradeUnions/searchByTradeUnionName?name=" + formatParameter(self.searchUnionName()) + "&authToken=" + $.cookie("token");
                $.ajax({
                    type: "get",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    crossDomain: true,
                    url: searchUnionListURL,
                    success: function (json) {
                        if (typeof json != 'undefined' && json.length > 0) {
                            $("#divLinkUnionSearchResult").removeClass("am-hide");
                            $("#submitLinkUnion").removeAttr("disabled");
                            self.unionList(json);
                        } else {
                            self.unionList("");
                            $("#divLinkUnionSearchResult").addClass("am-hide");
                            $("#submitLinkUnion").attr("disabled", "true");
                            var $modal = $('#union-search-null');
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
        };

        self.submitLinkUnion = function() {
            var linkToUnionURL = $a.servicesUrl + "tu/inner/enterprises/"+ self.enterpriseID() +"/tradeUnion/"+ self.selectedUnion() +"?authToken="+$.cookie("token");
            progress.start();
            $.ajax({
                headers: {
                    'Content-Type': 'application/json'
                },
                type: 'PUT',
                crossDomain: true,
                url: linkToUnionURL,
                success: function(result){
                    getLinkedUnions();
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                }
            })
                .always(function(){
                    progress.done();
                });
        };

        function getLinkedUnions(){
            var searchEnterpriseListURL = $a.servicesUrl + "tu/inner/enterprises/"+ self.enterpriseID() +"?authToken="+$.cookie("token");
            $.ajax({
                type: "get",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                url: searchEnterpriseListURL,
                success: function (json) {
                    if(typeof json !== 'undefined' && typeof json.tradeUnion !== 'undefined'){
                        var result = [];
                        result.push(json.tradeUnion);
                        self.linkedUnionList(result);
                    }
                    else{
                        self.linkedUnionList("");
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

        self.initSearch();
    };

    return viewModel;
});
