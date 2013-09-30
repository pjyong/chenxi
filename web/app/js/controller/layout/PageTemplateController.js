define([
    'marionette',
    'vent',
    'controller/AppController',
    'view/layout/PageTemplateIndexView',
    'view/layout/PageTemplateEditView'
], function(
    Marionette,
    vent,
    AppController,
    PageTemplateIndexView,
    PageTemplateEditView
){

    return AppController.extend({

        initialize: function(){
            _.bindAll(this, 'editPageTemplate', 'savePageTemplate');
            vent.on('pageTemplateController:editPageTemplate', this.editPageTemplate);
            vent.on('pageTemplateController:savePageTemplate', this.savePageTemplate);
        },

        getPageTemplates: function(){
            var pageTemplateIndexView = new PageTemplateIndexView();
            this.contentRegion.show(pageTemplateIndexView);     
        },

        editPageTemplate: function(){
            var pageTemplate = {};
            var pageTemplateEditView = new PageTemplateEditView({model: pageTemplate});
            this.loadModal(pageTemplateEditView);
        },

        savePageTemplate: fucntion(options){
            var pageTemplate = options.model;
            var isNew = pageTemplate.isNew();
            
            if(isNew){
                // 转向添加列页面

            }else{

            }
        },

        onClose: function(){
            vent.off('pageTemplateController:editPageTemplate');
        }



    });
});