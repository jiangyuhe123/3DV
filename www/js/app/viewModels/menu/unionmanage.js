/**
 * Created by michael on 2015/7/20.
 */
/**
 * Created by michael on 2015/6/10.
 */

'use strict';


define([
    'underscore',
    'ko',
    'am.tree',
    'select2'
], function(
    _,
    ko,
    tree
){
    var viewModel = function(){
        var self = this;
        self.template = "menu/unionmanage-tpl";

        self.myPostProcessingLogic = function(elements) {
            $(".am-tabs").tabs();
            $(".am-selected").selected();
            $(".wtu-uckeck").uCheck();

            $(".js-basic-single").select2({
                placeholder: "\u8bf7\u9009\u62e9",
                allowClear: true,
                width: "style",
                theme: "classic"
            });

            $(".js-base-role-single").select2({
                placeholder: "\u8bf7\u9009\u62e9",
                allowClear: true,
                width: "style",
                theme: "classic"
            });
        };

        /**
         * public attribute
         */
        var progress = $.AMUI.progress;
        self.errorMsgs = ko.observableArray([]);
        self.searchUnionName = ko.observable();
        self.roleId = ko.observable();
        self.roleNmae = ko.observable();
        self.selectedRole = ko.observable();
        self.selectedUnionRole = ko.observable();
        self.viewPermission = ko.observable(false);
        self.modifyPermission = ko.observable(false);
        self.deletePermission = ko.observable(false);
        self.selectedUser = ko.observable();
        self.baseRoles = ko.observableArray([]);
        self.namedRoleList = ko.observableArray([]);
        self.unionRoleList = ko.observableArray([]);
        self.userRoleList = ko.observableArray([]);
        self.userList = ko.observableArray([]);
        self.selectedUnionId = ko.observable();
        self.txtRoleSaveBtn = ko.observable();

        self.selectedTransferUser = ko.observable();
        //self.transferUserList = ko.observableArray([]);
        self.selectedDestUnion = ko.observable();
        self.destUnionList = ko.observableArray([]);
        self.isDuplicated = ko.observable(false);
        // 0: save, 1: modify
        self.switchSaveAndModify = ko.observable();
        /**
         * union Detail
         */
        self.unionName = ko.observable();
        self.unionType = ko.observable();
        self.unionAddress = ko.observable();
        self.unionOrgCode = ko.observable();
        self.unionBankCard = ko.observable();
        self.unionBankUserName = ko.observable();
        self.unionBankName = ko.observable();
        self.unionBankCode = ko.observable();
        self.unionCompanyNumber = ko.observable();
        self.unionEmployeeNum = ko.observable();
        self.unionLinkedCompanyNum = ko.observable();
        self.unionMemberNum = ko.observable();

        var emptyTreeHtml;

        function formatParameter(param){
            return encodeURIComponent($.trim(param));
        };

        self.searchUnionClick = function() {
            var searchUnionListURL = $a.servicesUrl + "tu/tradeUnions/searchByTradeUnionName?name=" + formatParameter(self.searchUnionName()) + "&authToken="+$.cookie("token");
            $.ajax({
                type: "get",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                url: searchUnionListURL,
                success: function (json) {
                    var data = [];
                    if(typeof json != 'undefined' && json.length > 0) {
                        phaseUnionList2TreeNode(json, data);

                        if (typeof data != 'undefined' && data.length > 0) {
                            //show tree when click search button, but hide the detail
                            $('#panelUnionContent').removeClass("am-hide");
                            $('#panelUnionDetail').addClass("am-hide");

                            //reset the tree template
                            if(typeof emptyTreeHtml === 'undefined' || emptyTreeHtml == null){
                                emptyTreeHtml = $('.am-tree').tree('destroy');
                            }
                            else {
                                $('.am-tree').tree('destroy');
                            }
                            $("#idTree").append(emptyTreeHtml);

                            $('.am-tree').tree({
                                dataSource: function (options, callback) {
                                    // ƒ£ƒ‚“Ï≤Ωº”‘ÿ
                                    setTimeout(function () {
                                        callback({
                                            data: options.products || data
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
                                    $('#panelUnionDetail').removeClass("am-hide");
                                    //navigate to first tab when select the node
                                    $(".am-tabs").tabs('open', 0);

                                    self.selectedUnionId(selected.target.attr.id);
                                    getUnionBaseInfo(selected.target.attr.id);
                                    $(".js-transfer-basic-single").val("").trigger("change");
                                    initTransferUserSelector();
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
                                            if(typeof json !== 'undefined' && typeof json.children !== 'undefined'){
                                                phaseUnionList2TreeNode(json.children, info.products);
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

                                }).on('closed.tree.amui', function (e, info) {
                                    console.log('Close Event: ', info);
                                });
                        }
                    }
                    else {
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

        function getUnionBaseInfo(unionId){
            var getSelectedUnionDetailURL = $a.servicesUrl + "tu/tradeUnions/" + unionId + "?authToken=" + $.cookie("token");
            $.ajax({
                type: "get",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                url: getSelectedUnionDetailURL,
                success: function (tu) {
                    if(typeof tu !== 'undefined') {
                        self.unionName(tu.name);
                        self.unionType(tu.type.name);
                        self.unionAddress(tu.addressDetail);
                        self.unionOrgCode(tu.orgCode);
                        self.unionBankCard(tu.bankAccount);
                        self.unionBankUserName(tu.bankAccountOwnerName);
                        self.unionBankName(tu.depositeBankName);
                        self.unionBankCode(tu.depositeBankBranchCode);
                        self.unionCompanyNumber(tu.managedEnterprises.length);
                        self.unionEmployeeNum();
                        self.unionLinkedCompanyNum(tu.enterprises.length);
                        self.unionMemberNum();

                        $("#btnEditUnionBasicInfo").removeAttr("disabled");
                        $("#btnSubmitUnionBasicInfo").attr("disabled", "true");
                        $("#btnCancelUnionBasicInfo").attr("disabled", "true");
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

        self.submitUnionBasicInfo = function() {
            makeInputDisable("tab1");
            var $modal = $('#union-base-update');
            var updateTradeUnionBaseInfoURL = $a.servicesUrl + "tu/tradeUnions?authToken=" + $.cookie("token");

            var reqdata = ko.toJSON({
                "id" : self.selectedUnionId(),
                "name" : self.unionName(),
                "addressDetail" : self.unionAddress(),
                "orgCode" : self.unionOrgCode(),
                "bankAccount" : self.unionBankCard(),
                "bankAccountOwnerName" : self.unionBankUserName(),
                "depositeBankName" : self.unionBankName(),
                "depositeBankBranchCode" : self.unionBankCode()
            });

            $.ajax({
                headers: {
                    'Content-Type': 'application/json'
                },
                type:"PUT",
                crossDomain: true,
                url:updateTradeUnionBaseInfoURL,
                data: reqdata,
                success: function(result){
                    progress.done();
                    $modal.modal();

                    $("#btnEditUnionBasicInfo").removeAttr("disabled");
                    $("#btnSubmitUnionBasicInfo").attr("disabled", "true");
                    $("#btnCancelUnionBasicInfo").attr("disabled", "true");
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    progress.done();
                }
            })
                .always(function(){
                });
        };

        self.editUnionBasicInfo = function() {
            makeInputEnable("tab1");
            $("#btnEditUnionBasicInfo").attr("disabled", "true");
            $("#btnSubmitUnionBasicInfo").removeAttr("disabled");
            $("#btnCancelUnionBasicInfo").removeAttr("disabled");
        };

        self.cancelUnionBasicInfo = function() {
            makeInputDisable("tab1");
            getUnionBaseInfo(self.selectedUnionId());
            $("#btnEditUnionBasicInfo").removeAttr("disabled");
            $("#btnSubmitUnionBasicInfo").attr("disabled", "true");
            $("#btnCancelUnionBasicInfo").attr("disabled", "true");
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

        self.getNamedRoleList = function () {
            $("#panelCreateRole").addClass("am-hide");
            var getSelectedUnionDetailURL = $a.servicesUrl + "tu/tradeUnions/" + self.selectedUnionId() + "?authToken="+$.cookie("token");
            $.ajax({
                type: "get",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                url: getSelectedUnionDetailURL,
                success: function (json) {
                    if(typeof json !== 'undefined') {
                        _.each(json.associatedRoles, function (role) {
                            if (typeof role != "undefined") {
                                _.extend(role, {isNewRow: false});
                            }
                        });

                        var newRow = {"name": "", "category": "", "parent": {"name": ""}, "code": "", "isNewRow": true};
                        json.associatedRoles.push(newRow);
                        self.namedRoleList(json.associatedRoles);
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

        self.getBaseRoles = function () {
            var getBaseRoleURL = $a.servicesUrl + "common/roles/base?authToken="+$.cookie("token");
            $.ajax({
                type: "get",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                url: getBaseRoleURL,
                success: function (json) {
                    if(typeof json !== 'undefined') {
                        self.baseRoles(json);
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

        self.addNewRole = function() {
            $("#panelCreateRole").removeClass("am-hide");
            self.getBaseRoles();
            self.txtRoleSaveBtn('\u521b\u5efa\u89d2\u8272');
            self.switchSaveAndModify(0);
            self.roleNmae("");
            self.selectedRole("");
            self.viewPermission(true);
            self.modifyPermission(true);
            self.deletePermission(true);
        };

        self.saveRole = function() {
            progress.start();
            var $modal = $('#create-success');
            var $modal2 = $('#create-fail');

            var saveRoleURL = $a.servicesUrl + "tu/tradeUnions/"+ self.selectedUnionId() +"/roles?readable="+ self.viewPermission()
                +"&updatable=" + self.modifyPermission() + "&deletable="+ self.deletePermission() +"&authToken="+$.cookie("token");

            if(self.switchSaveAndModify() == 0) {
                var reqdata = ko.toJSON({
                    "name" : self.roleNmae(),
                    "parent":{"id": self.selectedRole()}
                });

                $.ajax({
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    type: "POST",
                    crossDomain: true,
                    url: saveRoleURL,
                    data: reqdata,
                    success: function(result){
                        progress.done();
                        $modal.modal();
                        self.getNamedRoleList();
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        progress.done();
                        $modal2.modal();
                    }
                })
                    .always(function(){
                        $("#panelCreateRole").addClass("am-hide");
                    });
            }
            else if(self.switchSaveAndModify() == 1) {
                var reqdata = ko.toJSON({
                    "id": self.roleId(),
                    "name" : self.roleNmae(),
                    "parent":{"id": self.selectedRole()}
                });

                $.ajax({
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    type: "PUT",
                    crossDomain: true,
                    url: saveRoleURL,
                    data: reqdata,
                    success: function(result){
                        progress.done();
                        $modal.modal();
                        self.getNamedRoleList();
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        progress.done();
                        $modal2.modal();
                    }
                })
                    .always(function(){
                        $("#panelCreateRole").addClass("am-hide");
                    });
            }
        };

        self.modifyRole = function(obj, event, data){
            $("#panelCreateRole").removeClass("am-hide");

            //we cannot direct call self.getBaseRoles() here, since bind the selected value should happened after the list bind data,
            // so manually call self.selectedRole after self.baseRoles
            var getBaseRoleURL = $a.servicesUrl + "common/roles/base?authToken="+$.cookie("token");
            $.ajax({
                type: "get",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                url: getBaseRoleURL,
                success: function (json) {
                    if(typeof json !== 'undefined') {
                        self.baseRoles(json);
                        self.selectedRole(obj.parent.id);

                        $(".js-base-role-single").val(obj.parent.id).trigger("change");
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

            self.txtRoleSaveBtn('\u4fee\u6539\u89d2\u8272');
            self.switchSaveAndModify(1);
            self.roleId(obj.id);
            self.roleNmae(obj.name);

            self.viewPermission(obj.resourceAccessControls[0].readable);
            self.modifyPermission(obj.resourceAccessControls[0].updatable);
            self.deletePermission(obj.resourceAccessControls[0].deletable);
        };

        self.deleteRole = function(obj, event, data) {
            var role = this;
            progress.start();
            var deleteRoleURL = $a.servicesUrl + "tu/tradeUnions/"+ self.selectedUnionId() +"/roles/" + obj.id + "?authToken="+$.cookie("token");
            $.ajax({
                headers: {
                    'Content-Type': 'application/json'
                },
                type:"DELETE",
                crossDomain: true,
                url:deleteRoleURL,
                success: function(result){
                    progress.done();
                    self.namedRoleList.remove(role);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    progress.done();
                }
            })
                .always(function(){
                    $("#panelCreateRole").addClass("am-hide");
                });
        };

        self.getUnionUserRoleList = function () {
            var getSelectedUnionDetailURL = $a.servicesUrl + "tu/tradeUnions/" + self.selectedUnionId() + "?authToken="+$.cookie("token");
            $.ajax({
                type: "get",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                url: getSelectedUnionDetailURL,
                success: function (json) {
                    if(typeof json !== 'undefined') {
                        self.unionRoleList(json.associatedRoles);
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

            var getTradeUnionUserURL = $a.servicesUrl + "tu/users/validation/tradeUnions/"+ self.selectedUnionId() +"?authToken="+$.cookie("token");
            $.ajax({
                type: "get",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                url: getTradeUnionUserURL,
                success: function (json) {
                    if(typeof json !== 'undefined') {
                        self.userList(json);
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

        function getUserRoleList() {
            var getUserRoleListURL = $a.servicesUrl + "tu/tradeUnions/"+ self.selectedUnionId() +"/roles/"+ self.selectedUnionRole() +"?showUsers=true&authToken="+$.cookie("token");
            $.ajax({
                type: "get",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                url: getUserRoleListURL,
                success: function (json) {
                    if(typeof json !== 'undefined') {
                        _.each(json.users, function (user) {
                            if (typeof user != "undefined") {
                                _.extend(user, {roleName: json.name, roleId: json.id});
                            }
                        });
                        self.userRoleList(json.users);
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

        self.setSelectedUnionRole = function () {
            $("#tblUserRole").removeClass("am-hide");
            if(self.selectedUnionRole() != undefined) {
                getUserRoleList();
            }
        };

        self.createUserRole = function () {
            progress.start();
            var createUserRoleURL = $a.servicesUrl + "tu/tradeUnions/"+ self.selectedUnionId() +"/roles/" + self.selectedUnionRole() +"/users/"+ self.selectedUser() + "?authToken="+$.cookie("token");
            $.ajax({
                headers: {
                    'Content-Type': 'application/json'
                },
                type:"POST",
                crossDomain: true,
                url:createUserRoleURL,
                success: function(result){
                    progress.done();
                    getUserRoleList();
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    progress.done();
                }
            })
                .always(function(){
                });
        };

        self.deleteUserRole = function(obj, event, data) {
            var userRole = this;
            progress.start();
            var deleteUserRoleURL = $a.servicesUrl + "common/roles/"+ obj.roleId +"/users/" + obj.id + "?authToken="+$.cookie("token");
            $.ajax({
                headers: {
                    'Content-Type': 'application/json'
                },
                type:"DELETE",
                crossDomain: true,
                url:deleteUserRoleURL,
                success: function(result){
                    progress.done();
                    self.userRoleList.remove(userRole);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    progress.done();
                }
            })
                .always(function(){
                });
        };

        function initTransferUserSelector(){
            var searchUserListURL = $a.servicesUrl + "tu/users/puzzyvalidation?tuId="+ self.selectedUnionId() +"&authToken=" + $.cookie("token");
            $(".js-transfer-basic-single").select2({
                ajax: {
                    url: searchUserListURL,
                    dataType: 'json',
                    delay: 350,
                    data: function (params) {
                        return {
                            userName: params.term
                        };
                    },
                    processResults: function (data, params) {
                        //self.transferUserList(data);
                        // parse the results into the format expected by Select2.
                        // since we are using custom formatting functions we do not need to
                        // alter the remote JSON data
                        _.each(data, function (user) {
                            if (typeof user != "undefined") {
                                _.extend(user, {text: user.name});
                            }
                        });
                        return {
                            results: data
                        };
                    },
                    cache: true
                },
                language: {
                    // You can find all of the options in the language files provided in the
                    // build. They all must be functions that return the string that should be
                    // displayed.
                    inputTooShort: function () {
                        return "\u8bf7\u8f93\u5165\u5b57\u7b26";
                    },
                    errorLoading: function () {
                        return "\u65e0\u6cd5\u8f7d\u5165\u7ed3\u679c";
                    },
                    loadingMore: function () {
                        return "\u8f7d\u5165\u66f4\u591a\u7ed3\u679c\u2026";
                    },
                    noResults: function () {
                        return "\u672a\u627e\u5230\u7ed3\u679c";
                    },
                    searching: function () {
                        return "\u641c\u7d22\u4e2d\u2026";
                    }
                },
                escapeMarkup: function (markup) { return markup; },
                minimumInputLength: 1,
                templateResult: formatRepo,
                templateSelection: formatRepoSelection
            });
        };

        self.getUnionTransferUser = function(){
            var getTradeUnionURL = $a.servicesUrl + "tu/tradeUnions/mine?authToken="+$.cookie("token");
            $.ajax({
                type: "get",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                url: getTradeUnionURL,
                success: function (json) {
                    if(typeof json !== 'undefined') {
                        var result = [];
                        result.push(json);
                        if(typeof json.children !== 'undefined'){
                            _.each(json.children, function (union) {
                                if (typeof union !== "undefined") {
                                    var obj;
                                    if(typeof union.name !== 'undefined' && union.name != ""){
                                        obj = {"name": union.name, "id": union.id};
                                    }
                                    else{
                                        obj = {"name": "\u672a\u547d\u540d\u5de5\u4f1a", "id": union.id};
                                    }
                                    result.push(obj);
                                }
                            });
                        }
                        self.destUnionList(result);
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

        function formatRepo (repo) {
            if (repo.loading) return repo.text;

            var markup = '<div class="am-g">' +
                '<div clas="am-u-sm-12">' +
                '<div class="am-u-sm-6 am-text-sm">' + repo.name + '</div>';
            if (repo.tu) {
                markup += '<div class="am-u-sm-6 am-text-sm">' + repo.tu.name + '</div>';
            }
            else{
                markup += '<div class="am-u-sm-6"></div>';
            }
            markup += '</div></div>';

            return markup;
        }

        function formatRepoSelection (repo) {
            return repo.name || repo.text;
        }

        self.transferUser = function(){
            var keepOriginal = self.isDuplicated();
            var selectedUser = self.selectedTransferUser();
            var selectedUnion = self.selectedDestUnion();

            if(typeof selectedUser !== 'undefined' && typeof selectedUnion !== 'undefined'){
                progress.start();
                var transferUserURL = $a.servicesUrl + "tu/users/"+ selectedUser +"/tradeUnions/from/" + self.selectedUnionId() + "/to/"+ selectedUnion +"?keepFromTu="+ keepOriginal +"&authToken="+$.cookie("token");
                $.ajax({
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    type:"PUT",
                    crossDomain: true,
                    url:transferUserURL,
                    success: function(result){
                        var $modal = $('#transfer-result');
                        $modal.modal();

                        //self.transferUserList("");
                        $(".js-transfer-basic-single").val("").trigger("change");
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                    }
                })
                    .always(function(){
                        progress.done();
                    });
            }

        };

        self.getMineUnion = function(){
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
                        self.searchUnionClick();
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

        self.getMineUnion();
    };

    return viewModel;
});
