define([
    'marionette',
    'model/content/PageModel'
], function(
    Marionette,
    PageModel
){
    var pageCollection = Backbone.Collection.extend({
        model: PageModel,
        url: 'api/content/pages'
    });

    return pageCollection;
});