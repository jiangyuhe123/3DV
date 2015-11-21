'use strict';

define([
	'underscore',
	'ko'
	], function(
	_,
	ko
	){

	var createViewModel = function(id,options,path,el){
		path = viewModelBasePath + path;
		var ViewModelConstructor = _.last(path.split("/"));
		require(
				[path],function(ViewModelConstructor){
					// zombie control
					removeViewModel(el);
					// Create the new ViewModel and apply its bindings to el
					ko.applyBindings(new ViewModelConstructor(id,options), el);
				}
		);
	};
	var removeViewModel = function(el){
		$(el).find("*").each(function () {
			$(this).unbind();
		});
		ko.cleanNode(el);
		$(el).empty();
	};

	// VIEW MODEL BASE PATH
	var viewModelBasePath = "app/viewModels/";

	// DOM MAPPING
	var dom = {
			header:         $("#header")[0],
			sidebar:        $("#sidebar")[0],
			content:        $("#content")[0],
			navbar:			$("#navbar")[0]
	};

	// ROUTE ACTIONS
	var routeActions = {
		dashboard: function(){
			createViewModel(null, {}, 'header', dom.header);
			createViewModel(null, {}, 'navbar', dom.navbar);
			createViewModel(null, {}, 'sidebar', dom.sidebar);
			createViewModel(null, {}, 'dashboard', dom.content);
		},
		admin: {
			register: function() {
				createViewModel(null, {}, 'header', dom.header);
				createViewModel(null, {}, 'navbar', dom.navbar);
				createViewModel(null, {}, 'admin/register', dom.content);
			},
			login: function() {
				removeViewModel(dom.sidebar);
				removeViewModel(dom.header);
				//createViewModel(null, {}, 'header', dom.header);
				createViewModel(null, {}, 'navbar', dom.navbar);
				createViewModel(null, {}, 'admin/login', dom.content);
			},
			forgetpassword: function() {
				createViewModel(null, {}, 'header', dom.header);
				createViewModel(null, {}, 'navbar', dom.navbar);
				createViewModel(null, {}, 'admin/forgetpassword', dom.content);
			},
			settings: function() {
				createViewModel(null, {}, 'header', dom.header);
				createViewModel(null, {}, 'navbar', dom.navbar);
				createViewModel(null, {}, 'admin/settings', dom.content);
			}
		},
		menu: {
			approval: function() {
				createViewModel(null, {}, 'header', dom.header);
				createViewModel(null, {}, 'navbar', dom.navbar);
				createViewModel(null, {}, 'sidebar', dom.sidebar);
				createViewModel(null, {}, 'menu/approval', dom.content);
			},
			cardapproval: function() {
				createViewModel(null, {}, 'header', dom.header);
				createViewModel(null, {}, 'navbar', dom.navbar);
				createViewModel(null, {}, 'sidebar', dom.sidebar);
				createViewModel(null, {}, 'menu/cardapproval', dom.content);
			},
			tenantapproval: function() {
				createViewModel(null, {}, 'header', dom.header);
				createViewModel(null, {}, 'navbar', dom.navbar);
				createViewModel(null, {}, 'sidebar', dom.sidebar);
				createViewModel(null, {}, 'menu/tenantapproval', dom.content);
			},
			batchcreate: function() {
				createViewModel(null, {}, 'header', dom.header);
				createViewModel(null, {}, 'navbar', dom.navbar);
				createViewModel(null, {}, 'sidebar', dom.sidebar);
				createViewModel(null, {}, 'menu/batchcreate', dom.content);
			},
			rolemanage: function() {
				createViewModel(null, {}, 'header', dom.header);
				createViewModel(null, {}, 'navbar', dom.navbar);
				createViewModel(null, {}, 'sidebar', dom.sidebar);
				createViewModel(null, {}, 'menu/rolemanage', dom.content);
			},
			permissionmanage: function() {
				createViewModel(null, {}, 'header', dom.header);
				createViewModel(null, {}, 'navbar', dom.navbar);
				createViewModel(null, {}, 'sidebar', dom.sidebar);
				createViewModel(null, {}, 'menu/permissionmanage', dom.content);
			},
			unionaddress: function() {
				createViewModel(null, {}, 'header', dom.header);
				createViewModel(null, {}, 'navbar', dom.navbar);
				createViewModel(null, {}, 'sidebar', dom.sidebar);
				createViewModel(null, {}, 'menu/unionaddress', dom.content);
			},
			statistics: function() {
				createViewModel(null, {}, 'header', dom.header);
				createViewModel(null, {}, 'navbar', dom.navbar);
				createViewModel(null, {}, 'sidebar', dom.sidebar);
				createViewModel(null, {}, 'menu/statistics', dom.content);
			},
			unionmanage: function() {
				createViewModel(null, {}, 'header', dom.header);
				createViewModel(null, {}, 'navbar', dom.navbar);
				createViewModel(null, {}, 'sidebar', dom.sidebar);
				createViewModel(null, {}, 'menu/unionmanage', dom.content);
			},
			unionquicksearch: function(unionId) {
				createViewModel(null, {}, 'header', dom.header);
				createViewModel(null, {}, 'navbar', dom.navbar);
				createViewModel(null, {}, 'sidebar', dom.sidebar);
				createViewModel(null, {unionId:unionId}, 'menu/unionquicksearch', dom.content);
			},
			enterprisequicksearch: function() {
				createViewModel(null, {}, 'header', dom.header);
				createViewModel(null, {}, 'navbar', dom.navbar);
				createViewModel(null, {}, 'sidebar', dom.sidebar);
				createViewModel(null, {}, 'menu/enterprisequicksearch', dom.content);
			},
			userquicksearch: function() {
				createViewModel(null, {}, 'header', dom.header);
				createViewModel(null, {}, 'navbar', dom.navbar);
				createViewModel(null, {}, 'sidebar', dom.sidebar);
				createViewModel(null, {}, 'menu/userquicksearch', dom.content);
			}
		},
		navigation: {
			tagmanage: function() {
				createViewModel(null, {}, 'navigation/tagmanage', dom.content);
			},
			quicksearch: function() {
				createViewModel(null, {}, 'navigation/quicksearch', dom.content);
			}
		}
	};

	return routeActions;

});
