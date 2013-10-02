define([
    'marionette', 
    'vent',
    'text!template/layout/PageTemplateItem.html',
], function(
    Marionette,
    vent, 
    PageTemplateItem
){

    return Marionette.ItemView.extend({

        tagName: 'div',

        template: function(data){
            return _.template(PageTemplateItem, data, {variable: 'args'});
        },

        events: {
        },

        initialize: function(){
            // _.bindAll(this, 'deleteArticle');
            // this.listenTo(this.options.model, 'destroy', this.destroyView);
        },

        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
        },

        

        destroyView: function(){
            this.close();
        },

        // onClose: function(){
        //     alert('close item');
        // }

    });
});