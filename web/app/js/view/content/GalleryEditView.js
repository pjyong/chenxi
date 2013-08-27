define([
    'marionette', 
    'text!template/content/gallery/GalleryEdit.html',
    'vent',
], function(
    Marionette, 
    GalleryEdit,
    vent
){

    return Marionette.Layout.extend({

        className: 'row-fluid',
        template: function(data){
            return _.template(GalleryEdit, data, {variable: 'args'});
        },

        ui: {
            // createContent: '#creat_content',
        },

        events: {
            'click .publish': 'publishGallery',
            'change .tags': 'modCheckboxTag',
            'click .media_library': 'showMediaLibrary'
        },        

        regions: {
            
        },

        initialize: function(){
            _.bindAll(this, 'publishGallery', 'modCheckboxTag', 'showMediaLibrary');
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
            this.$el.html(this.template(this.model.toJSON()));
        },

        publishGallery: function(){
            // get submitted information
            this.model.set('title', this.$('#content_title').val());
            var content_date = this.$('#content_date').val();
            // var date_array = content_date.split('-');
            // this.model.set('start_date', date_array[0]);
            // this.model.set('end_date', date_array[1]);
            this.model.set('created_date', content_date);
            this.model.set('description', CKEDITOR.instances.content_body.getData());

            // bind tags data
            // this.model.set('tags', this.$('.tags').val());
            
            // verify

            // trigger submit action
            vent.trigger('galleryController:submitGallery', {model: this.model});
        },

        showMediaLibrary: function(){
            vent.trigger('galleryController:loadMediaLibrary');
        },

        modCheckboxTag: function(e){
            var currentObj = $(e.currentTarget);
            console.log(currentObj.val());
            if(currentObj.val() == ''){
                // uncheck
                this.checkOption(this.$('.tag_label'));
            }else{
                // check
                this.uncheckOption(this.$('.tag_label'));
            }
        },

        checkOption: function(el){
            el.find('i').replaceWith('<i class="icon-check"></i>');
        },

        uncheckOption: function(el){
            el.find('i').replaceWith('<i class="icon-edit"></i>');

        }

    });
});