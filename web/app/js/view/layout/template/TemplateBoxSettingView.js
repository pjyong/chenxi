define([
    'marionette', 
    'vent',
    'text!template/layout/template/TemplateBoxSetting.html',
], function(
    Marionette,
    vent, 
    TemplateBoxSetting
){

    return Marionette.ItemView.extend({

        template: function(data){
            return _.template(TemplateBoxSetting, data, {variable: 'args'});
        },

        events: {
            // 'click .template_box_setting': 'editBoxSetting'
        },

        className: 'modal-dialog',

        initialize: function(){
            // _.bindAll(this, 'editBoxSetting');
            // this.listenTo(this.options.model, 'destroy', this.destroyView);
            this.model = this.options.model;

            // console.log(this.model);
        },

        render: function(){
            // console.log(this.model.toJSON());
            var data = this.model.toJSON();
            data.boxType = this.model.get('boxType').toJSON();
            this.$el.html(this.template(data));
        },
        
        // editBoxSetting: function(e){
        //     e.preventDefault();
        //     vent.trigger('CustomTemplateController:editBoxSetting', {templateBox: this.model});
        // }
    

        // onClose: function(){
        //     alert('close item');
        // }

    });
});