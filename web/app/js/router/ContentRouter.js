define([
    'marionette',
    'app',
    'controller/ContentController'
], function(
    Marionette,
    app,
    ContentController
){
    var contentRouter = Backbone.Router.extend({

        routes: {
            'content/article': 'getArticles',
            'content/article/edit/:id': 'editArticle',
            'content/article/add': 'editArticle',
            'content/page': 'loadPages',
            'content/page/add': 'createPage',
        },

        before: function(){
            app.startSubApp('m.content');
        },

        after: function(){
            
        },

        getArticles: function(){
            app.module('sidebar').controller.activeNav({nav: '#/content/article'});
            app.module('m.content').controller.getArticles();
        },

        editArticle: function(id){
            app.module('sidebar').controller.activeNav({nav: '#/content/article'});
            app.module('m.content').controller.editArticle(id);  
        },

        loadPages: function(){
            app.module('m.content').controller.loadPages();
        },

        createPage: function(){
            app.module('m.content').controller.createContent({type: 'page'});
        },

    });  

    return contentRouter;
});