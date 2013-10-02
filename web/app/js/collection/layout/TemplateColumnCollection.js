define([
    'marionette',
    'model/layout/TemplateColumnModel'
], function(
    Marionette,
    TemplateColumnModel
){
    var templateColumnCollection = Backbone.Collection.extend({
        model: TemplateColumnModel,
        url: 'api/layout/templates'
    });

    return templateColumnCollection;
});