define([
    'marionette', 
    'vent',
    'view/layout/TemplateColumnItemEditView'
], function(
    Marionette,
    vent,
    TemplateColumnItemEditView
){

    return Marionette.CollectionView.extend({

        // tagName: 'li',
        itemView: TemplateColumnItemEditView,

       

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