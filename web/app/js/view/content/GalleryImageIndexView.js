define([
    'marionette', 
    'vent',
    'view/content/GalleryImageItemView',
    'text!template/content/gallery/GalleryImageIndex.html',
], function(
    Marionette,
    vent, 
    GalleryImageItemView,
    GalleryImageIndex
){

    return Marionette.CompositeView.extend({

        className: 'row-fluid',

        template: function(){
            // console.log(this.gallery);
            var data = this.gallery.toJSON();
            return _.template(GalleryImageIndex, data, {variable: 'gallery'});
        },

        ui: {
            // createContent: '#creat_content',
        },

        events: {
            // 'click #creat_content': 'createContent'
        },        

        

        itemView: GalleryImageItemView,

        appendHtml: function(collectionView, itemView, index){
            collectionView.$("#gallery_image_list").append(itemView.el);
        },

        initialize: function(){

            this.gallery = this.options.gallery;
            _.bindAll(this, 'template');
            // this.collection = this.options.collection;
            // console.log(this.options.collection);
            // this.contentType = this.options.type;

            // // get information about contentType
            // if(this.contentType === 'gallery'){
            //     this.contentTypeName = '文章';
            // }else if(this.contentType === 'page'){
            //     this.contentTypeName = '页面';
            // }
            // _.bindAll(this, 'createContent');
            // alert(options.type);

            // save gallery collection
            // this.collection = this.options.collection;
            // this.render();
        },

        createContent: function(){
            // vent.trigger('contentModule:createContent', {type: this.contentType});
        },

    });
});