/**
 * Created by michael on 2015/6/8.
 */
/*
 * Copyright (c) 2013 WTU. All rights reserved.
 *
 * The copyright to the computer software is the property of
 * WTU. The software may be used and/or copied only
 * with the written permission of WTU or in accordance
 * with the terms and conditions stipulated in the agreement/contract
 * under which the software has been supplied.
 */
'use strict';

define([
    'underscore',
    'ko'
], function(
    _,
    ko
){
    var errorInfo = function() {

        var self = this;

        self.errorMessages = ko.observable("����ϵ��ˣ��Ͽ�ȥ����ɡ�");
        self.template = function() {
            return 'error-tpl';
        };

        self.myPostProcessingLogic = function(elements) {
            require(['amazeui']);
        };

    };

    return errorInfo;

});

