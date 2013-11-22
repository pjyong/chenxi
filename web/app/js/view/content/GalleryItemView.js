define([
    'marionette', 
    'vent',
    'text!template/content/gallery/GalleryItem.html',
], function(
    Marionette,
    vent, 
    GalleryItem
){

    return Marionette.ItemView.extend({

        className: 'gallery_item',
        

        template: function(data){
            return _.template(GalleryItem, data, {variable: 'args'});
        },

        events: {
            'click .delete': 'deleteGallery',
            'mouseover .cx-contents': 'showTools',
            'mouseout .cx-contents': 'hideTools'
        },

        initialize: function(){
            _.bindAll(this, 'deleteGallery');
            this.listenTo(this.options.model, 'destroy', this.destroyView);
        },

        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
        },

        deleteGallery: function(){
            // trigger
            vent.trigger('galleryController:deleteGallery', {model: this.model});
        },
        showTools: function(){
            this.$('.cx-tools').css('visibility', 'visible');
        },
        hideTools: function(){

            this.$('.cx-tools').css('visibility', 'hidden');
        },

        destroyView: function(){
            this.close();
        },

        // onClose: function(){
        //     alert('close item');
        // }

    });
});