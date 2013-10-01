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

        events: {
            'click .delete': 'deleteArticle'
        },

        initialize: function(){
            _.bindAll(this, 'deleteArticle');
            this.listenTo(this.options.model, 'destroy', this.destroyView);
        },

        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
        },

        deleteArticle: function(){
            // trigger
            vent.trigger('articleController:deleteArticle', {model: this.model});
        },

        destroyView: function(){
            this.close();
        },

        // onClose: function(){
        //     alert('close item');
        // }

    });
});