var cordova = require('cordova'),
    exec = require('cordova/exec');

var FGPushNotification = function() {
	this.registered = false;

	this.appId = null;
	this.channelId = null;
	this.userId = null;

	var me = this;
	me.getInfo(function(info) {
		me.appId = info.appId;
		me.channelId = info.channelId;
		me.userId = info.userId;
	});
};
FGPushNotification.prototype.init = function(api_key)
{
    exec(fastgoPushNotification.successFn, fastgoPushNotification.failureFn, 'FGPushNotification', 'init', [api_key]);
};

FGPushNotification.prototype.successFn = function(info)
{
	if(info){
		fastgoPushNotification.registered = true;
		cordova.fireDocumentEvent("cloudPushRegistered", info);
	}
};

FGPushNotification.prototype.failureFn = function(info)
{
	fastgoPushNotification.registered = false;
};

FGPushNotification.prototype.getInfo = function(successCallback, errorCallback)
{
	argscheck.checkArgs('fF','FGPushNotification.getInfo',arguments);
	exec(successCallback, errorCallback, "FGPushNotification", "getInfo",[]);
};

var fastgoPushNotification = new FGPushNotification();

module.exports = fastgoPushNotification;