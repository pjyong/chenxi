define([
    'marionette', 
], function(
    Marionette,
){

    return Marionette.ItemView.extend({

        
        el: '#loading_div',

        initialize: function(){
            this.render();
        },

        

        template: function(){
            return _.template(LoadingTemplate);
        },

        render: function(){
            this.$el.html(this.template());
        },

        show: function(){
            this.$el.show();
        },

        hide: function(){
            this.$el.hide();
        }

    });
});