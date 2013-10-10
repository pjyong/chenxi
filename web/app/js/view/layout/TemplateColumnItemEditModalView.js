define([
    'marionette', 
    'vent',
    'text!template/layout/TemplateColumnItemEditModal.html',
], function(
    Marionette,
    vent, 
    TemplateColumnItemEditModal
){

    return Marionette.ItemView.extend({

        // tagName: 'li',

        className: 'modal-dialog',
        

        template: function(data){
            return _.template(TemplateColumnItemEditModal, data, {variable: 'args'});
        },

        events: {
            'click .column_save': 'saveColumn'
        },

        initialize: function(){
            _.bindAll(this, 'saveColumn');
            this.model = this.options.model;
            // _.bind(this.editImage, this);
            // console.log(this.model);
            // this.listenTo(this.options.model, 'destroy', this.destroyView);
        },

        render: function(){
            this.$el.html(this.template());
        },

        saveColumn: function(){
            this.model.set('minWidth', parseInt(this.$('.min_width_option').val()));
            vent.trigger('CustomTemplateController:saveColumn', {model: this.model});
        }

        // savePageTemplate: function(){
        //     // var imageName = this.$('#image_name').val();
        //     var pageTemplateName = this.$('#page_template_name').val();
        //     var contentType = this.$('#content_type_option').val();
        //     var isPrimary = this.$('.is_primary_option:checked').val() == '1' ? true : false;
        //     this.model.set('name', pageTemplateName);
        //     this.model.set('contentType', contentType);
        //     this.model.set('isPrimary', isPrimary);
        //     vent.trigger('pageTemplateController:savePageTemplate', {model: this.model});
            
        // }



    });
});