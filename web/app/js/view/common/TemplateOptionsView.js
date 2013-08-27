define([
    'marionette',
    'text!template/common/TemplateOptions.html'
], function(
    Marionette,
    TemplateOptions
){

    return Marionette.ItemView.extend({

        
        el: '#template_options_view',


        initialize: function(){
            this.render();
        },

        template: function(){
            return _.template(TemplateOptions);
        },

        render: function(){
            this.$el.html(this.template());
        },

    });
});