define([
    'marionette', 
    'vent',
    'text!template/layout/PageTemplateRow.html',
], function(
    Marionette,
    vent,
    PageTemplateRow
){

    return Marionette.ItemView.extend({

        // tagName: 'li',

        className: 'page_template_row widget-box no-border',
        
        template: function(){
            return PageTemplateRow;
        },
        

        events: {
            // 'click .add_column_to_row': 'addColumnToRow'
        },

        initialize: function(){
            // _.bindAll(this);
            this.columnPartId = this.options.columnPartId;
            this.pagePartId = this.options.pagePartId;
            this.parentColumnId = this.options.parentColumnId;
            // _.bind(this.editImage, this);
            // console.log(this.model);
            // this.listenTo(this.options.model, 'destroy', this.destroyView);
        },

        render: function(){
            this.$el.html(this.template());
            this.$('[data-toggle="tooltip"]').tooltip();
            var event = {columnPartId: this.columnPartId, pagePartId: this.pagePartId, parentColumnId: this.parentColumnId};
            this.$('.add_column_to_row').on('click', event, this.addColumnToRow);
        },

        addColumnToRow: function(event){
            // console.log(data);
            // console.log();
            vent.trigger('CustomTemplateController:addColumnToRow', {columnPartId: event.data.columnPartId, pagePartId: event.data.pagePartId, parentColumnId: event.data.parentColumnId});
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