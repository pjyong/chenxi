define([
    'marionette', 
    'text!template/common/LoadingTemplate.html',
], function(
    Marionette,
    LoadingTemplate
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
            this.$el.hide();
        },

        show: function(){
            this.$el.show();
        },

        hide: function(){
            this.$el.hide();
        }

    });
});