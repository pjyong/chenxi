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

        },

        render: function(){
            var data = this.model.toJSON();
            data.boxType = this.model.get('boxType').toJSON();
            this.$el.html(this.template(data));
        },
        
        editBoxSetting: function(e){
            e.preventDefault();
            vent.trigger('CustomTemplateController:editBoxSetting', {templateBox: this.model});
        }
    

        // onClose: function(){
        //     alert('close item');
        // }

    });
});