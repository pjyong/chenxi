define([
    'marionette',
], function(
    Marionette
){
    var articleModel = Backbone.Model.extend({
        defaults: {
            title: '',
            body: '',
            start_date: '',
            end_date: ''
        },

        initialize: function(){
        },

        urlRoot: 'api/content/articles',
    });

    return articleModel;
});