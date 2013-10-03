define([
    'marionette',
    'app',
    'vent',
    'controller/AppController',
    'view/layout/TemplateColumnEditView',
    'model/layout/TemplateColumnModel',
    'repository/layout/PageTemplateRepository',
    'view/layout/PageTemplateAddColumnsView',
], function(
    Marionette,
    app,
    vent,
    AppController,
    TemplateColumnEditView,
    TemplateColumnModel,
    PageTemplateRepository,
    PageTemplateAddColumnsView
){

    return AppController.extend({

        initialize: function(){
            _.bindAll(this, 'editRow');
            vent.on('pageTemplateController:editRow', this.editRow);
            // vent.on('pageTemplateController:saveColumn', this.saveColumn);
        },

        

        addColumnsToPageTemplate: function(id){

            var that = this;
            // create repository
            var pageTemplateRepository = new PageTemplateRepository();
            var callback = function(pageTemplate){
                var pageTemplateAddColumns = new PageTemplateAddColumnsView({model: pageTemplate});
                that.contentRegion.show(pageTemplateAddColumns);
                that.endLoading();
            };
            that.startLoading();
            $.when(pageTemplateRepository.getPageTemplate(id)).then(callback);
            // alert(123);

        },

        // 添加行
        editRow: function(options){
            //
            var templateColumnEditView = new TemplateColumnEditView(options);
            this.loadModal(templateColumnEditView);
            
        },

        saveColumn: function(options){

        },

        onClose: function(){
            vent.off('pageTemplateController:editRow');
        }



    });
});