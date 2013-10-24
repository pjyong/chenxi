define([
    'marionette',
    'model/layout/TemplateColumnModel',
    'collection/layout/TemplateBoxCollection'
], function(
    Marionette,
    TemplateColumnModel,
    TemplateBoxCollection
){
    var templateColumnCollection = Backbone.Collection.extend({
    	initialize: function(options){
    		// this.options.pageTemplateId;
    		this.pageTemplateId = options.pageTemplateId;
    	},
        parse: function(response, options){
            // convert the tags data into collection
            // if(!_.isEmpty(response.boxes)){
                this.templateBoxCollection = new TemplateBoxCollection(response.boxes);
            // }
            // delete response.boxes;
            return response.columns;
        },
        model: TemplateColumnModel,
        url: function(){
        	return 'api/layout/templates/' + this.pageTemplateId + '/columns'
        }
    });

    return templateColumnCollection;
});