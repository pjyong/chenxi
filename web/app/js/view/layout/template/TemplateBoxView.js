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
            this.model = this.options.model;
        },

        render: function(){
            console.log(this.model.toJSON());
            this.$el.html(this.template(this.model.toJSON()));
        },

    

        // onClose: function(){
        //     alert('close item');
        // }

    });
});