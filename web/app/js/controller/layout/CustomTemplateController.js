define([
    'marionette',
    'app',
    'vent',
    'controller/AppController',
    'view/layout/TemplateColumnEditView',
    'model/layout/TemplateColumnModel',
    'repository/layout/PageTemplateRepository',
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

    function renderColumns(columnCollection){
        for(var i = 1; i <=3; i++){
            // 创建一个区域视图
            page[i] = new PageTemplatePartView();
            // 得到顶级列pagePartId=i, parentColumnId=0
            var columns = columnCollection.where({pagePartId: i, parentColumnId:0});
            // 得到最大行数
            columns = columns.sortBy(function(column){column.get('columnPartId')});
            if(columns.length > 0){
                // 创建一个行视图
                var templateRow = new PageTemplateRowView();
                page[i].append(templateRow.$el);

                var initColumnPartId = 0;
                for(var column in columns){
                    tempColumnPartId = column.get('columnPartId');
                    // 创建一个列视图
                    var templateColumn = new PageTemplateColumnView();

                    if(tempColumnPartId == initColumnPartId){
                        // 再创建一个行视图
                        templateRow = new PageTemplateRowView();
                        page[i].append(templateRow.$el);
                    }
                    templateRow.$el.append(templateColumn);
                    initColumnPartId = tempColumnPartId;
                }


            }
            
            var initColumnPartId = 1;

            do{

            }while();

        }
    }


    function renderTemplateColumn(templateColumn){
        var wholeView = $('<div></div>');

        var columnPartId = templateColumn.get('columnPartId');
        var parentColumnId = templateColumn.get('parentColumnId');
        // 得到所有的子列
        var columns = columnCollection.where({parentColumnId:parentColumnId});
        // 得到最大行数
        columns = columns.sortBy(function(column){column.get('columnPartId')});
        if(columns.length > 0){
            // 创建一个行视图
            var templateRow = new PageTemplateRowView();
            wholeView.append(templateRow.$el);

            var initColumnPartId = 0;
            for(var column in columns){
                tempColumnPartId = column.get('columnPartId');
                if(tempColumnPartId == initColumnPartId){
                    // 再创建一个行视图
                    templateRow = new PageTemplateRowView();
                    page[i].append(templateRow.$el);
                }
                templateRow.$el.append(renderTemplateColumn(column));
                initColumnPartId = tempColumnPartId;
            }
        }
        return wholeView;
    }



    var columns = [
        {
            "id": "1",
            "pageTemplateId": "2",
            "pagePartId": "2",
            "columnPartId": "1",
            "parentColumnId": 0,
            "children": [
                {
                    "id": "3",
                    "pageTemplateId": "2",
                    "pagePartId": "2",
                    "columnPartId": "1",
                    "parentColumnId": 0,
                    "children": [
                        
                    ]
                },
                {
                    "id": "4",
                    "pageTemplateId": "2",
                    "pagePartId": "2",
                    "columnPartId": "2",
                    "parentColumnId": 0,
                    "children": [
                        
                    ]
                },
            ]
        },
        {
            "id": "2",
            "pageTemplateId": "2",
            "pagePartId": "2",
            "columnPartId": "1",
            "parentColumnId": "0",
            "children": [
                {
                    "id": "5",
                    "pageTemplateId": "2",
                    "pagePartId": "2",
                    "columnPartId": "1",
                    "parentColumnId": "2",
                    "children": [
                        
                    ]
                },
                {
                    "id": "6",
                    "pageTemplateId": "2",
                    "pagePartId": "2",
                    "columnPartId": "1",
                    "parentColumnId": "2",
                    "children": [
                        
                    ]
                },
            ]
        },
    ];

    return AppController.extend({

        initialize: function(){
            _.bindAll(this, 'editRow');
            vent.on('pageTemplateController:editRow', this.editRow);
            this.columns = [];
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