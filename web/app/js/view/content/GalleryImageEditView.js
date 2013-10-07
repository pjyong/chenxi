define([
    'marionette', 
    'vent',
    'text!template/content/gallery/GalleryImageEdit.html',
], function(
    Marionette,
    vent, 
    GalleryImageEdit
){

    return Marionette.ItemView.extend({

        // tagName: 'li',
        

        template: function(data){
            return _.template(GalleryImageEdit, data, {variable: 'args'});
        },
        className: 'modal-dialog',

        events: {
            'click .image_save': 'saveImage'
        },

        initialize: function(){
            _.bindAll(this, 'saveImage');
            // _.bind(this.editImage, this);
            // console.log(this.model);
            // this.listenTo(this.options.model, 'destroy', this.destroyView);
        },

        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
        },

        saveImage: function(){
            var imageName = this.$('#image_name').val();
            this.model.set('name', imageName);
            vent.trigger('galleryController:saveImage', {model: this.model});
            
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