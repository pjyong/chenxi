define([
    'marionette', 
    'vent',
    'text!template/layout/PageTemplateEdit.html',
], function(
    Marionette,
    vent, 
    PageTemplateEdit
){

    return Marionette.ItemView.extend({

        // tagName: 'li',
        

        template: function(data){
            return _.template(PageTemplateEdit, data, {variable: 'args'});
        },

        events: {
            'click .template_save': 'savePageTemplate'
        },
        className: 'modal-dialog',

        initialize: function(){
            _.bindAll(this, 'savePageTemplate');
            // _.bind(this.editImage, this);
            // console.log(this.model);
            // this.listenTo(this.options.model, 'destroy', this.destroyView);
        },

        render: function(){
            this.$el.html(this.template({}));
        },

        savePageTemplate: function(){
            // var imageName = this.$('#image_name').val();
            var pageTemplateName = this.$('#page_template_name').val();
            var contentType = this.$('#content_type_option').val();
            var isPrimary = this.$('.is_primary_option:checked').val() == '1' ? true : false;
            this.model.set('name', pageTemplateName);
            this.model.set('contentType', contentType);
            this.model.set('isPrimary', isPrimary);
            vent.trigger('pageTemplateController:savePageTemplate', {model: this.model});
            
        }

        // deleteGallery: function(){
        //     // trigger
        //     vent.trigger('galleryController:deleteGallery', {model: this.model});
        // },

        // editImage: function(e){
        //     e.preventDefault();

        //     return false;
        //     // console.log(this.model);
        // },

        // destroyView: function(){
        //     this.close();
        // },

        // onClose: function(){
        //     alert('close item');
        // }

    });
});