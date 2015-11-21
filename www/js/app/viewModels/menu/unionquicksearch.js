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
    var viewModel = function(id,options){
        var self = this;
        self.template = "menu/unionquicksearch-tpl";

        self.myPostProcessingLogic = function(elements) {
            $(".am-selected").selected();
            $(".wtu-datepicker").datepicker();
        };

        /**
         * public attribute
         */
        var progress = $.AMUI.progress;
        self.errorMsgs = ko.observableArray([]);
        self.searchUnionName = ko.observable();
        /**
         * search panel attribute
         */
        self.unionList = ko.observableArray([]);
        self.unionTypeList = ko.observableArray([]);

        /**
         * detail panel attribute
         */
        self.unionDetailTitle = ko.observable("");

        /**
         * union Detail
         */
        self.unionID = ko.observable();
        self.unionName = ko.observable().extend({required : { message: '\u5de5\u4f1a\u540d\u79f0\u4e0d\u80fd\u4e3a\u7a7a' }});
        self.selectedUnionType = ko.observable();
        self.unionAddress = ko.observable().extend({required : { message: '\u5de5\u4f1a\u5730\u5740\u4e0d\u80fd\u4e3a\u7a7a' }});
        self.unionOrgCode = ko.observable().extend({required : { message: '\u7ec4\u7ec7\u673a\u6784\u4ee3\u7801\u4e0d\u80fd\u4e3a\u7a7a' }});
        self.unionBankCard = ko.observable();
        self.unionBankUserName = ko.observable();
        self.unionBankName = ko.observable();
        self.unionBankCode = ko.observable();
        self.unionCompanyNumber = ko.observable();
        self.unionEmployeeNum = ko.observable();
        self.unionLinkedCompanyNum = ko.observable();
        self.unionMemberNum = ko.observable().extend({required : { message: '\u4f1a\u5458\u6570\u76ee\u4e0d\u80fd\u4e3a\u7a7a' }});
        self.zipCode = ko.observable();
        self.unionContact = ko.observable().extend({required : { message: '\u5de5\u4f1a\u8054\u7cfb\u4eba\u4e0d\u80fd\u4e3a\u7a7a' }});
        self.unionContactPhone = ko.observable().extend({required : { message: '\u5de5\u4f1a\u8054\u7cfb\u4eba\u624b\u673a\u4e0d\u80fd\u4e3a\u7a7a' }});

        //集体合同
        self.switchSaveAndModifyCollectiveContracts = ko.observable();
        self.collectiveContracts = ko.observableArray([]);
        self.unionSignDate = ko.observable();
        self.unionDueDate = ko.observable();
        self.unionMemoNum = ko.observable();
        self.unionContractType = ko.observable();
        self.unionAppendix = ko.observable();

        //工会委员会
        self.switchSaveAndModifyCommittees = ko.observable();
        self.committees = ko.observableArray([]);
        self.unionSession = ko.observable();
        self.unionSessionStart = ko.observable();
        self.unionSessionEnd = ko.observable();
        self.unionChairmanName = ko.observable();
        self.unionVPName = ko.observable();
        self.unionCommitteeName = ko.observable();

        //经费审查委员会
        self.switchSaveAndModifyFundingReviewCommittees = ko.observable();
        self.fundingReviewCommittees = ko.observableArray([]);
        self.unionAuditSession = ko.observable();
        self.unionAuditSessionStart = ko.observable();
        self.unionAuditSessionEnd = ko.observable();
        self.unionAuditChairmanName = ko.observable();
        self.unionAuditVPName = ko.observable();
        self.unionAuditCommitteeName = ko.observable();

        //女工委员会
        self.switchSaveAndModifyWomenWorkerCommittees = ko.observable();
        self.womenWorkerCommittees = ko.observableArray([]);
        self.unionFemaleSession = ko.observable();
        self.unionFemaleSessionStart = ko.observable();
        self.unionFemaleSessionEnd = ko.observable();
        self.unionFemaleChairmanName = ko.observable();
        self.unionFemaleVPName = ko.observable();
        self.unionFemaleCommitteeName = ko.observable();

        //劳动争议调解委员会
        self.switchSaveAndModifyLaborDisputeMediationCommittees = ko.observable();
        self.laborDisputeMediationCommittees = ko.observableArray([]);
        self.unionRegulateSession = ko.observable();
        self.unionRegulateSessionStart = ko.observable();
        self.unionRegulateSessionEnd = ko.observable();
        self.unionRegulateChairmanName = ko.observable();
        self.unionRegulateVPName = ko.observable();
        self.unionRegulateCommitteeName = ko.observable();

        //工会小组
        self.switchSaveAndModifyTradeUnionGroups = ko.observable();
        self.tradeUnionGroups = ko.observableArray([]);
        self.unionGroupName = ko.observable();
        self.unionGroupLeaderName = ko.observable();

        //社团
        self.switchCommunityGroups = ko.observable();
        self.communityGroups = ko.observableArray([]);
        self.unionCommunityName = ko.observable();
        self.unionCommunityLeaderName = ko.observable();

        // 0: save, 1: modify
        self.switchSaveAndModify = ko.observable();

        self.collectiveContractsCount = ko.observable();
        self.fundingReviewCommitteesCount =  ko.observable();
        self.laborDisputeMediationCommitteesCount = ko.observable();
        self.committeesCount = ko.observable();
        self.womenWorkerCommitteesCount = ko.observable();
        self.tradeUnionGroupsCount = ko.observable();
        self.communityGroupsCount = ko.observable();

        self.collectiveContractNumList = ko.observableArray([]);
        self.selectedCollectiveContractNum = ko.observable();

        self.fundingReviewCommitteesNumList = ko.observableArray([]);
        self.selectedFundingReviewCommitteesNum = ko.observable();

        self.laborDisputeMediationCommitteesNumList = ko.observableArray([]);
        self.selectedLaborDisputeMediationCommitteesNum = ko.observable();

        self.committeesNumList = ko.observableArray([]);
        self.selectedCommitteesNum = ko.observable();

        self.womenWorkerCommitteesNumList = ko.observableArray([]);
        self.selectedWomenWorkerCommitteesNum = ko.observable();

        self.tradeUnionGroupsNumList = ko.observableArray([]);
        self.selectedTradeUnionGroupsNum = ko.observable();

        self.addressCityList = ko.observableArray([]);
        self.addressDistrictList = ko.observableArray([]);
        self.addressZoneList = ko.observableArray([]);
        self.addressSubZoneList = ko.observableArray([]);
        self.selectedCity = ko.observable();
        self.selectedDistrict = ko.observable();
        self.selectedZone = ko.observable();
        self.selectedSubZone = ko.observable();

        self.loginErrors = ko.validation.group([ self.unionName, self.unionAddress], {
            deep : true,
            observable : false
        });

        var emptyTreeHtml;
        var timeTile = "T00:00:00";

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

        self.initSearch = function() {
            var newRow = {
                "name": "",
                "type": {"name": ""},
                "orgCode": "",
                "employeeCount": "",
                "memberCount": "",
                "childrenCount": "",
                "parent": {"name": ""},
                "isNewRow": true
            };

            self.unionList().push(newRow);
            $("#panelUnionDetail").addClass("am-hide");
        };

        self.getUnionTypeList = function() {
            var unionTypes = [
                {"id": "CITY_DIRECT_ENTERPRISE_TU", "name": "\u5e02\u76f4\u5c5e\u4f01\u4e1a\u5de5\u4f1a"},
                {"id": "CITY_INDUSTRY_TU", "name": "\u5e02\u5c5e\u884c\u4e1a\u603b\u5de5\u4f1a"},
                {"id": "CITY_TU", "name": "\u5e02\u603b\u5de5\u4f1a"},
                {"id": "DEVELOPMENT_ZONE_TU", "name": "\u5f00\u53d1\u533a\u603b\u5de5\u4f1a"},
                {"id": "DISTRICT_TU", "name": "\u884c\u653f\u533a\u603b\u5de5\u4f1a"},
                {"id": "ENTERPRISE_TU", "name": "\u4f01\u4e1a\u5de5\u4f1a"},
                {"id": "FEDERATION_TU", "name": "\u5de5\u4f1a\u8054\u5408\u4f1a"},
                {"id": "UNITED_ENTERPRISE_TU", "name": "\u8054\u5408\u4f01\u4e1a\u5de5\u4f1a"}
            ];
            self.unionTypeList(unionTypes);
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

        self.getParentUnionInfo = function(obj){
            if(typeof obj !== 'undefined' && typeof obj.parent !== 'undefined'){
                self.searchUnionName(obj.parent.name);
                self.searchClick();
            }
        };

        self.searchClick = function(unionID) {
            var newRow = {
                "name": "",
                "type": {"name": ""},
                "orgCode": "",
                "employeeCount": "",
                "memberCount": "",
                "childrenCount": "",
                "parent": {"name": ""},
                "isNewRow": true
            };

            if(typeof unionID !== 'undefined' && !isNaN(unionID)){
                var searchUnionListURL = $a.servicesUrl + "tu/tradeUnions/"+ unionID +"?showChildren=true&authToken="+$.cookie("token");
                $.ajax({
                    type: "get",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    crossDomain: true,
                    url: searchUnionListURL,
                    success: function (json) {
                        if (typeof json != 'undefined') {
                            var result = [];
                            if (typeof json.parent == 'undefined') {
                                _.extend(json, {parent: {name: ""}});
                            }
                            if (typeof json.childrenCount == 'undefined') {
                                _.extend(json, {childrenCount: 0});
                            }
                            _.extend(json, {isNewRow: false});

                            result.push(json);
                            result.push(newRow);
                            self.unionList(result);
                            self.searchUnionName(json.name);
                        } else {
                            self.unionList().push(newRow);
                            var $modal = $('#search-null');
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

                $("#panelUnionDetail").addClass("am-hide");
            }
            else{
                if(typeof self.searchUnionName() != 'undefined' && $.trim(self.searchUnionName()) != "") {
                    var searchUnionListURL = $a.servicesUrl + "tu/tradeUnions/searchByTradeUnionName?name=" + formatParameter(self.searchUnionName()) + "&authToken=" + $.cookie("token");
                    $.ajax({
                        type: "get",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        crossDomain: true,
                        url: searchUnionListURL,
                        success: function (json) {
                            if (typeof json != 'undefined' && json.length > 0) {
                                _.each(json, function (union) {
                                    if (typeof union != "undefined") {
                                        if (typeof union.parent == 'undefined') {
                                            _.extend(union, {parent: {name: ""}});
                                        }

                                        if (typeof union.childrenCount == 'undefined') {
                                            _.extend(union, {childrenCount: 0});
                                        }

                                        _.extend(union, {isNewRow: false});
                                    }
                                });

                                json.push(newRow);
                                self.unionList(json);
                            } else {
                                self.unionList().push(newRow);
                                var $modal = $('#search-null');
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

                    $("#panelUnionDetail").addClass("am-hide");
                }
            }

        };

        self.addNewUnion = function() {
            self.getUnionTypeList();
            self.getCityList();
            self.getDistrictList();
            self.getZoneList();
            self.getSubZoneList();
            self.switchSaveAndModify(0);
            datePickedChange();
            self.unionName("");
            self.selectedUnionType("");
            self.unionAddress("");
            self.unionOrgCode("");
            self.unionBankCard("");
            self.unionBankUserName("");
            self.unionBankName("");
            self.unionBankCode("");
            self.unionCompanyNumber("");
            self.unionEmployeeNum("");
            self.unionLinkedCompanyNum("");
            self.unionMemberNum("");
            self.selectedCity("");
            self.selectedDistrict("");
            self.selectedZone("");
            self.selectedSubZone("");
            self.zipCode("");
            self.unionContact("");
            self.unionContactPhone("");

            $("#collapseCollectiveContracts").addClass("am-hide");
            $("#collapseCommittees").addClass("am-hide");
            $("#collapseFundingReviewCommittees").addClass("am-hide");
            $("#collapseWomenWorkerCommittees").addClass("am-hide");
            $("#collapseLaborDisputeMediationCommittees").addClass("am-hide");
            $("#collapseTradeUnionGroups").addClass("am-hide");
            $("#collapseSocialGroups").addClass("am-hide");
            $("#collapseNextLevelUnions").addClass("am-hide");
            $("#divLinkEnterprise").addClass("am-hide");

            $("#do-not-say-4").collapse('open');
            $("#panelUnionDetail").removeClass("am-hide");

            $("#idFieldsetBaseinfo").removeAttr("disabled");

            $("#btnEditUnionBaseicInfo").attr("disabled", "true");
            $("#btnSubmitUnionBasicInfo").removeAttr("disabled");
            $("#btnCancelUnionBasicInfo").removeAttr("disabled");
        };

        self.modifyUnion = function(obj, event, data) {
            self.unionDetailTitle(obj.name + "\u8be6\u7ec6\u4fe1\u606f");
            self.unionID(obj.id);
            self.switchSaveAndModify(1);
            datePickedChange();
            swithBtnStatus();

            $("#panelUnionDetail").removeClass("am-hide");
            $("#do-not-say-4").collapse('open');

            $("#collapseCollectiveContracts").removeClass("am-hide");
            $("#collapseCommittees").removeClass("am-hide");
            $("#collapseFundingReviewCommittees").removeClass("am-hide");
            $("#collapseWomenWorkerCommittees").removeClass("am-hide");
            $("#collapseLaborDisputeMediationCommittees").removeClass("am-hide");
            $("#collapseTradeUnionGroups").removeClass("am-hide");
            $("#collapseSocialGroups").removeClass("am-hide");
            $("#collapseNextLevelUnions").removeClass("am-hide");

            var searchUnionListURL = $a.servicesUrl + "tu/tradeUnions/"+ obj.id +"?showChildren=true&authToken="+$.cookie("token");
            $.ajax({
                type: "get",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                url: searchUnionListURL,
                success: function (json) {
                    loadUnionBaseInfo(json);
                    loadCollectiveContracts(json);
                    loadFundingReviewCommittees(json);
                    loadLaborDisputeMediationCommittees(json);
                    loadCommittees(json);
                    loadWomenWorkerCommittees(json);
                    loadTradeUnionGroups(json);
                    loadNextLevelTree(json);
                    self.communityGroupsCount(0);
                    if(json.type.hierarchyNum == 600){
                        $("#divLinkEnterprise").removeClass("am-hide");
                        $("#divLinkEnterprises").removeClass("am-hide");
                        getLinkedEnterprises();
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

        function loadUnionBaseInfo(json) {
            self.getUnionTypeList();
            self.getCityList();
            self.getDistrictList();
            self.getZoneList();
            self.getSubZoneList();
            self.unionName(nvl(json.name));
            self.selectedUnionType(nvl(json.type) != "" ? nvl(json.type.code) : "");
            self.unionAddress(nvl(json.addressDetail));
            self.unionOrgCode(nvl(json.orgCode));
            self.unionBankCard(nvl(json.bankAccount));
            self.unionBankUserName(nvl(json.bankAccountOwnerName));
            self.unionBankName(nvl(json.depositeBankName));
            self.unionBankCode(nvl(json.depositeBankBranchCode));
            self.unionCompanyNumber();
            self.unionEmployeeNum(nvl(json.employeeCount));
            self.unionLinkedCompanyNum();
            self.unionMemberNum(nvl(json.memberCount));
            self.zipCode(json.zipcode);
            self.selectedCity(nvl(json.city) != "" ? nvl(json.city.code) : "");
            self.selectedDistrict(nvl(json.district) != "" ? nvl(json.district.code) : "");
            self.selectedZone(nvl(json.zone) != "" ? nvl(json.zone.code) : "");
            self.selectedSubZone(nvl(json.subZone) != "" ? nvl(json.subZone.code) : "");
        };

        function loadCollectiveContracts(json){
            self.collectiveContractsCount(json.collectiveContracts.length);
            //bind the collectiveContracts and set the default to first one
            if(typeof json.collectiveContracts != 'undefined' && json.collectiveContracts.length >0) {
                self.collectiveContracts(json.collectiveContracts);
                self.collectiveContractNumList(getNumberList(json.collectiveContracts));

                self.unionSignDate(nvl(dataStringFormator(json.collectiveContracts[0].signAt)));
                self.unionDueDate(nvl(dataStringFormator(json.collectiveContracts[0].expiredAt)));
                self.unionMemoNum(nvl(json.collectiveContracts[0].recordNumber));
                self.unionContractType(nvl(json.collectiveContracts[0].type));
                //TODO handle the appendix
                //self.unionAppendix(json.collectiveContracts[0].attachments);
            }
        };

        function loadFundingReviewCommittees(json){
            self.fundingReviewCommitteesCount(json.fundingReviewCommittees.length);
            //bind the fundingReviewCommittees and set the default to first one
            if(typeof json.fundingReviewCommittees != 'undefined' && json.fundingReviewCommittees.length >0) {
                self.fundingReviewCommittees(json.fundingReviewCommittees);
                self.fundingReviewCommitteesNumList(getNumberList(json.fundingReviewCommittees));

                self.unionAuditSession(nvl(json.fundingReviewCommittees[0].sequence));
                self.unionAuditSessionStart(nvl(dataStringFormator(json.fundingReviewCommittees[0].startAt)));
                self.unionAuditSessionEnd(nvl(dataStringFormator(json.fundingReviewCommittees[0].endAt)));
                self.unionAuditChairmanName(nvl(json.fundingReviewCommittees[0].chairmanName));
                self.unionAuditVPName(nvl(json.fundingReviewCommittees[0].viceChairmanName));
                self.unionAuditCommitteeName(nvl(json.fundingReviewCommittees[0].commissioner1Name));
            }
        };

        function loadLaborDisputeMediationCommittees(json){
            self.laborDisputeMediationCommitteesCount(json.laborDisputeMediationCommittees.length);
            //bind the laborDisputeMediationCommittees and set the default to first one
            if(typeof json.laborDisputeMediationCommittees != 'undefined' && json.laborDisputeMediationCommittees.length >0) {
                self.laborDisputeMediationCommittees(json.laborDisputeMediationCommittees);
                self.laborDisputeMediationCommitteesNumList(getNumberList(json.laborDisputeMediationCommittees));

                self.unionRegulateSession(nvl(json.laborDisputeMediationCommittees[0].sequence));
                self.unionRegulateSessionStart(nvl(dataStringFormator(json.laborDisputeMediationCommittees[0].startAt)));
                self.unionRegulateSessionEnd(nvl(dataStringFormator(json.laborDisputeMediationCommittees[0].endAt)));
                self.unionRegulateChairmanName(nvl(json.laborDisputeMediationCommittees[0].chairmanName));
                self.unionRegulateVPName(nvl(json.laborDisputeMediationCommittees[0].viceChairmanName));
                self.unionRegulateCommitteeName(nvl(json.laborDisputeMediationCommittees[0].commissioner1Name));
            }
        };

        function loadCommittees(json){
            self.committeesCount(json.committees.length);
            //bind the committees and set the default to first one
            if(typeof json.committees != 'undefined' && json.committees.length >0) {
                self.committees(json.committees);
                self.committeesNumList(getNumberList(json.committees));

                self.unionSession(nvl(json.committees[0].sequence));
                self.unionSessionStart(nvl(dataStringFormator(json.committees[0].startAt)));
                self.unionSessionEnd(nvl(dataStringFormator(json.committees[0].endAt)));
                self.unionChairmanName(nvl(json.committees[0].chairmanName));
                self.unionVPName(nvl(json.committees[0].viceChairmanName));
                self.unionCommitteeName(nvl(json.committees[0].commissioner1Name));
            }
        };

        function loadWomenWorkerCommittees(json){
            self.womenWorkerCommitteesCount(json.womenWorkerCommittees.length);
            //bind the womenWorkerCommittees and set the default to first one
            if(typeof json.womenWorkerCommittees != 'undefined' && json.womenWorkerCommittees.length >0) {
                self.womenWorkerCommittees(json.womenWorkerCommittees);
                self.womenWorkerCommitteesNumList(getNumberList(json.womenWorkerCommittees));

                self.unionFemaleSession(nvl(json.womenWorkerCommittees[0].sequence));
                self.unionFemaleSessionStart(nvl(dataStringFormator(json.womenWorkerCommittees[0].startAt)));
                self.unionFemaleSessionEnd(nvl(dataStringFormator(json.womenWorkerCommittees[0].endAt)));
                self.unionFemaleChairmanName(nvl(json.womenWorkerCommittees[0].chairmanName));
                self.unionFemaleVPName(nvl(json.womenWorkerCommittees[0].viceChairmanName));
                self.unionFemaleCommitteeName(nvl(json.womenWorkerCommittees[0].commissioner1Name));
            }
        };

        function loadTradeUnionGroups(json){
            self.tradeUnionGroupsCount(json.tradeUnionGroups.length);
            //bind the tradeUnionGroups and set the default to first one
            if(typeof json.tradeUnionGroups != 'undefined' && json.tradeUnionGroups.length >0) {
                self.tradeUnionGroups(json.tradeUnionGroups);
                self.tradeUnionGroupsNumList(getNumberList(json.tradeUnionGroups));

                self.unionGroupName(nvl(json.tradeUnionGroups[0].groupName));
                self.unionGroupLeaderName(nvl(json.tradeUnionGroups[0].groupLeaderName));
            }
        };

        function loadNextLevelTree(json){
            //setup the tree for next level union
            //reset the tree template
            var treeData = [];
            phaseUnionList2TreeNode(json.children, treeData);
            if(typeof emptyTreeHtml === 'undefined' || emptyTreeHtml == null){
                emptyTreeHtml = $('.am-tree').tree('destroy');
            }
            else {
                $('.am-tree').tree('destroy');
            }
            $("#collapse-panel-8").append(emptyTreeHtml);
            $('.am-tree').tree({
                dataSource: function (options, callback) {
                    // 模拟异步加载
                    setTimeout(function () {
                        callback({
                            data: options.products || treeData
                        });
                    }, 400);
                },
                multiSelect: false,
                cacheItems: true,
                folderSelect: true
            })
                .on('loaded.tree.amui', function (e) {
                    console.log('Loaded');
                }).on('selected.tree.amui', function (e, selected) {
                    console.log('Select Event: ', selected);
                }).on('updated.tree.amui', function (e, selected) {
                    console.log('Updated Event: ', selected);
                }).on('disclosedFolder.tree.amui', function (e, info) {
                    console.log('Open Event: ', info);
                    var getChildrenUnionListURL = $a.servicesUrl + "tu/tradeUnions/" + info.attr.id + "?showChildren=true&authToken=" + $.cookie("token");
                    //get the child element for the opened node, and append the result to node's products
                    $.ajax({
                        type: "get",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        crossDomain: true,
                        url: getChildrenUnionListURL,
                        success: function (json) {
                            info.products = [];
                            phaseUnionList2TreeNode(json.children, info.products);
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
                }).on('closed.tree.amui', function (e, info) {
                    console.log('Close Event: ', info);
                });
        };

        function phaseUnionList2TreeNode(unionList, treeNode) {
            _.each(unionList, function (union) {
                if (typeof union != "undefined") {
                    if (union.type.hierarchyNum == 600) {
                        var obj = {
                            "title": union.name, "type": "item", "attr": {
                                "id": union.id
                            }
                        };
                    }
                    else {
                        var obj = {
                            "title": union.name, "type": "folder", "products": "", "attr": {
                                "id": union.id
                            }
                        };
                    }
                    treeNode.push(obj);
                }
            });
        };

        //navigation for 集体合同
        self.setCollectiveContract = function() {
            if(typeof self.collectiveContracts() !== 'undefined' && self.collectiveContracts().length > 0 &&
                typeof self.selectedCollectiveContractNum() !== 'undefined' && self.selectedCollectiveContractNum() > 0) {
                self.unionSignDate(dataStringFormator(self.collectiveContracts()[self.selectedCollectiveContractNum() - 1].signAt));
                self.unionDueDate(dataStringFormator(self.collectiveContracts()[self.selectedCollectiveContractNum() - 1].expiredAt));
                self.unionMemoNum(self.collectiveContracts()[self.selectedCollectiveContractNum() - 1].recordNumber);
                self.unionContractType(self.collectiveContracts()[self.selectedCollectiveContractNum() - 1].type);
            }
        };

        self.prevCollectiveContract = function() {
            if(typeof self.collectiveContracts() !== 'undefined' && self.collectiveContracts().length > 0 &&
                typeof self.selectedCollectiveContractNum() !== 'undefined' && self.selectedCollectiveContractNum() > 1) {
                self.unionSignDate(dataStringFormator(self.collectiveContracts()[self.selectedCollectiveContractNum() - 2].signAt));
                self.unionDueDate(dataStringFormator(self.collectiveContracts()[self.selectedCollectiveContractNum() - 2].expiredAt));
                self.unionMemoNum(self.collectiveContracts()[self.selectedCollectiveContractNum() - 2].recordNumber);
                self.unionContractType(self.collectiveContracts()[self.selectedCollectiveContractNum() - 2].type);
                self.selectedCollectiveContractNum(self.selectedCollectiveContractNum() - 1);
            }
        };

        self.nextCollectiveContract = function() {
            if(typeof self.collectiveContracts() !== 'undefined' && self.collectiveContracts().length > 0 &&
                typeof self.selectedCollectiveContractNum() !== 'undefined' && self.selectedCollectiveContractNum() < self.collectiveContracts().length) {
                self.unionSignDate(dataStringFormator(self.collectiveContracts()[self.selectedCollectiveContractNum()].signAt));
                self.unionDueDate(dataStringFormator(self.collectiveContracts()[self.selectedCollectiveContractNum()].expiredAt));
                self.unionMemoNum(self.collectiveContracts()[self.selectedCollectiveContractNum()].recordNumber);
                self.unionContractType(self.collectiveContracts()[self.selectedCollectiveContractNum()].type);
                self.selectedCollectiveContractNum(self.selectedCollectiveContractNum() + 1);
            }
        };

        // navigation for 经费审查委员会
        self.setFundingReviewCommittees = function() {
            if(typeof self.fundingReviewCommittees() !== 'undefined' && self.fundingReviewCommittees().length > 0 &&
                typeof self.selectedFundingReviewCommitteesNum() !== 'undefined' && self.selectedFundingReviewCommitteesNum() > 0) {
                self.unionAuditSession(self.fundingReviewCommittees()[self.selectedFundingReviewCommitteesNum() - 1].sequence);
                self.unionAuditSessionStart(dataStringFormator(self.fundingReviewCommittees()[self.selectedFundingReviewCommitteesNum() - 1].startAt));
                self.unionAuditSessionEnd(dataStringFormator(self.fundingReviewCommittees()[self.selectedFundingReviewCommitteesNum() - 1].endAt));
                self.unionAuditChairmanName(self.fundingReviewCommittees()[self.selectedFundingReviewCommitteesNum() - 1].chairmanName);
                self.unionAuditVPName(self.fundingReviewCommittees()[self.selectedFundingReviewCommitteesNum() - 1].viceChairmanName);
                self.unionAuditCommitteeName(self.fundingReviewCommittees()[self.selectedFundingReviewCommitteesNum() - 1].commissioner1Name);
            }
        };

        self.prevFundingReviewCommittees = function() {
            if(typeof self.fundingReviewCommittees() !== 'undefined' && self.fundingReviewCommittees().length > 0 &&
                typeof self.selectedFundingReviewCommitteesNum() !== 'undefined' && self.selectedFundingReviewCommitteesNum() > 1) {
                self.unionAuditSession(self.fundingReviewCommittees()[self.selectedFundingReviewCommitteesNum() - 2].sequence);
                self.unionAuditSessionStart(dataStringFormator(self.fundingReviewCommittees()[self.selectedFundingReviewCommitteesNum() - 2].startAt));
                self.unionAuditSessionEnd(dataStringFormator(self.fundingReviewCommittees()[self.selectedFundingReviewCommitteesNum() - 2].endAt));
                self.unionAuditChairmanName(self.fundingReviewCommittees()[self.selectedFundingReviewCommitteesNum() - 2].chairmanName);
                self.unionAuditVPName(self.fundingReviewCommittees()[self.selectedFundingReviewCommitteesNum() - 2].viceChairmanName);
                self.unionAuditCommitteeName(self.fundingReviewCommittees()[self.selectedFundingReviewCommitteesNum() - 2].commissioner1Name);
                self.selectedFundingReviewCommitteesNum(self.selectedFundingReviewCommitteesNum() - 1);
            }
        };

        self.nextFundingReviewCommittees = function() {
            if(typeof self.fundingReviewCommittees() !== 'undefined' && self.fundingReviewCommittees().length > 0 &&
                typeof self.selectedFundingReviewCommitteesNum() !== 'undefined' && self.selectedFundingReviewCommitteesNum() < self.fundingReviewCommittees().length) {
                self.unionAuditSession(self.fundingReviewCommittees()[self.selectedFundingReviewCommitteesNum()].sequence);
                self.unionAuditSessionStart(dataStringFormator(self.fundingReviewCommittees()[self.selectedFundingReviewCommitteesNum()].startAt));
                self.unionAuditSessionEnd(dataStringFormator(self.fundingReviewCommittees()[self.selectedFundingReviewCommitteesNum()].endAt));
                self.unionAuditChairmanName(self.fundingReviewCommittees()[self.selectedFundingReviewCommitteesNum()].chairmanName);
                self.unionAuditVPName(self.fundingReviewCommittees()[self.selectedFundingReviewCommitteesNum()].viceChairmanName);
                self.unionAuditCommitteeName(self.fundingReviewCommittees()[self.selectedFundingReviewCommitteesNum()].commissioner1Name);
                self.selectedFundingReviewCommitteesNum(self.selectedFundingReviewCommitteesNum() + 1);
            }
        };

        // navigation for 劳动争议调解委员会
        self.setLaborDisputeMediationCommittees = function() {
            if(typeof self.laborDisputeMediationCommittees() !== 'undefined' && self.laborDisputeMediationCommittees().length > 0 &&
                typeof self.selectedLaborDisputeMediationCommitteesNum() !== 'undefined' && self.selectedLaborDisputeMediationCommitteesNum() > 0) {
                self.unionRegulateSession(self.laborDisputeMediationCommittees()[self.selectedLaborDisputeMediationCommitteesNum() - 1].sequence);
                self.unionRegulateSessionStart(dataStringFormator(self.laborDisputeMediationCommittees()[self.selectedLaborDisputeMediationCommitteesNum() - 1].startAt));
                self.unionRegulateSessionEnd(dataStringFormator(self.laborDisputeMediationCommittees()[self.selectedLaborDisputeMediationCommitteesNum() - 1].endAt));
                self.unionRegulateChairmanName(self.laborDisputeMediationCommittees()[self.selectedLaborDisputeMediationCommitteesNum() - 1].chairmanName);
                self.unionRegulateVPName(self.laborDisputeMediationCommittees()[self.selectedLaborDisputeMediationCommitteesNum() - 1].viceChairmanName);
                self.unionRegulateCommitteeName(self.laborDisputeMediationCommittees()[self.selectedLaborDisputeMediationCommitteesNum() - 1].commissioner1Name);
            }
        };

        self.prevLaborDisputeMediationCommittees = function() {
            if(typeof self.laborDisputeMediationCommittees() !== 'undefined' && self.laborDisputeMediationCommittees().length > 0 &&
                typeof self.selectedLaborDisputeMediationCommitteesNum() !== 'undefined' && self.selectedLaborDisputeMediationCommitteesNum() > 1) {
                self.unionRegulateSession(self.laborDisputeMediationCommittees()[self.selectedLaborDisputeMediationCommitteesNum() - 2].sequence);
                self.unionRegulateSessionStart(dataStringFormator(self.laborDisputeMediationCommittees()[self.selectedLaborDisputeMediationCommitteesNum() - 2].startAt));
                self.unionRegulateSessionEnd(dataStringFormator(self.laborDisputeMediationCommittees()[self.selectedLaborDisputeMediationCommitteesNum() - 2].endAt));
                self.unionRegulateChairmanName(self.laborDisputeMediationCommittees()[self.selectedLaborDisputeMediationCommitteesNum() - 2].chairmanName);
                self.unionRegulateVPName(self.laborDisputeMediationCommittees()[self.selectedLaborDisputeMediationCommitteesNum() - 2].viceChairmanName);
                self.unionRegulateCommitteeName(self.laborDisputeMediationCommittees()[self.selectedLaborDisputeMediationCommitteesNum() - 2].commissioner1Name);
                self.selectedLaborDisputeMediationCommitteesNum(self.selectedLaborDisputeMediationCommitteesNum() - 1);
            }
        };

        self.nextLaborDisputeMediationCommittees = function() {
            if(typeof self.laborDisputeMediationCommittees() !== 'undefined' && self.laborDisputeMediationCommittees().length > 0 &&
                typeof self.selectedLaborDisputeMediationCommitteesNum() !== 'undefined' && self.selectedLaborDisputeMediationCommitteesNum() < self.laborDisputeMediationCommittees().length) {
                self.unionRegulateSession(self.laborDisputeMediationCommittees()[self.selectedLaborDisputeMediationCommitteesNum()].sequence);
                self.unionRegulateSessionStart(dataStringFormator(self.laborDisputeMediationCommittees()[self.selectedLaborDisputeMediationCommitteesNum()].startAt));
                self.unionRegulateSessionEnd(dataStringFormator(self.laborDisputeMediationCommittees()[self.selectedLaborDisputeMediationCommitteesNum()].endAt));
                self.unionRegulateChairmanName(self.laborDisputeMediationCommittees()[self.selectedLaborDisputeMediationCommitteesNum()].chairmanName);
                self.unionRegulateVPName(self.laborDisputeMediationCommittees()[self.selectedLaborDisputeMediationCommitteesNum()].viceChairmanName);
                self.unionRegulateCommitteeName(self.laborDisputeMediationCommittees()[self.selectedLaborDisputeMediationCommitteesNum()].commissioner1Name);
                self.selectedLaborDisputeMediationCommitteesNum(self.selectedLaborDisputeMediationCommitteesNum() + 1);
            }
        };

        // navigation for 工会委员会
        self.setCommittees = function() {
            if(typeof self.committees() !== 'undefined' && self.committees().length > 0 &&
                typeof self.selectedCommitteesNum() !== 'undefined' && self.selectedCommitteesNum() > 0) {
                self.unionSession(self.committees()[self.selectedCommitteesNum() - 1].sequence);
                self.unionSessionStart(dataStringFormator(self.committees()[self.selectedCommitteesNum() - 1].startAt));
                self.unionSessionEnd(dataStringFormator(self.committees()[self.selectedCommitteesNum() - 1].endAt));
                self.unionChairmanName(self.committees()[self.selectedCommitteesNum() - 1].chairmanName);
                self.unionVPName(self.committees()[self.selectedCommitteesNum() - 1].viceChairmanName);
                self.unionCommitteeName(self.committees()[self.selectedCommitteesNum() - 1].commissioner1Name);
            }
        };

        self.prevCommittees = function() {
            if(typeof self.committees() !== 'undefined' && self.committees().length > 0 &&
                typeof self.selectedCommitteesNum() !== 'undefined' && self.selectedCommitteesNum() > 1) {
                self.unionSession(self.committees()[self.selectedCommitteesNum() - 2].sequence);
                self.unionSessionStart(dataStringFormator(self.committees()[self.selectedCommitteesNum() - 2].startAt));
                self.unionSessionEnd(dataStringFormator(self.committees()[self.selectedCommitteesNum() - 2].endAt));
                self.unionChairmanName(self.committees()[self.selectedCommitteesNum() - 2].chairmanName);
                self.unionVPName(self.committees()[self.selectedCommitteesNum() - 2].viceChairmanName);
                self.unionCommitteeName(self.committees()[self.selectedCommitteesNum() - 2].commissioner1Name);
                self.selectedCommitteesNum(self.selectedCommitteesNum() - 1);
            }
        };

        self.nextCommittees = function() {
            if(typeof self.committees() !== 'undefined' && self.committees().length > 0 &&
                typeof self.selectedCommitteesNum() !== 'undefined' && self.selectedCommitteesNum() < self.committees().length) {
                self.unionSession(self.committees()[self.selectedCommitteesNum()].sequence);
                self.unionSessionStart(dataStringFormator(self.committees()[self.selectedCommitteesNum()].startAt));
                self.unionSessionEnd(dataStringFormator(self.committees()[self.selectedCommitteesNum()].endAt));
                self.unionChairmanName(self.committees()[self.selectedCommitteesNum()].chairmanName);
                self.unionVPName(self.committees()[self.selectedCommitteesNum()].viceChairmanName);
                self.unionCommitteeName(self.committees()[self.selectedCommitteesNum()].commissioner1Name);
                self.selectedCommitteesNum(self.selectedCommitteesNum() + 1);
            }
        };


        // navigation for 女工委员会
        self.setWomenWorkerCommittees = function() {
            if(typeof self.womenWorkerCommittees() !== 'undefined' && self.womenWorkerCommittees().length > 0 &&
                typeof self.selectedWomenWorkerCommitteesNum() !== 'undefined' && self.selectedWomenWorkerCommitteesNum() > 0) {
                self.unionFemaleSession(self.womenWorkerCommittees()[self.selectedWomenWorkerCommitteesNum() - 1].sequence);
                self.unionFemaleSessionStart(dataStringFormator(self.womenWorkerCommittees()[self.selectedWomenWorkerCommitteesNum() - 1].startAt));
                self.unionFemaleSessionEnd(dataStringFormator(self.womenWorkerCommittees()[self.selectedWomenWorkerCommitteesNum() - 1].endAt));
                self.unionFemaleChairmanName(self.womenWorkerCommittees()[self.selectedWomenWorkerCommitteesNum() - 1].chairmanName);
                self.unionFemaleVPName(self.womenWorkerCommittees()[self.selectedWomenWorkerCommitteesNum() - 1].viceChairmanName);
                self.unionFemaleCommitteeName(self.womenWorkerCommittees()[self.selectedWomenWorkerCommitteesNum() - 1].commissioner1Name);
            }
        };

        self.prevWomenWorkerCommittees = function() {
            if(typeof self.womenWorkerCommittees() !== 'undefined' && self.womenWorkerCommittees().length > 0 &&
                typeof self.selectedWomenWorkerCommitteesNum() !== 'undefined' && self.selectedWomenWorkerCommitteesNum() > 1) {
                self.unionFemaleSession(self.womenWorkerCommittees()[self.selectedWomenWorkerCommitteesNum() - 2].sequence);
                self.unionFemaleSessionStart(dataStringFormator(self.womenWorkerCommittees()[self.selectedWomenWorkerCommitteesNum() - 2].startAt));
                self.unionFemaleSessionEnd(dataStringFormator(self.womenWorkerCommittees()[self.selectedWomenWorkerCommitteesNum() - 2].endAt));
                self.unionFemaleChairmanName(self.womenWorkerCommittees()[self.selectedWomenWorkerCommitteesNum() - 2].chairmanName);
                self.unionFemaleVPName(self.womenWorkerCommittees()[self.selectedWomenWorkerCommitteesNum() - 2].viceChairmanName);
                self.unionFemaleCommitteeName(self.womenWorkerCommittees()[self.selectedWomenWorkerCommitteesNum() - 2].commissioner1Name);
                self.selectedWomenWorkerCommitteesNum(self.selectedWomenWorkerCommitteesNum() - 1);
            }
        };

        self.nextWomenWorkerCommittees = function() {
            if(typeof self.womenWorkerCommittees() !== 'undefined' && self.womenWorkerCommittees().length > 0 &&
                typeof self.selectedWomenWorkerCommitteesNum() !== 'undefined' && self.selectedWomenWorkerCommitteesNum() < self.womenWorkerCommittees().length) {
                self.unionFemaleSession(self.womenWorkerCommittees()[self.selectedWomenWorkerCommitteesNum()].sequence);
                self.unionFemaleSessionStart(dataStringFormator(self.womenWorkerCommittees()[self.selectedWomenWorkerCommitteesNum()].startAt));
                self.unionFemaleSessionEnd(dataStringFormator(self.womenWorkerCommittees()[self.selectedWomenWorkerCommitteesNum()].endAt));
                self.unionFemaleChairmanName(self.womenWorkerCommittees()[self.selectedWomenWorkerCommitteesNum()].chairmanName);
                self.unionFemaleVPName(self.womenWorkerCommittees()[self.selectedWomenWorkerCommitteesNum()].viceChairmanName);
                self.unionFemaleCommitteeName(self.womenWorkerCommittees()[self.selectedWomenWorkerCommitteesNum()].commissioner1Name);
                self.selectedWomenWorkerCommitteesNum(self.selectedWomenWorkerCommitteesNum() + 1);
            }
        };

        // navigation for 工会小组
        self.setTradeUnionGroups = function() {
            if(typeof self.tradeUnionGroups() !== 'undefined' && self.tradeUnionGroups().length > 0 &&
                typeof self.selectedTradeUnionGroupsNum() !== 'undefined' && self.selectedTradeUnionGroupsNum() > 0) {
                self.unionGroupName(self.tradeUnionGroups()[self.selectedTradeUnionGroupsNum() - 1].groupName);
                self.unionGroupLeaderName(self.tradeUnionGroups()[self.selectedTradeUnionGroupsNum() - 1].groupLeaderName);
            }
        };

        self.prevTradeUnionGroups = function() {
            if(typeof self.tradeUnionGroups() !== 'undefined' && self.tradeUnionGroups().length > 0 &&
                typeof self.selectedTradeUnionGroupsNum() !== 'undefined' && self.selectedTradeUnionGroupsNum() > 1) {
                self.unionGroupName(self.tradeUnionGroups()[self.selectedTradeUnionGroupsNum() - 2].groupName);
                self.unionGroupLeaderName(self.tradeUnionGroups()[self.selectedTradeUnionGroupsNum() - 2].groupLeaderName);
                self.selectedTradeUnionGroupsNum(self.selectedTradeUnionGroupsNum() - 1);
            }
        };

        self.nextTradeUnionGroups = function() {
            if(typeof self.tradeUnionGroups() !== 'undefined' && self.tradeUnionGroups().length > 0 &&
                typeof self.selectedTradeUnionGroupsNum() !== 'undefined' && self.selectedTradeUnionGroupsNum() < self.tradeUnionGroups().length) {
                self.unionGroupName(self.tradeUnionGroups()[self.selectedTradeUnionGroupsNum()].groupName);
                self.unionGroupLeaderName(self.tradeUnionGroups()[self.selectedTradeUnionGroupsNum()].groupLeaderName);
                self.selectedTradeUnionGroupsNum(self.selectedTradeUnionGroupsNum() + 1);
            }
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

        function getNumberList(list){
            var numList = [];
            if(typeof list != 'undefined' && list.length > 0){
                var i = 1;
                _.each(list, function (union) {
                    if (typeof union != "undefined") {
                        var item = {"id": i, "name": i + " / " + list.length};
                        numList.push(item);
                        i++;
                    }
                });
            }

            return numList;
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

        function swithBtnStatus(){
            $('#do-not-say-4').find('.wtu-switch-btn-group').each(function (index) {
                var btnAdd = $(this).find('.am-btn').eq(0);
                var btnUpdate = $(this).find('.am-btn').eq(1);
                var btnSubmit = $(this).find('.am-btn').eq(2);
                var btnCancel = $(this).find('.am-btn').eq(3);
                btnAdd.click(function(){
                    btnUpdate.attr("disabled", "true");
                    btnSubmit.removeAttr("disabled");
                    btnCancel.removeAttr("disabled");
                });

                btnUpdate.click(function(){
                    btnAdd.attr("disabled", "true");
                    btnSubmit.removeAttr("disabled");
                    btnCancel.removeAttr("disabled");
                });

                btnSubmit.click(function(){
                    btnAdd.removeAttr("disabled");
                    btnUpdate.removeAttr("disabled");
                    btnSubmit.attr("disabled", "true");
                    btnCancel.attr("disabled", "true");
                });

                btnCancel.click(function(){
                    btnAdd.removeAttr("disabled");
                    btnUpdate.removeAttr("disabled");
                    btnSubmit.attr("disabled", "true");
                    btnCancel.attr("disabled", "true");
                });
            });
        };

        function datePickedChange(){
            $('#do-not-say-4').find('.wtu-datepicker').each(function(index) {
                $(this).datepicker().
                    on('changeDate.datepicker.amui', function(event) {
                        var newDate = new Date(event.date)
                        newDate.setDate(newDate.getDate() + 1);
                        if(this.id == "unionSignDate"){
                            self.unionSignDate(dataStringFormator(newDate.toJSON()));
                        }
                        else if(this.id == "unionDueDate"){
                            self.unionDueDate(dataStringFormator(newDate.toJSON()));
                        }
                        else if(this.id == "unionAuditSessionStart"){
                            self.unionAuditSessionStart(dataStringFormator(newDate.toJSON()));
                        }
                        else if(this.id == "unionAuditSessionEnd"){
                            self.unionAuditSessionEnd(dataStringFormator(newDate.toJSON()));
                        }
                        else if(this.id == "unionRegulateSessionStart"){
                            self.unionRegulateSessionStart(dataStringFormator(newDate.toJSON()));
                        }
                        else if(this.id == "unionRegulateSessionEnd"){
                            self.unionRegulateSessionEnd(dataStringFormator(newDate.toJSON()));
                        }
                        else if(this.id == "unionSessionStart"){
                            self.unionSessionStart(dataStringFormator(newDate.toJSON()));
                        }
                        else if(this.id == "unionSessionEnd"){
                            self.unionSessionEnd(dataStringFormator(newDate.toJSON()));
                        }
                        else if(this.id == "unionFemaleSessionStart"){
                            self.unionFemaleSessionStart(dataStringFormator(newDate.toJSON()));
                        }
                        else if(this.id == "unionFemaleSessionEnd"){
                            self.unionFemaleSessionEnd(dataStringFormator(newDate.toJSON()));
                        }
                    });
            });
        };
//------------------------------------------------------------------------------------------------------
        self.submitUnionBasicInfo = function() {
            if (self.loginErrors().length == 0) {
                var saveUnionURL = $a.servicesUrl + "tu/tradeUnions?authToken=" + $.cookie("token");
                var method = "";
                if (self.switchSaveAndModify() == 0) {
                    method = "POST";
                }
                else if (self.switchSaveAndModify() == 1) {
                    method = "PUT";
                }

                var reqdata = ko.toJSON({
                    "id": self.unionID(),
                    "name": self.unionName(),
                    "type": {"code": self.selectedUnionType()},
                    "addressDetail": self.unionAddress(),
                    "bankAccount": self.unionBankCard(),
                    "bankAccountOwnerName": self.unionBankUserName(),
                    "depositeBankName": self.unionBankName(),
                    "depositeBankBranchCode": self.unionBankCode(),
                    "employeeCount" : self.unionEmployeeNum(),
                    "city": {"code": self.selectedCity()},
                    "district": {"code": self.selectedDistrict()},
                    "zone": {"code": self.selectedZone()},
                    "subZone": {"code": self.selectedSubZone()},
                    "zipcode": self.zipCode(),
                    "contacts": [
                        {"name":self.unionContact(), "phone":self.unionContactPhone()}
                    ]
                });

                if(self.switchSaveAndModify()==0){
                    $('#create-confirm').modal({
                        relatedTarget: this,
                        onConfirm: function(options) {
                            updateUnionBaseinfo(method, saveUnionURL, reqdata);
                        },
                        onCancel: function() {
                        }
                    });
                }
                else{
                    updateUnionBaseinfo(method, saveUnionURL, reqdata);
                }
            }
            else{
                self.loginErrors.showAllMessages();
            }
        };

        function updateUnionBaseinfo(method,saveUnionURL,reqdata) {
            progress.start();
            $.ajax({
                headers: {
                    'Content-Type': 'application/json'
                },
                type: method,
                crossDomain: true,
                url: saveUnionURL,
                data: reqdata,
                success: function (result) {
                    self.unionID(result);
                    getLinkedEnterprises();
                    $("#divLinkEnterprise").removeClass("am-hide");
                    $("#idFieldsetBaseinfo").attr("disabled", "true");
                    $("#btnEditUnionBaseicInfo").removeAttr("disabled");
                    $("#btnSubmitUnionBasicInfo").attr("disabled", "true");
                    $("#btnCancelUnionBasicInfo").attr("disabled", "true");
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                }
            })
                .always(function () {
                    progress.done();
                    $("#hreflinkcompany").removeClass("am-disabled");
                });
        };

        self.editUnionBasicInfo = function() {
            $("#idFieldsetBaseinfo").removeAttr("disabled")
            $("#unionContact").attr("disabled", "true");
            $("#unionContactPhone").attr("disabled", "true");

            $("#btnEditUnionBaseicInfo").attr("disabled", "true");
            $("#btnSubmitUnionBasicInfo").removeAttr("disabled");
            $("#btnCancelUnionBasicInfo").removeAttr("disabled");
        };

        self.cancelUnionBasicInfo = function() {
            $("#btnEditUnionBaseicInfo").removeAttr("disabled");
            $("#btnSubmitUnionBasicInfo").attr("disabled", "true");
            $("#btnCancelUnionBasicInfo").attr("disabled", "true");

            var searchUnionListURL = $a.servicesUrl + "tu/tradeUnions/"+ self.unionID() +"?authToken="+$.cookie("token");
            $.ajax({
                type: "get",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                url: searchUnionListURL,
                success: function (json) {
                    loadUnionBaseInfo(json);
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

            $("#idFieldsetBaseinfo").attr("disabled", "true");
        };
//------------------------------------------------------------------------------------------------------
        self.submitUnionContractInfo = function() {
            $("#idFieldsetCollectiveContract").attr("disabled", "true");
            progress.start();
            var saveCollectiveContractsURL = $a.servicesUrl + "tu/tradeUnions/"+ self.unionID() +"/collectiveContracts?authToken="+$.cookie("token");
            var method = "";
            var reqdata = "";
            if(self.switchSaveAndModifyCollectiveContracts() == 0) {
                method = "POST";
                reqdata = ko.toJSON({
                    "signAt": self.unionSignDate() + timeTile,
                    "expiredAt" : self.unionDueDate()+ timeTile,
                    "recordNumber" : self.unionMemoNum(),
                    "type": self.unionContractType()
                });
            }
            else if(self.switchSaveAndModifyCollectiveContracts() == 1){
                if(typeof self.collectiveContracts() !== 'undefined' && self.collectiveContracts().length > 0
                && typeof self.selectedCollectiveContractNum() !== 'undefined' && self.selectedCollectiveContractNum() > 0){
                    method = "PUT";
                    reqdata = ko.toJSON({
                        "id" : self.collectiveContracts()[self.selectedCollectiveContractNum() - 1].id,
                        "signAt": self.unionSignDate() + timeTile,
                        "expiredAt" : self.unionDueDate()+ timeTile,
                        "recordNumber" : self.unionMemoNum(),
                        "type": self.unionContractType()
                    });
                }
                else {
                    progress.done();
                    return;
                }
            }

            $.ajax({
                headers: {
                    'Content-Type': 'application/json'
                },
                type: method,
                crossDomain: true,
                url: saveCollectiveContractsURL,
                data: reqdata,
                success: function(result){
                    var searchUnionListURL = $a.servicesUrl + "tu/tradeUnions/"+ self.unionID() +"?authToken="+$.cookie("token");
                    $.ajax({
                        type: "get",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        crossDomain: true,
                        url: searchUnionListURL,
                        success: function (json) {
                            loadCollectiveContracts(json);
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
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                }
            })
                .always(function(){
                    progress.done();
                });
        };

        self.cancelUnionContractInfo = function() {
            $("#idFieldsetCollectiveContract").attr("disabled", "true");
            //rollback changes for current contract
            self.setCollectiveContract();
        };

        self.editUnionContractInfo = function() {
            self.switchSaveAndModifyCollectiveContracts(1);
            $("#idFieldsetCollectiveContract").removeAttr("disabled");
        };

        self.addUnionContractInfo = function(){
            $("#idFieldsetCollectiveContract").removeAttr("disabled");
            self.switchSaveAndModifyCollectiveContracts(0);
            self.unionSignDate("");
            self.unionDueDate("");
            self.unionMemoNum("");
            self.unionContractType("");
        };

        self.deleteUnionContractInfo = function() {
            if(typeof self.collectiveContracts() !== 'undefined' && self.collectiveContracts().length > 0
                && typeof self.selectedCollectiveContractNum() !== 'undefined' && self.selectedCollectiveContractNum() > 0){

                var deleteCollectiveContractsURL = $a.servicesUrl + "tu/tradeUnions/"+ self.unionID() +"/collectiveContracts/"+ self.collectiveContracts()[self.selectedCollectiveContractNum() - 1].id +"?authToken="+$.cookie("token");
                progress.start();
                $.ajax({
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    type: 'DELETE',
                    crossDomain: true,
                    url: deleteCollectiveContractsURL,
                    success: function(result){
                        var searchUnionListURL = $a.servicesUrl + "tu/tradeUnions/"+ self.unionID() +"?authToken="+$.cookie("token");
                        $.ajax({
                            type: "get",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            crossDomain: true,
                            url: searchUnionListURL,
                            success: function (json) {
                                loadCollectiveContracts(json);
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
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                    }
                })
                    .always(function(){
                        progress.done();
                    });
            }
        };
//------------------------------------------------------------------------------------------------------
        self.submitUnionCommitteeInfo = function() {
            $("#idFieldsetCommittees").attr("disabled", "true");
            progress.start();
            var saveCommitteesURL = $a.servicesUrl + "tu/tradeUnions/"+ self.unionID() +"/committees?authToken="+$.cookie("token");
            var method = "";
            var reqdata = "";
            if(self.switchSaveAndModifyCommittees() == 0) {
                method = "POST";
                reqdata = ko.toJSON({
                    "sequence": self.unionSession(),
                    "startAt" : self.unionSessionStart()+ timeTile,
                    "endAt" : self.unionSessionEnd()+ timeTile,
                    "chairmanName" : self.unionChairmanName(),
                    "viceChairmanName": self.unionVPName(),
                    "commissioner1Name": self.unionCommitteeName()
                });
            }
            else if(self.switchSaveAndModifyCommittees() == 1) {
                if (typeof self.committees() !== 'undefined' && self.committees().length > 0
                    && typeof self.selectedCommitteesNum() !== 'undefined' && self.selectedCommitteesNum() > 0) {
                    method = "PUT";
                    reqdata = ko.toJSON({
                        "id": self.committees()[self.selectedCommitteesNum() - 1].id,
                        "sequence": self.unionSession(),
                        "startAt": self.unionSessionStart() + timeTile,
                        "endAt": self.unionSessionEnd() + timeTile,
                        "chairmanName": self.unionChairmanName(),
                        "viceChairmanName": self.unionVPName(),
                        "commissioner1Name": self.unionCommitteeName()
                    });
                }
                else {
                    progress.done();
                    return
                }
            }

            $.ajax({
                headers: {
                    'Content-Type': 'application/json'
                },
                type: method,
                crossDomain: true,
                url: saveCommitteesURL,
                data: reqdata,
                success: function(result){
                    var searchUnionListURL = $a.servicesUrl + "tu/tradeUnions/"+ self.unionID() +"?authToken="+$.cookie("token");
                    $.ajax({
                        type: "get",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        crossDomain: true,
                        url: searchUnionListURL,
                        success: function (json) {
                            loadCommittees(json);
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
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                }
            })
                .always(function(){
                    progress.done();
                });
        };

        self.editUnionCommitteeInfo = function() {
            $("#idFieldsetCommittees").removeAttr("disabled");
            self.switchSaveAndModifyCommittees(1);
        };

        self.cancelUnionCommitteeInfo = function() {
            $("#idFieldsetCommittees").attr("disabled", "true");
            //rollback changes for current Committee
            self.setCommittees();
        };

        self.addUnionCommitteeInfo = function() {
            $("#idFieldsetCommittees").removeAttr("disabled");
            self.switchSaveAndModifyCommittees(0);
            self.unionSession("");
            self.unionSessionStart("");
            self.unionSessionEnd("");
            self.unionChairmanName("");
            self.unionVPName("");
            self.unionCommitteeName("");
        };

        self.deleteUnionCommitteeInfo = function() {
            if (typeof self.committees() !== 'undefined' && self.committees().length > 0
                && typeof self.selectedCommitteesNum() !== 'undefined' && self.selectedCommitteesNum() > 0) {

                var deleteCommitteesURL = $a.servicesUrl + "tu/tradeUnions/"+ self.unionID() +"/committees/"+ self.committees()[self.selectedCommitteesNum() - 1].id +"?authToken="+$.cookie("token");
                progress.start();
                $.ajax({
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    type: 'DELETE',
                    crossDomain: true,
                    url: deleteCommitteesURL,
                    success: function(result){
                        var searchUnionListURL = $a.servicesUrl + "tu/tradeUnions/"+ self.unionID() +"?authToken="+$.cookie("token");
                        $.ajax({
                            type: "get",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            crossDomain: true,
                            url: searchUnionListURL,
                            success: function (json) {
                                loadCommittees(json);
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
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                    }
                })
                    .always(function(){
                        progress.done();
                    });
            }
        };
//------------------------------------------------------------------------------------------------------
        self.submitUnionAuditInfo = function() {
            $("#idFieldsetFundingReviewCommittees").attr("disabled", "true");
            progress.start();
            var saveFundingReviewCommitteesURL = $a.servicesUrl + "tu/tradeUnions/"+ self.unionID() +"/fundingReviewCommittees?authToken="+$.cookie("token");
            var method = "";
            var reqdata = "";
            if(self.switchSaveAndModifyFundingReviewCommittees() == 0) {
                method = "POST";
                reqdata = ko.toJSON({
                    "sequence": self.unionAuditSession(),
                    "startAt" : self.unionAuditSessionStart()+ timeTile,
                    "endAt" : self.unionAuditSessionEnd()+ timeTile,
                    "chairmanName" : self.unionAuditChairmanName(),
                    "viceChairmanName": self.unionAuditVPName(),
                    "commissioner1Name": self.unionAuditCommitteeName()
                });
            }
            else if(self.switchSaveAndModifyFundingReviewCommittees() == 1) {
                if (typeof self.fundingReviewCommittees() !== 'undefined' && self.fundingReviewCommittees().length > 0
                    && typeof self.selectedFundingReviewCommitteesNum() !== 'undefined' && self.selectedFundingReviewCommitteesNum() > 0) {
                    method = "PUT";
                    reqdata = ko.toJSON({
                        "id": self.fundingReviewCommittees()[self.selectedFundingReviewCommitteesNum() - 1].id,
                        "sequence": self.unionAuditSession(),
                        "startAt": self.unionAuditSessionStart() + timeTile,
                        "endAt": self.unionAuditSessionEnd() + timeTile,
                        "chairmanName": self.unionAuditChairmanName(),
                        "viceChairmanName": self.unionAuditVPName(),
                        "commissioner1Name": self.unionAuditCommitteeName()
                    });
                }
                else {
                    progress.done();
                    return;
                }
            }

            $.ajax({
                headers: {
                    'Content-Type': 'application/json'
                },
                type: method,
                crossDomain: true,
                url: saveFundingReviewCommitteesURL,
                data: reqdata,
                success: function(result){
                    var searchUnionListURL = $a.servicesUrl + "tu/tradeUnions/"+ self.unionID() +"?authToken="+$.cookie("token");
                    $.ajax({
                        type: "get",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        crossDomain: true,
                        url: searchUnionListURL,
                        success: function (json) {
                            loadFundingReviewCommittees(json);
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
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                }
            })
                .always(function(){
                    progress.done();
                });
        };

        self.editUnionAuditInfo = function() {
            $("#idFieldsetFundingReviewCommittees").removeAttr("disabled");
            self.switchSaveAndModifyFundingReviewCommittees(1);
        };

        self.cancelUnionAuditInfo = function() {
            $("#idFieldsetFundingReviewCommittees").attr("disabled", "true");
            //rollback changes for current FundingReviewCommittees
            self.setFundingReviewCommittees();
        };

        self.addUnionAuditInfo = function(){
            $("#idFieldsetFundingReviewCommittees").removeAttr("disabled");
            self.switchSaveAndModifyFundingReviewCommittees(0);
            self.unionAuditSession("");
            self.unionAuditSessionStart("");
            self.unionAuditSessionEnd("");
            self.unionAuditChairmanName("");
            self.unionAuditVPName("");
            self.unionAuditCommitteeName("");
        };

        self.deleteUnionAuditInfo = function() {
            if (typeof self.fundingReviewCommittees() !== 'undefined' && self.fundingReviewCommittees().length > 0
                && typeof self.selectedFundingReviewCommitteesNum() !== 'undefined' && self.selectedFundingReviewCommitteesNum() > 0) {

                var deleteFundingReviewCommitteesURL = $a.servicesUrl + "tu/tradeUnions/"+ self.unionID() +"/fundingReviewCommittees/"+ self.fundingReviewCommittees()[self.selectedFundingReviewCommitteesNum() - 1].id +"?authToken="+$.cookie("token");
                progress.start();
                $.ajax({
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    type: 'DELETE',
                    crossDomain: true,
                    url: deleteFundingReviewCommitteesURL,
                    success: function(result){
                        var searchUnionListURL = $a.servicesUrl + "tu/tradeUnions/"+ self.unionID() +"?authToken="+$.cookie("token");
                        $.ajax({
                            type: "get",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            crossDomain: true,
                            url: searchUnionListURL,
                            success: function (json) {
                                loadFundingReviewCommittees(json);
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
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                    }
                })
                    .always(function(){
                        progress.done();
                    });
            }
        };
//------------------------------------------------------------------------------------------------------
        self.submitUnionFemaleInfo = function() {
            $("#idFieldsetWomenWorkerCommittees").attr("disabled", "true");
            progress.start();
            var saveWomenWorkerCommitteesURL = $a.servicesUrl + "tu/tradeUnions/"+ self.unionID() +"/womenWorkerCommittees?authToken="+$.cookie("token");
            var method = "";
            var reqdata = "";
            if(self.switchSaveAndModifyWomenWorkerCommittees() == 0) {
                method = "POST";
                reqdata = ko.toJSON({
                    "sequence": self.unionFemaleSession(),
                    "startAt" : self.unionFemaleSessionStart()+ timeTile,
                    "endAt" : self.unionFemaleSessionEnd()+ timeTile,
                    "chairmanName" : self.unionFemaleChairmanName(),
                    "viceChairmanName": self.unionFemaleVPName(),
                    "commissioner1Name": self.unionFemaleCommitteeName()
                });
            }
            else if(self.switchSaveAndModifyWomenWorkerCommittees() == 1) {
                if (typeof self.womenWorkerCommittees() !== 'undefined' && self.womenWorkerCommittees().length > 0
                    && typeof self.selectedWomenWorkerCommitteesNum() !== 'undefined' && self.selectedWomenWorkerCommitteesNum() > 0) {
                    method = "PUT";
                    reqdata = ko.toJSON({
                        "id": self.womenWorkerCommittees()[self.selectedWomenWorkerCommitteesNum() - 1].id,
                        "sequence": self.unionFemaleSession(),
                        "startAt": self.unionFemaleSessionStart() + timeTile,
                        "endAt": self.unionFemaleSessionEnd() + timeTile,
                        "chairmanName": self.unionFemaleChairmanName(),
                        "viceChairmanName": self.unionFemaleVPName(),
                        "commissioner1Name": self.unionFemaleCommitteeName()
                    });
                }
                else {
                    progress.done();
                    return
                }
            }

            $.ajax({
                headers: {
                    'Content-Type': 'application/json'
                },
                type: method,
                crossDomain: true,
                url: saveWomenWorkerCommitteesURL,
                data: reqdata,
                success: function(result){
                    var searchUnionListURL = $a.servicesUrl + "tu/tradeUnions/"+ self.unionID() +"?authToken="+$.cookie("token");
                    $.ajax({
                        type: "get",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        crossDomain: true,
                        url: searchUnionListURL,
                        success: function (json) {
                            loadWomenWorkerCommittees(json);
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
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                }
            })
                .always(function(){
                    progress.done();
                });
        };

        self.editUnionFemaleInfo = function() {
            $("#idFieldsetWomenWorkerCommittees").removeAttr("disabled");
            self.switchSaveAndModifyWomenWorkerCommittees(1);
        };

        self.cancelUnionFemaleInfo = function() {
            $("#idFieldsetWomenWorkerCommittees").attr("disabled", "true");
            //rollback changes for current WomenWorkerCommittees
            self.setWomenWorkerCommittees();
        };

        self.addUnionFemaleInfo = function() {
            $("#idFieldsetWomenWorkerCommittees").removeAttr("disabled");
            self.switchSaveAndModifyWomenWorkerCommittees(0);
            self.unionFemaleSession("");
            self.unionFemaleSessionStart("");
            self.unionFemaleSessionEnd("");
            self.unionFemaleChairmanName("");
            self.unionFemaleVPName("");
            self.unionFemaleCommitteeName("");
        };

        self.deleteUnionFemaleInfo = function() {
            if (typeof self.womenWorkerCommittees() !== 'undefined' && self.womenWorkerCommittees().length > 0
                && typeof self.selectedWomenWorkerCommitteesNum() !== 'undefined' && self.selectedWomenWorkerCommitteesNum() > 0) {

                var deleteWomenWorkerCommitteesURL = $a.servicesUrl + "tu/tradeUnions/"+ self.unionID() +"/womenWorkerCommittees/"+ self.womenWorkerCommittees()[self.selectedWomenWorkerCommitteesNum() - 1].id +"?authToken="+$.cookie("token");
                progress.start();
                $.ajax({
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    type: 'DELETE',
                    crossDomain: true,
                    url: deleteWomenWorkerCommitteesURL,
                    success: function(result){
                        var searchUnionListURL = $a.servicesUrl + "tu/tradeUnions/"+ self.unionID() +"?authToken="+$.cookie("token");
                        $.ajax({
                            type: "get",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            crossDomain: true,
                            url: searchUnionListURL,
                            success: function (json) {
                                loadWomenWorkerCommittees(json);
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
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                    }
                })
                    .always(function(){
                        progress.done();
                    });
            }
        };

//------------------------------------------------------------------------------------------------------
        self.submitUnionRegulateInfo = function() {
            $("#idFieldsetLaborDisputeMediationCommittees").attr("disabled", "true");
            progress.start();
            var saveLaborDisputeMediationCommitteesURL = $a.servicesUrl + "tu/tradeUnions/"+ self.unionID() +"/laborDisputeMediationCommittees?authToken="+$.cookie("token");
            var method = "";
            var reqdata = "";
            if(self.switchSaveAndModifyLaborDisputeMediationCommittees() == 0) {
                method = "POST";
                reqdata = ko.toJSON({
                    "sequence": self.unionRegulateSession(),
                    "startAt" : self.unionRegulateSessionStart()+ timeTile,
                    "endAt" : self.unionRegulateSessionEnd()+ timeTile,
                    "chairmanName" : self.unionRegulateChairmanName(),
                    "viceChairmanName": self.unionRegulateVPName(),
                    "commissioner1Name": self.unionRegulateCommitteeName()
                });
            }
            else if(self.switchSaveAndModifyLaborDisputeMediationCommittees() == 1) {
                if (typeof self.laborDisputeMediationCommittees() !== 'undefined' && self.laborDisputeMediationCommittees().length > 0
                    && typeof self.selectedLaborDisputeMediationCommitteesNum() !== 'undefined' && self.selectedLaborDisputeMediationCommitteesNum() > 0) {
                    method = "PUT";
                    reqdata = ko.toJSON({
                        "id": self.laborDisputeMediationCommittees()[self.selectedLaborDisputeMediationCommitteesNum() - 1].id,
                        "sequence": self.unionRegulateSession(),
                        "startAt": self.unionRegulateSessionStart() + timeTile,
                        "endAt": self.unionRegulateSessionEnd() + timeTile,
                        "chairmanName": self.unionRegulateChairmanName(),
                        "viceChairmanName": self.unionRegulateVPName(),
                        "commissioner1Name": self.unionRegulateCommitteeName()
                    });
                }
                else{
                    progress.done();
                    return
                }
            }

            $.ajax({
                headers: {
                    'Content-Type': 'application/json'
                },
                type: method,
                crossDomain: true,
                url: saveLaborDisputeMediationCommitteesURL,
                data: reqdata,
                success: function(result){
                    var searchUnionListURL = $a.servicesUrl + "tu/tradeUnions/"+ self.unionID() +"?authToken="+$.cookie("token");
                    $.ajax({
                        type: "get",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        crossDomain: true,
                        url: searchUnionListURL,
                        success: function (json) {
                            loadLaborDisputeMediationCommittees(json);
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
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                }
            })
                .always(function(){
                    progress.done();
                });
        };

        self.editUnionRegulateInfo = function() {
            $("#idFieldsetLaborDisputeMediationCommittees").removeAttr("disabled");
            self.switchSaveAndModifyLaborDisputeMediationCommittees(1);
        };

        self.cancelUnionRegulateInfo = function() {
            $("#idFieldsetLaborDisputeMediationCommittees").attr("disabled", "true");
            //rollback changes fo laborDisputeMediationCommittees
            self.setLaborDisputeMediationCommittees();
        };

        self.addUnionRegulateInfo = function() {
            $("#idFieldsetLaborDisputeMediationCommittees").removeAttr("disabled");
            self.switchSaveAndModifyLaborDisputeMediationCommittees(0);
            self.unionRegulateSession("");
            self.unionRegulateSessionStart("");
            self.unionRegulateSessionEnd("");
            self.unionRegulateChairmanName("");
            self.unionRegulateVPName("");
            self.unionRegulateCommitteeName("");
        };

        self.deleteUnionRegulateInfo = function() {
            if (typeof self.laborDisputeMediationCommittees() !== 'undefined' && self.laborDisputeMediationCommittees().length > 0
                && typeof self.selectedLaborDisputeMediationCommitteesNum() !== 'undefined' && self.selectedLaborDisputeMediationCommitteesNum() > 0) {

                var deleteLaborDisputeMediationCommitteesURL = $a.servicesUrl + "tu/tradeUnions/"+ self.unionID() +"/laborDisputeMediationCommittees/"+ self.laborDisputeMediationCommittees()[self.selectedLaborDisputeMediationCommitteesNum() - 1].id +"?authToken="+$.cookie("token");
                progress.start();
                $.ajax({
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    type: 'DELETE',
                    crossDomain: true,
                    url: deleteLaborDisputeMediationCommitteesURL,
                    success: function(result){
                        var searchUnionListURL = $a.servicesUrl + "tu/tradeUnions/"+ self.unionID() +"?authToken="+$.cookie("token");
                        $.ajax({
                            type: "get",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            crossDomain: true,
                            url: searchUnionListURL,
                            success: function (json) {
                                loadLaborDisputeMediationCommittees(json);
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
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                    }
                })
                    .always(function(){
                        progress.done();
                    });
            }
        };

//------------------------------------------------------------------------------------------------------
        self.submitUnionGroupInfo = function() {
            $("#idFieldsetTradeUnionGroups").attr("disabled", "true");
            progress.start();
            var saveTradeUnionGroupsURL = $a.servicesUrl + "tu/tradeUnions/"+ self.unionID() +"/tradeUnionGroups?authToken="+$.cookie("token");
            var method = "";
            var reqdata = "";
            if(self.switchSaveAndModifyTradeUnionGroups() == 0) {
                method = "POST";
                reqdata = ko.toJSON({
                    "groupName": self.unionGroupName(),
                    "groupLeaderName": self.unionGroupLeaderName()
                });
            }
            else if(self.switchSaveAndModifyTradeUnionGroups() == 1) {
                if (typeof self.tradeUnionGroups() !== 'undefined' && self.tradeUnionGroups().length > 0
                    && typeof self.selectedTradeUnionGroupsNum() !== 'undefined' && self.selectedTradeUnionGroupsNum() > 0) {
                    method = "PUT";
                    reqdata = ko.toJSON({
                        "id": self.tradeUnionGroups()[self.selectedTradeUnionGroupsNum() - 1].id,
                        "groupName": self.unionGroupName(),
                        "groupLeaderName": self.unionGroupLeaderName()
                    });
                }
                else {
                    progress.done();
                    return
                }
            }

            $.ajax({
                headers: {
                    'Content-Type': 'application/json'
                },
                type: method,
                crossDomain: true,
                url: saveTradeUnionGroupsURL,
                data: reqdata,
                success: function(result){
                    var searchUnionListURL = $a.servicesUrl + "tu/tradeUnions/"+ self.unionID() +"?authToken="+$.cookie("token");
                    $.ajax({
                        type: "get",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        crossDomain: true,
                        url: searchUnionListURL,
                        success: function (json) {
                            loadTradeUnionGroups(json);
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
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                }
            })
                .always(function(){
                    progress.done();
                });
        };

        self.editUnionGroupInfo = function() {
            $("#idFieldsetTradeUnionGroups").removeAttr("disabled");
            self.switchSaveAndModifyTradeUnionGroups(1);
        };

        self.cancelUnionGroupInfo = function() {
            $("#idFieldsetTradeUnionGroups").attr("disabled", "true");
            //rollback changes for tradeUnionGroups
            self.setTradeUnionGroups();
        };

        self.addUnionGroupInfo = function() {
            $("#idFieldsetTradeUnionGroups").removeAttr("disabled");
            self.switchSaveAndModifyTradeUnionGroups(0);
            self.unionGroupName("");
            self.unionGroupLeaderName("");
        };

        self.deleteUnionGroupInfo = function() {
            if (typeof self.tradeUnionGroups() !== 'undefined' && self.tradeUnionGroups().length > 0
                && typeof self.selectedTradeUnionGroupsNum() !== 'undefined' && self.selectedTradeUnionGroupsNum() > 0) {

                var deleteTradeUnionGroupsURL = $a.servicesUrl + "tu/tradeUnions/"+ self.unionID() +"/groups/"+ self.tradeUnionGroups()[self.selectedTradeUnionGroupsNum() - 1].id +"?authToken="+$.cookie("token");
                progress.start();
                $.ajax({
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    type: 'DELETE',
                    crossDomain: true,
                    url: deleteTradeUnionGroupsURL,
                    success: function(result){
                        var searchUnionListURL = $a.servicesUrl + "tu/tradeUnions/"+ self.unionID() +"?authToken="+$.cookie("token");
                        $.ajax({
                            type: "get",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            crossDomain: true,
                            url: searchUnionListURL,
                            success: function (json) {
                                loadTradeUnionGroups(json);
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
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                    }
                })
                    .always(function(){
                        progress.done();
                    });
            }
        };
//------------------------------------------------------------------------------------------------------
        self.submitUnionCommunityInfo = function() {
            $("#idFieldsetUnionCommunity").attr("disabled", "true");
        };

        self.editUnionCommunityInfo = function() {
            $("#idFieldsetUnionCommunity").removeAttr("disabled");
            self.switchCommunityGroups(1);
        };

        self.cancelUnionCommunityInfo = function() {
            $("#idFieldsetUnionCommunity").attr("disabled", "true");
        };

        self.addUnionCommunityInfo = function() {
            $("#idFieldsetUnionCommunity").removeAttr("disabled");
            self.switchCommunityGroups(0);
        };
//------------------------------------------------------------------------------------------------------


//-------------------link Enterprise-----------------------------------------------------------------------------------
        self.searchEnterpriseName = ko.observable();
        self.selectedEnterprise = ko.observable();
        self.enterpriseList = ko.observableArray([]);
        self.linkedEnterpriseList = ko.observableArray([]);

        self.searchEnterpriseClick = function() {
            if(typeof self.searchEnterpriseName() !== 'undefined' && self.searchEnterpriseName() != ""){
                var searchEnterpriseListURL = $a.servicesUrl + "tu/inner/enterprises/search?tuStatus=NOT_ESTABLISHED&name=" + formatParameter(self.searchEnterpriseName()) + "&authToken=" + $.cookie("token");
                $.ajax({
                    type: "get",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    crossDomain: true,
                    url: searchEnterpriseListURL,
                    success: function (json) {
                        if (typeof json != 'undefined' && json.length > 0) {
                            $("#divLinkEnterpriseSearchResult").removeClass("am-hide");
                            $("#submitLinkEnterprise").removeAttr("disabled");
                            self.enterpriseList(json);
                        } else {
                            self.enterpriseList("");
                            $("#divLinkEnterpriseSearchResult").addClass("am-hide");
                            $("#submitLinkEnterprise").attr("disabled", "true");
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
            }
        };

        self.submitLinkEnterprise = function() {
            var linkToEnterpriseURL = $a.servicesUrl + "tu/inner/enterprises/"+ self.selectedEnterprise() +"/tradeUnion/"+ self.unionID() +"?authToken="+$.cookie("token");
            progress.start();
            $.ajax({
                headers: {
                    'Content-Type': 'application/json'
                },
                type: 'PUT',
                crossDomain: true,
                url: linkToEnterpriseURL,
                success: function(result){
                    getLinkedEnterprises();
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                }
            })
                .always(function(){
                    progress.done();
                });
        };

        function getLinkedEnterprises(){
            var searchUnionListURL = $a.servicesUrl + "tu/tradeUnions/"+ self.unionID() +"?authToken="+$.cookie("token");
            $.ajax({
                type: "get",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                url: searchUnionListURL,
                success: function (json) {
                    if(typeof json !== 'undefined'){
                        self.linkedEnterpriseList(json.enterprises);
                    }
                    else{
                        self.linkedEnterpriseList("");
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

        self.getMineUnion = function(){
            if(typeof options !== 'undefined' && typeof options.unionId !== 'undefined'){
                self.searchClick(options.unionId);
            }
            else{
                var searchUnionListURL = $a.servicesUrl + "tu/tradeUnions/mine?authToken="+$.cookie("token");
                $.ajax({
                    type: "get",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    crossDomain: true,
                    url: searchUnionListURL,
                    success: function (json) {
                        if(typeof json !== 'undefined'){
                            self.searchUnionName(json.name);

                            self.searchClick();
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

        self.initSearch();
        self.getMineUnion();
    };

    return viewModel;
});
