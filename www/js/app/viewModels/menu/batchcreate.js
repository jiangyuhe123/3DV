/**
 * Created by michael on 2015/6/10.
 */

'use strict';


define([
    'underscore',
    'ko',
    'knockout.file.bind'
], function(
    _,
    ko
){
    var viewModel = function(){
        var self = this;
        self.template = "menu/batchcreate-tpl";

        self.myPostProcessingLogic = function(elements) {
            $(document).on({
                dragleave:function(e){    //拖离
                    e.preventDefault();
                },
                drop:function(e){  //拖后放
                    e.preventDefault();
                },
                dragenter:function(e){    //拖进
                    e.preventDefault();
                },
                dragover:function(e){    //拖来拖去
                    e.preventDefault();
                }
            });

            var dnd = $('#dndArea').get(0);
            dnd.addEventListener("dragenter", function(e){
                $('.queueList').css('borderColor','gray');
            }, false);
            dnd.addEventListener("dragleave", function(e){
                $('.queueList').css('borderColor','');
            }, false);
            dnd.addEventListener("dragenter", function(e){
                e.stopPropagation();
                e.preventDefault();
            }, false);
            dnd.addEventListener("dragover", function(e){
                e.stopPropagation();
                e.preventDefault();
            }, false);
            dnd.addEventListener("drop", function(e){
                $('.queueList').css('borderColor','');
                e.stopPropagation();
                e.preventDefault();

                var fileNames = '';
                $('.statusBar').removeClass('am-hide');
                self.uploadProgressWidth("0%");
                self.uploadProgress("0%");
                $.each(e.dataTransfer.files, function() {
                    self.fileInput(this);
                    self.fileName(this.name);
                    fileNames += '<span class="am-badge">' + this.name + '</span> ';
                });
                $('#file-list').html(fileNames);
            }, false);
        };

        /**
         * public attribute
         */
        var progress = $.AMUI.progress;
        self.errorMsgs = ko.observableArray([]);
        self.fileInput = ko.observable();
        self.fileName = ko.observable();
        self.someReader = new FileReader();

        self.batchCreatePreviewList = ko.observableArray([]);
        self.userName = ko.observable().extend({ required: true, maxLength: 60});
        self.password = ko.observable().extend({ required: true, maxLength: 60});

        self.popEnterpriseName = ko.observable();
        self.popEnterpriseZone = ko.observable();
        self.popEnterpriseDistrict = ko.observable();
        self.popEnterpriseCity = ko.observable();
        self.popEnterpriseCountry = ko.observable();
        self.popEnterpriseAddressDetail = ko.observable();
        self.popEnterpriseOrgCode = ko.observable();
        self.previewText = ko.observable();
        self.filestream = ko.observable();
        self.uploadProgress = ko.observable();
        self.uploadProgressWidth = ko.observable();

        /**
         * private attribute
         */
        var responseToken = "";

        /**
         * service paths
         */
        var uploadFileURL = $a.servicesUrl + "tu/users/batch/upload?authToken="+$.cookie("token");

        function handleFilesUpload() {
            if(typeof self.fileInput() != 'undefined' && self.fileInput() != "") {
                var xhr = new XMLHttpRequest();
                xhr.file = self.fileInput(); // not necessary if you create scopes like this
                xhr.addEventListener('progress', function (e) {
                    var done = e.position || e.loaded, total = e.totalSize || e.total;
                    var progressPrecentage = (Math.floor(done / total * 1000) / 10) + '%';
                    console.log('xhr progress: ' + progressPrecentage);
                    self.uploadProgressWidth(progressPrecentage);
                    self.uploadProgress(progressPrecentage)
                }, false);
                if (xhr.upload) {
                    xhr.upload.onprogress = function (e) {
                        var done = e.position || e.loaded, total = e.totalSize || e.total;
                        console.log('xhr.upload progress: ' + done + ' / ' + total + ' = ' + (Math.floor(done / total * 1000) / 10) + '%');
                    };
                }
                xhr.onreadystatechange = function (e) {
                    //if success upload, get the preview result.
                    if (4 == this.readyState && xhr.status == 200 && xhr.responseText != 'undefined') {
                        self.fileInput("");
                        console.log(['xhr upload complete', e]);
                        responseToken = xhr.responseText;
                        self.getResponseForBatchCreatePreviewList(responseToken);
                        $("#btnConfirmUpload").removeAttr("disabled");
                    }
                };
                xhr.open('post', uploadFileURL, true);
                //no need to set the content type here, since formdata will set it automatically with multipart/form-data send from form data
                //xhr.setRequestHeader("Content-type", "multipart/form-data");
                var fd = new FormData;
                fd.append('data', self.fileInput());
                //send by from data
                xhr.send(fd);
                //xhr.send(file);
            }
        };

        self.btnBatchUploadClick = function(){
            self.previewText("");
            $("#btnDownload").addClass("am-hide");
            handleFilesUpload();
        };

        self.getResponseForBatchCreatePreviewList = function (response) {
            var batchCreatePreviewListURL = $a.servicesUrl + "tu/users/batch/" + response + "/review?authToken="+$.cookie("token");

            $.ajax({
                type: "get",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                url: batchCreatePreviewListURL,
                success: function (json) {
                    self.batchCreatePreviewList(json);
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

        self.uploadFileChange = function(obj, event, data) {
            $('.statusBar').removeClass("am-hide");
            self.uploadProgressWidth("0%");
            self.uploadProgress("0%");
            var fileNames = '';
            $.each(event.target.files, function() {
                fileNames += '<span class="am-badge">' + this.name + '</span> ';
            });
            $('#file-list').html(fileNames);
        };

        self.getUserDetailInfo = function(obj, event, data) {
            self.popEnterpriseName(obj.enterprise.name);
            self.popEnterpriseZone(obj.enterprise.zone.name);
            self.popEnterpriseDistrict(obj.enterprise.district.name);
            self.popEnterpriseCity(obj.enterprise.city.name);
            self.popEnterpriseCountry(obj.enterprise.country);
            self.popEnterpriseAddressDetail(obj.enterprise.addressDetail);
            self.popEnterpriseOrgCode(obj.enterprise.orgCode);
        };

        self.confirmUpload = function() {
            $("#btnConfirmSpin").addClass("am-icon-spinner am-icon-spin");
            var confirmBatchUploadURL = $a.servicesUrl + "tu/users/batch/" + responseToken + "/approve?authToken="+$.cookie("token");
            var getUploadProgressURL = $a.servicesUrl + "tu/users/batch/" + responseToken + "/approve/progress?authToken="+$.cookie("token");
            progress.start();

            $.ajax({
                type:"POST",
                crossDomain: true,
                url:confirmBatchUploadURL,
                success: function(result){
                    $.ajax({
                        type: "get",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        crossDomain: true,
                        url: getUploadProgressURL,
                        success: function (json) {
                            if(typeof json.failed != "undefined" && json.failed >0){
                                $("#btnDownload").removeClass("am-hide");
                            }
                            self.previewText("\u4e0a\u4f20\u5b8c\u6210, " + json.succeed + " \u7528\u6237\u4e0a\u4f20\u6210\u529f," + json.failed +" \u7528\u6237\u4e0a\u4f20\u5931\u8d25");
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
                $("#btnConfirmSpin").removeClass("am-icon-spinner am-icon-spin");
                self.previewText("\u4e0a\u4f20\u5b8c\u6210");
                progress.done();
            });
        };

        self.downloadFailed = function() {
            var downloadFailedURL = $a.servicesUrl + "tu/users/batch/" + responseToken +"/approve/error?authToken="+$.cookie("token");

            window.open(downloadFailedURL);
        };
    };

    return viewModel;
});
