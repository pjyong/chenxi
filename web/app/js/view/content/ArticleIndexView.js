define([
    'marionette', 
    'vent',
    'text!template/content/article/ArticleIndex.html',
], function(
    Marionette,
    vent, 
    ArticleIndex
){

    return Marionette.Layout.extend({

        className: 'row-fluid',

        template: function(){
            // return _.template(ContentIndexTemplate, data, {variable: 'args'});
            return ArticleIndex;
        },

        ui: {
            // createContent: '#creat_content',
        },

        events: {
            'click #creat_content': 'createContent'
        },        

        regions: {
            
        },

        initialize: function(){
            // this.contentType = this.options.type;

            // // get information about contentType
            // if(this.contentType === 'article'){
            //     this.contentTypeName = '文章';
            // }else if(this.contentType === 'page'){
            //     this.contentTypeName = '页面';
            // }
            // _.bindAll(this, 'createContent');
            // alert(options.type);
        },

        createContent: function(){
            // vent.trigger('contentModule:createContent', {type: this.contentType});
        },

        // render: function(){
        //     this.$el.html(this.template({type: this.contentTypeName}));
        // }

    });
});