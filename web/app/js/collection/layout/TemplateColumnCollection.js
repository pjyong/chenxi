define([
    'marionette',
    'model/layout/TemplateColumnModel'
], function(
    Marionette,
    TemplateColumnModel
){
    var templateColumnCollection = Backbone.Collection.extend({
    	initialize: function(options){
    		// this.options.pageTemplateId;
    		this.pageTemplateId = options.pageTemplateId;
    	},
        model: TemplateColumnModel,
        url: function(){
        	return 'api/layout/templates/' + this.pageTemplateId + '/columns'
        }
    });

    return templateColumnCollection;
});