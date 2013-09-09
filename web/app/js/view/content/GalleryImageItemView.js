define([
    'marionette', 
    'vent',
    'text!template/content/gallery/GalleryImageItem.html',
], function(
    Marionette,
    vent, 
    GalleryImageItem
){

    return Marionette.ItemView.extend({

        tagName: 'li',
        

        template: function(data){
            return _.template(GalleryImageItem, data, {variable: 'args'});
        },

        events: {
            'click .edit_image': 'editImage',
            'click .delete_image': 'deleteImage',
        },

        initialize: function(){
            _.bindAll(this, 'editImage');
            // _.bind(this.editImage, this);
            // console.log(this.model);

            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.destroyView);
        },

        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
        },

        // deleteGallery: function(){
        //     // trigger
        //     vent.trigger('galleryController:deleteGallery', {model: this.model});
        // },

        editImage: function(e){
            e.preventDefault();
            vent.trigger('galleryController:editImage', {model: this.model});

            return false;
            // console.log(this.model);
        },

        deleteImage: function(e){
            e.preventDefault();
            vent.trigger('galleryController:deleteImage', {model: this.model});
            return false;
        },

        destroyView: function(){
            this.close();
        },

        // onClose: function(){
        //     alert('close item');
        // }

    });
});