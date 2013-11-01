define([
    'marionette',
    'model/layout/PageTemplateModel'
], function(
    Marionette,
    PageTemplateModel
){
    var pageTemplateCollection = Backbone.Collection.extend({
    	initialize: function(options){
    		// this.options.pageTemplateId;
    		if(!_.isUndefined(options) && !_.isUndefined(options.contentType)){
    			this.contentType =  options.contentType;
    		}
    	},
        model: PageTemplateModel,
        url: function(){
        	if(!_.isUndefined(this.contentType)){
        		return 'api/layout/templates/' + this.contentType;
        	}
        	return 'api/layout/templates';
        }
    });

    return pageTemplateCollection;
});