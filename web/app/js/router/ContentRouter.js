define([
    'marionette',
    'app',
], function(
    Marionette,
    app
){
    return Backbone.Router.extend({

        routes: {
            'content/article': 'getArticles',
            'content/article/edit/:id': 'editArticle',
            'content/article/add': 'editArticle',
            'content/page': 'getPages',
            'content/page/add': 'editPage',
            'content/gallery': 'getGalleries',
            'content/gallery/edit/:id': 'editGallery',
            'content/gallery/add': 'editGallery',
            'content/gallery/:galleryId/image': 'getGalleryImages',
            'content/gallery/:galleryId/image/add': 'addGalleryImage'
        },

        before: function(){
            app.startSubApp('m.content');
        },

        after: function(){
            
        },

        getArticles: function(){
            app.module('sidebar').controller.activeNav({nav: '#content/article'});
            // app.module('m.content').controller.getArticles();
            app.module('m.content').loadController('article').getArticles();
            // console.log(app.module('m.content').controller.test());
        },

        editArticle: function(id){
            app.module('sidebar').controller.activeNav({nav: '#content/article'});
            app.module('m.content').loadController('article').editArticle(id);
            // app.module('m.content').controller.editArticle(id);  
        },

        getPages: function(){
            app.module('sidebar').controller.activeNav({nav: '#content/page'});
            app.module('m.content').loadController('page').getPages();
        },

        editPage: function(id){
            app.module('sidebar').controller.activeNav({nav: '#content/page'});
            app.module('m.content').loadController('page').editPage(id);
        },

        getGalleries: function(){
            app.module('sidebar').controller.activeNav({nav: '#content/gallery'});
            app.module('m.content').loadController('gallery').getGalleries();
        },

        editGallery: function(id){
            app.module('sidebar').controller.activeNav({nav: '#content/gallery'});
            app.module('m.content').loadController('gallery').editGallery(id);

        },

        getGalleryImages: function(galleryId){
            app.module('sidebar').controller.activeNav({nav: '#content/gallery'});
            app.module('m.content').loadController('gallery').getImages(galleryId);
        },

        addGalleryImage: function(galleryId){
            app.module('sidebar').controller.activeNav({nav: '#content/gallery'});
            app.module('m.content').loadController('gallery').addGalleryImage(galleryId);

        },

    });  
});