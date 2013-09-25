define([
    'marionette', 
    'vent',
    'text!template/content/page/PageItem.html',
], function(
    Marionette,
    vent, 
    PageItem
){

    return Marionette.ItemView.extend({

        tagName: 'tr',

        template: function(data){
            return _.template(PageItem, data, {variable: 'args'});
        },

        events: {
            'click .delete': 'deletePage'
        },

        initialize: function(){
            _.bindAll(this, 'deletePage');
            this.listenTo(this.options.model, 'destroy', this.destroyView);
        },

        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
        },

        deletePage: function(){
            // trigger
            vent.trigger('pageController:deletePage', {model: this.model});
        },

        destroyView: function(){
            this.close();
        },

        // onClose: function(){
        //     alert('close item');
        // }

    });
});