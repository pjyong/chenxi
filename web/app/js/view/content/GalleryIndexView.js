define([
    'marionette', 
    'vent',
    'view/content/GalleryItemView',
    'text!template/content/gallery/GalleryIndex.html',
], function(
    Marionette,
    vent, 
    GalleryItemView,
    GalleryIndex
){

    return Marionette.CompositeView.extend({

        className: 'row-fluid',

        template: function(){
            // return _.template(ContentIndexTemplate, data, {variable: 'args'});
            return GalleryIndex;
        },

        ui: {
            // createContent: '#creat_content',
        },

        events: {
            'click #creat_content': 'createContent'
        },        

        itemView: GalleryItemView,

        appendHtml: function(collectionView, itemView, index){
            collectionView.$("tbody").append(itemView.el);
        },

        initialize: function(){

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
            
        },

        createContent: function(){
            // vent.trigger('contentModule:createContent', {type: this.contentType});
        },

        // render: function(){
        //     this.$el.html(this.template({type: this.contentTypeName}));
        // }

    });
});