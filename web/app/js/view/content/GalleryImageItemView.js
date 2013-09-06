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
            // 'click .delete': 'deleteGallery'
        },

        initialize: function(){
            // _.bindAll(this, 'deleteGallery');
            // this.listenTo(this.options.model, 'destroy', this.destroyView);
        },

        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
        },

        // deleteGallery: function(){
        //     // trigger
        //     vent.trigger('galleryController:deleteGallery', {model: this.model});
        // },

        destroyView: function(){
            this.close();
        },

        // onClose: function(){
        //     alert('close item');
        // }

    });
});