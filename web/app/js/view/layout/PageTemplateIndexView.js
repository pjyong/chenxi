define([
    'marionette', 
    'vent',
    'view/layout/PageTemplateItemView',
    'text!template/layout/PageTemplateIndex.html',
], function(
    Marionette,
    vent, 
    PageTemplateItemView,
    PageTemplateIndex
){

    return Marionette.CompositeView.extend({

        className: 'row-fluid',

        template: function(){
            // return _.template(ContentIndexTemplate, data, {variable: 'args'});
            return PageTemplateIndex;
        },

        ui: {
            // createContent: '#creat_content',
        },

        events: {
            'click #add_page_template': 'addPageTemplate'
        },        

        itemView: PageTemplateItemView,

        appendHtml: function(collectionView, itemView, index){
            var model = itemView.model;
            collectionView.$el.find('#' + model.get('contentType') + '_template_list' + ' .accordion-body').append(itemView.el);
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

            // save article collection
            // this.collection = this.options.collection;
            
        },

        addPageTemplate: function(){
            
            vent.trigger('pageTemplateController:editPageTemplate');
            
        },

      
        // render: function(){
        //     this.$el.html(this.template({type: this.contentTypeName}));
        // }

    });
});