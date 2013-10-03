define([
    'marionette',
    'app',
    'vent',
    'controller/AppController',
    'view/layout/PageTemplateIndexView',
    'view/layout/PageTemplateEditView',
    'model/layout/PageTemplateModel',
    'repository/layout/PageTemplateRepository',
], function(
    Marionette,
    app,
    vent,
    AppController,
    PageTemplateIndexView,
    PageTemplateEditView,
    PageTemplateModel,
    PageTemplateRepository
){

    return AppController.extend({

        initialize: function(){
            _.bindAll(this, 'editPageTemplate', 'savePageTemplate');
            vent.on('pageTemplateController:editPageTemplate', this.editPageTemplate);
            vent.on('pageTemplateController:savePageTemplate', this.savePageTemplate);
        },

        getPageTemplates: function(){
            var that = this;
            var pageTemplateRepository = new PageTemplateRepository();
            var callback = function(pageTemplates){
                var pageTemplateIndexView = new PageTemplateIndexView({collection: pageTemplates});
                that.contentRegion.show(pageTemplateIndexView);
                that.endLoading();
                // $('[data-toggle="tooltip"]').tooltip();
            };
            that.startLoading();
            $.when(pageTemplateRepository.getPageTemplates()).then(callback);
        },

        editPageTemplate: function(){
            var pageTemplate = new PageTemplateModel();
            var pageTemplateEditView = new PageTemplateEditView({model: pageTemplate});
            this.loadModal(pageTemplateEditView);
        },

        savePageTemplate: function(options){
            var pageTemplate = options.model;
            var isNew = pageTemplate.isNew();
            var that = this;
            var pageTemplateRepository = new PageTemplateRepository();
            // console.log('start');
            var callback = function(pageTemplate){
                that.endLoading();
                $.gritter.add({
                    // (string | mandatory) the heading of the notification
                    title: '创建页面模板成功!',
                    // (string | mandatory) the text inside the notification
                    text: '',
                    class_name: 'gritter-success'
                });
                // close the modal
                that.closeModal();
                if(isNew){
                    // 转向添加列页面
                    Backbone.history.navigate('layout/templates/edit/' + pageTemplate.id, true);
                    // app.navigate('layout/templates/edit/' + pageTemplate.id);
                }else{

                }
            };
            that.startLoading();
            $.when(pageTemplateRepository.createPageTemplate(pageTemplate)).then(callback);
        },


        onClose: function(){
            vent.off('pageTemplateController:editPageTemplate');
            vent.off('pageTemplateController:savePageTemplate');
        }



    });
});