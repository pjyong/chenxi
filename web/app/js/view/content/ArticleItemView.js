define([
    'marionette', 
    'vent',
    'text!template/content/article/ArticleItem.html',
], function(
    Marionette,
    vent, 
    ArticleItem
){

    return Marionette.ItemView.extend({

        tagName: 'tr',

        template: function(data){
            return _.template(ArticleItem, data, {variable: 'args'});
        },

        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
        },

    });
});