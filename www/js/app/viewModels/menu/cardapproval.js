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
        self.template = "menu/cardapproval-tpl";

        self.myPostProcessingLogic = function(elements) {
            $(".am-tabs").tabs();
            $(".am-dropdown").dropdown();
        };


        /**
         * service paths
         */
        var waitApproveListURL = $a.servicesUrl + "tu/member-cards/requests/pendingApproval?authToken="+$.cookie("token");
        var approveListURL = $a.servicesUrl + "tu/member-cards/requests/approved?authToken="+$.cookie("token");
        var uploadFileURL = $a.servicesUrl + "tu/member-cards/batch/upload?authToken="+$.cookie("token");
        /**
         * public attribute
         */
        var progress = $.AMUI.progress;
        self.errorMsgs = ko.observableArray([]);
        self.fileInput = ko.observable();
        self.fileName = ko.observable();
        self.someReader = new FileReader();

        self.waitApproveList = ko.observableArray([]);
        self.approvedList = ko.observableArray([]);

        /**
         * local attribute
         */
        var mouseClickUserId = '';
        var responseToken = "";

        self.getWaitApproveList = function () {
            $.ajax({
                type: "get",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                url: waitApproveListURL,
                success: function (json) {
                    if(typeof json !== 'undefined'){
                        self.waitApproveList(json);
                    }
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

        self.getApprovedList = function () {
            $.ajax({
                type: "get",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                url: approveListURL,
                success: function (json) {
                    if(typeof json !== 'undefined'){
                        self.approvedList(json);
                    }
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

        self.operationClick = function(obj, event, data) {
            mouseClickUserId = obj.id;
        };

        self.approveUser = function() {
            var $modal = $('#card-approved');
            progress.start();
            var obj = this;
            var approveUserURL = $a.servicesUrl + "tu/member-cards/requests/"+ mouseClickUserId+ "/approval?authToken="+$.cookie("token");
            $.ajax({
                headers: {
                    'Content-Type': 'application/json'
                },
                type:"PUT",
                crossDomain: true,
                url:approveUserURL,
                success: function(result){
                    progress.done();
                    self.waitApproveList.remove(obj);
                    $modal.modal();
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    progress.done();
                }
            })
                .always(function(){
                });
        };

        self.uploadFileChange = function(obj, event, data) {
            var fileNames = '';
            $.each(event.target.files, function() {
                fileNames += '<span class="am-badge">' + this.name + '</span> ';
            });
            $('#file-list').html(fileNames);
        };

        self.btnBatchUploadClick = function(){
            var file = $("#doc-form-file").get(0).files[0];
            if(typeof file != 'undefined') {
                var $modal = $('#batch-upload-modal-loading');
                $modal.modal();

                var xhr = new XMLHttpRequest();
                xhr.file = file; // not necessary if you create scopes like this
                xhr.addEventListener('progress', function (e) {
                    var done = e.position || e.loaded, total = e.totalSize || e.total;
                    console.log('xhr progress: ' + (Math.floor(done / total * 1000) / 10) + '%');
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
                        $modal.modal('close');
                        console.log(['xhr upload complete', e]);
                        responseToken = xhr.responseText;
                    }
                };

                xhr.open('post', uploadFileURL, true);
                //no need to set the content type here, since formdata will set it automatically with multipart/form-data send from form data
                //xhr.setRequestHeader("Content-type", "multipart/form-data");

                var fd = new FormData;
                fd.append('data', file);
                //send by from data
                xhr.send(fd);
                //xhr.send(file);
            }
        };

        self.getWaitApproveList();
    };

    return viewModel;
});
