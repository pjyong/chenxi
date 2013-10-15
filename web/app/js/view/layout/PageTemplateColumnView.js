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
        
        template: function(data){
            return _.template(PageTemplateColumn, data, {variable: 'args'});
        },
        

        events: {
            // 'click .add_row_to_column': 'addRowToColumn'
        },

        initialize: function(){
            _.bindAll(this);
            this.model = this.options.model;
            // _.bind(this.editImage, this);
            // console.log(this.model);
            // this.listenTo(this.options.model, 'destroy', this.destroyView);
            // console.log(this.model.get('id'));
        },

        render: function(){
            this.$el.attr('style', 'width:' + this.model.get('widthPercent') + ';');
            this.$el.html(this.template(this.model.toJSON()));
            this.$('[data-toggle="tooltip"]').tooltip();
            // 如果这个列是个新的model，那么将他的cid作为新添加的列的父id
            if(this.model.isNew()){
                var parentColumnId = this.model.cid;
            }else{
                var parentColumnId = this.model.get('id');
            }
            var event = {pagePartId: this.model.get('pagePartId'), parentColumnId: parentColumnId, pageTemplateId: this.model.get('pageTemplateId')};
            this.$el.find('.add_row_to_column').on('click', event, this.addRowToColumn);
        },

        addRowToColumn: function(event){
            vent.trigger('CustomTemplateController:editRow', {pagePartId: event.data.pagePartId, parentColumnId: event.data.parentColumnId, pageTemplateId: event.data.pageTemplateId});
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