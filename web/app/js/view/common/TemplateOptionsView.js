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

            this.pageTemplates = this.options.pageTemplates;
            this.render();
        },

        template: function(data){
            return _.template(TemplateOptions, data, {variable: 'args'});
        },

        render: function(){
            this.$el.html(this.template(this.pageTemplates.toJSON()));
        },

    });
});