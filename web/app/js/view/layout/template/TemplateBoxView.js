define([
    'marionette', 
    'vent',
    'text!template/layout/template/TemplateBox.html',
], function(
    Marionette,
    vent, 
    TemplateBox
){

    return Marionette.ItemView.extend({

        className: 'template_box',
        template: function(data){
            return _.template(TemplateBox, data, {variable: 'args'});
        },

        events: {
        },

        initialize: function(){
            // _.bindAll(this, 'deleteArticle');
            // this.listenTo(this.options.model, 'destroy', this.destroyView);
        },

        render: function(){
            this.$el.html(this.template({}));
        },

    

        // onClose: function(){
        //     alert('close item');
        // }

    });
});