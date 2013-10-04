define([
    'marionette',
    'app',
    'vent',
    'controller/AppController',
    'view/layout/TemplateColumnEditView',
    'model/layout/TemplateColumnModel',
    'repository/layout/PageTemplateRepository',
    'repository/layout/TemplateColumnRepository',
    'view/layout/PageTemplateAddColumnsView',
    'collection/layout/TemplateColumnCollection',
    'view/layout/PageTemplateRowView',
    'view/layout/PageTemplatePartView',
    'view/layout/PageTemplateColumnView'
], function(
    Marionette,
    app,
    vent,
    AppController,
    TemplateColumnEditView,
    TemplateColumnModel,
    PageTemplateRepository,
    TemplateColumnRepository,
    PageTemplateAddColumnsView,
    TemplateColumnCollection,
    PageTemplateRowView,
    PageTemplateColumnView
){
    // 计算列的位置
    // function calculateColumnPart(columns, parentColumnId){
    //     for(var column in columns){
    //         // if(column.id)
    //     }

    // }

    function renderTemplatePage(columnCollection){
        var pageView = [];
        for(var i = 1; i <=3; i++){
            // 创建一个区域视图
            page[i] = new PageTemplatePartView();
            page[i].append(renderTemplateColumn(0, i, columnCollection));
        }
        return pageView;
    }


    function renderTemplateColumn(parentColumnId, pagePartId, columnCollection){
        // 得到所有的子列
        var columns = columnCollection.where({parentColumnId:parentColumnId});
        // 得到最大行数

        // columns = columns.sortedIndex(function(column){column.get('columnPartId')});
        columns = _.sortedIndex(columns, {}, 'columnPartId');
        console.log(columns);
        if(columns.length > 0){
            var pageTemplateColumnView = new PageTemplateColumnView();
            pageTemplateColumnView.render();
            console.log(pageTemplateColumnView);
            // 创建一个行视图
            var templateRow = new PageTemplateRowView();
            templateRow.render();
            pageTemplateColumnView.append(templateRow.$el);

            var initColumnPartId = 0;
            for(var column in columns){
                tempColumnPartId = column.get('columnPartId');
                if(tempColumnPartId == initColumnPartId){
                    // 再创建一个行视图
                    templateRow = new PageTemplateRowView();
                    templateRow.render();
                    pageTemplateColumnView.append(templateRow.$el);
                }
                templateRow.$el.append(renderTemplateColumn(column.get('parentColumnId'), pagePartId, columnCollection));
                initColumnPartId = tempColumnPartId;
            }
            return pageTemplateColumnView.$el;
        }

        return '';
    }



    // var columns = [
    //     {
    //         "id": "1",
    //         "pageTemplateId": "2",
    //         "pagePartId": "2",
    //         "columnPartId": "1",
    //         "parentColumnId": 0,
    //         "children": [
    //             {
    //                 "id": "3",
    //                 "pageTemplateId": "2",
    //                 "pagePartId": "2",
    //                 "columnPartId": "1",
    //                 "parentColumnId": 0,
    //                 "children": [
                        
    //                 ]
    //             },
    //             {
    //                 "id": "4",
    //                 "pageTemplateId": "2",
    //                 "pagePartId": "2",
    //                 "columnPartId": "2",
    //                 "parentColumnId": 0,
    //                 "children": [
                        
    //                 ]
    //             },
    //         ]
    //     },
    //     {
    //         "id": "2",
    //         "pageTemplateId": "2",
    //         "pagePartId": "2",
    //         "columnPartId": "1",
    //         "parentColumnId": "0",
    //         "children": [
    //             {
    //                 "id": "5",
    //                 "pageTemplateId": "2",
    //                 "pagePartId": "2",
    //                 "columnPartId": "1",
    //                 "parentColumnId": "2",
    //                 "children": [
                        
    //                 ]
    //             },
    //             {
    //                 "id": "6",
    //                 "pageTemplateId": "2",
    //                 "pagePartId": "2",
    //                 "columnPartId": "1",
    //                 "parentColumnId": "2",
    //                 "children": [
                        
    //                 ]
    //             },
    //         ]
    //     },
    // ];

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
            var customTemplateRepository = new TemplateColumnRepository();
            var callback = function(pageTemplate, columns){
                var pageTemplateAddColumns = new PageTemplateAddColumnsView({model: pageTemplate});
                
                pageTemplateAddColumns.$('#template_header .page_part_area').append(renderTemplateColumn(0, 1, columns));
                pageTemplateAddColumns.$('#template_body .page_part_area').append(renderTemplateColumn(0, 2, columns));
                pageTemplateAddColumns.$('#template_footer .page_part_area').append(renderTemplateColumn(0, 3, columns));


                that.contentRegion.show(pageTemplateAddColumns);
                that.endLoading();
            };
            that.startLoading();
            $.when(pageTemplateRepository.getPageTemplate(id), customTemplateRepository.getTemplateColumns(id)).then(callback);
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