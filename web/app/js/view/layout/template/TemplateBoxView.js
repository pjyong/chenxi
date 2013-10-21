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
            'click .template_box_setting': 'editBoxSetting'
        },

        initialize: function(){
            _.bindAll(this, 'editBoxSetting');
            // this.listenTo(this.options.model, 'destroy', this.destroyView);
            this.model = this.options.model;
            console.log(this.model);
        },

        render: function(){
            console.log(this.model.toJSON());
            this.$el.html(this.template(this.model.toJSON()));
        },
        
        editBoxSetting: function(){
            vent.trigger('CustomTemplateController:editBoxSetting', {});
        }
    

        // onClose: function(){
        //     alert('close item');
        // }

    });
});