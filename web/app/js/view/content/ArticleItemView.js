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

        className: 'article_item',

        template: function(data){
            return _.template(ArticleItem, data, {variable: 'args'});
        },

        events: {
            'click .delete': 'deleteArticle',
            'click .cx-tools': 'preventClick',
            'mouseover .cx-contents': 'showTools',
            'mouseout .cx-contents': 'hideTools'
        },

        initialize: function(){
            _.bindAll(this, 'deleteArticle', 'showTools', 'hideTools');
            this.listenTo(this.options.model, 'destroy', this.destroyView);
        },

        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
        },

        deleteArticle: function(){
            // trigger
            vent.trigger('articleController:deleteArticle', {model: this.model});
        },

        showTools: function(){
            this.$('.cx-tools').css('visibility', 'visible');
        },
        hideTools: function(){

            this.$('.cx-tools').css('visibility', 'hidden');
        },
        preventClick: function(e){
            e.stopPropagation();
        },

        destroyView: function(){
            this.close();
        },

        // onClose: function(){
        //     alert('close item');
        // }

    });
});