define([
    'marionette', 
    'vent',
    'view/content/ArticleItemView',
    'text!template/content/article/ArticleIndex.html',
], function(
    Marionette,
    vent, 
    ArticleItemView,
    ArticleIndex
){

    return Marionette.CompositeView.extend({

        className: 'row-fluid',

        template: function(){
            // return _.template(ContentIndexTemplate, data, {variable: 'args'});
            return ArticleIndex;
        },

        ui: {
            // createContent: '#creat_content',
        },

        events: {
            'click #creat_content': 'createContent',
            
        },        

        itemView: ArticleItemView,

        appendHtml: function(collectionView, itemView, index){
            collectionView.$("#article_list_div").append(itemView.el);
        },


        initialize: function(){

            // this.contentType = this.options.type;

            // // get information about contentType
            // if(this.contentType === 'article'){
            //     this.contentTypeName = '文章';
            // }else if(this.contentType === 'page'){
            //     this.contentTypeName = '页面';
            // }
            
            // alert(options.type);

            // save article collection
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