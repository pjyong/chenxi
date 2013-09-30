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

        initialize: function(){
            _.bindAll(this, 'saveTemplate');
            // _.bind(this.editImage, this);
            // console.log(this.model);
            // this.listenTo(this.options.model, 'destroy', this.destroyView);
        },

        render: function(){
            this.$el.html(this.template({}));
        },

        saveTemplate: function(){
            // var imageName = this.$('#image_name').val();
            // this.model.set('name', imageName);
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