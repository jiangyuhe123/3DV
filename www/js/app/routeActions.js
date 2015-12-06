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
			removeViewModel(dom.sidebar);
			removeViewModel(dom.header);
			removeViewModel(dom.navbar);
			createViewModel(null, {}, 'menu/template', dom.content);
		},
		admin: {
			login: function() {
				removeViewModel(dom.sidebar);
				removeViewModel(dom.header);
				//createViewModel(null, {}, 'header', dom.header);
				createViewModel(null, {}, 'navbar', dom.navbar);
				createViewModel(null, {}, 'admin/login', dom.content);
			}
		},
		menu: {
			template: function() {
				createViewModel(null, {}, 'header', dom.header);
				createViewModel(null, {}, 'navbar', dom.navbar);
				createViewModel(null, {}, 'sidebar', dom.sidebar);
				createViewModel(null, {}, 'menu/template', dom.content);
			}
		}
	};

	return routeActions;

});
