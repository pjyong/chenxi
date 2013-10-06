define([
    'marionette', 
    'vent',
    'text!template/layout/PageTemplateColumn.html',
], function(
    Marionette,
    vent,
    PageTemplateColumn
){

    return Marionette.ItemView.extend({

        // tagName: 'li',

        className: 'page_template_column',
        
        template: function(){
            // return _.template(ContentIndexTemplate, data, {variable: 'args'});
            return PageTemplateColumn;
        },
        

        events: {
            // 'click .template_save': 'savePageTemplate'
        },

        initialize: function(){
            // _.bindAll(this, 'savePageTemplate');
            // _.bind(this.editImage, this);
            // console.log(this.model);
            // this.listenTo(this.options.model, 'destroy', this.destroyView);
            // console.log(this.model.get('id'));
        },

        render: function(){
            this.$el.attr('style', 'width:' + this.model.get('widthPercent') + ';');
            this.$el.html(this.template());
        }

        

        // savePageTemplate: function(){
        //     // var imageName = this.$('#image_name').val();
        //     var pageTemplateName = this.$('#page_template_name').val();
        //     var contentType = this.$('#content_type_option').val();
        //     var isPrimary = this.$('.is_primary_option:checked').val() == '1' ? true : false;
        //     this.model.set('name', pageTemplateName);
        //     this.model.set('contentType', contentType);
        //     this.model.set('isPrimary', isPrimary);
        //     vent.trigger('pageTemplateController:savePageTemplate', {model: this.model});
            
        // }



    });
});