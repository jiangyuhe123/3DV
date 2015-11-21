/**
 * Created by michael on 2015/7/20.
 */
/**
 * Created by michael on 2015/6/10.
 */

'use strict';
// Let's not muck with common.js for the libraires we
// need specifically for our app. Define them here.

define([
    'underscore',
    'ko'
], function(
    _,
    ko
){
    var viewModel = function(){
        var self = this;
        self.template = "organization/org_mgt_overview-tpl";

        self.myPostProcessingLogic = function(elements) {
            setTimeout(function (){
                require(['amazeui','amazeui-widgets','handlebars']);
            }, 5000);
        };
    };

    return viewModel;
});
