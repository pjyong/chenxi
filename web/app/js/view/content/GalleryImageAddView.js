define([
    'marionette', 
    'text!template/content/gallery/GalleryImageAdd.html',
    'vent',
], function(
    Marionette, 
    GalleryImageAdd,
    vent
){

    return Marionette.Layout.extend({

        className: 'row',
        template: function(data){
            return _.template(GalleryImageAdd, data, {variable: 'args'});
        },

        ui: {
            // createContent: '#creat_content',
        },

        events: {
           
        },        

        regions: {
            
        },

        initialize: function(){
            this.gallery = this.options.gallery;

            // this.contentType = this.options.type;

            // get information about contentType
            // if(this.contentType === 'gallery'){
            //     this.contentTypeName = '文章';
            // }else if(this.contentType === 'page'){
            //     this.contentTypeName = '页面';
            // }
            // alert(options.type);




        },

        render: function(){
            console.log(this.gallery);
            this.$el.html(this.template(this.gallery.toJSON()));
        }

    });
});