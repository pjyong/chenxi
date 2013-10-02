define([
    'marionette', 
    'vent',
    'text!template/layout/PageTemplateAddColumns.html',
], function(
    Marionette,
    vent, 
    PageTemplateAddColumns
){

    return Marionette.ItemView.extend({

        // tagName: 'li',
        

        template: function(data){
            return _.template(PageTemplateAddColumns, data, {variable: 'args'});
        },

        events: {
            'click #add_to_header': 'addColumnsToHeader',
            'click #add_to_body': 'addColumnsToBody',
            'click #add_to_footer': 'addColumnsToFooter'
        },

        initialize: function(){
            _.bindAll(this, 'savePageTemplate', 'addColumnsToHeader', 'addColumnsToBody', 'addColumnsToFooter');
            // _.bind(this.editImage, this);
            // console.log(this.model);
            // this.listenTo(this.options.model, 'destroy', this.destroyView);
        },

        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
        },

        savePageTemplate: function(){
            // var imageName = this.$('#image_name').val();
            var pageTemplateName = this.$('#page_template_name').val();
            var contentType = this.$('#content_type_option').val();
            var isPrimary = this.$('.is_primary_option:checked').val() == '1' ? true : false;
            this.model.set('name', pageTemplateName);
            this.model.set('contentType', contentType);
            this.model.set('isPrimary', isPrimary);
            vent.trigger('pageTemplateController:savePageTemplate', {model: this.model});
            
        },

        addColumnsToHeader: function(){
            vent.trigger('pageTemplateController:editRow', {pagePartId: 1, pageTemplateId: this.model.get('id')});
        },

        addColumnsToBody: function(){
            vent.trigger('pageTemplateController:editRow', {pagePartId: 2, pageTemplateId: this.model.get('id')});
        },

        addColumnsToFooter: function(){
            vent.trigger('pageTemplateController:editRow', {pagePartId: 3, pageTemplateId: this.model.get('id')});

        }

      

    });
});