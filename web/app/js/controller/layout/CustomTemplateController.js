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
    PageTemplatePartView,
    PageTemplateColumnView
){
    // 计算列的位置
    // function calculateColumnPart(columns, parentColumnId){
    //     for(var column in columns){
    //         // if(column.id)
    //     }

    // }


    function compare(a, b, index) {
      if (a.columnPartId < b.columnPartId)
         return -1;
      if (a.columnPartId > b.columnPartId)
        return 1;
      return 0;
    }


    function renderTemplateColumn(parentColumnId, currentColumn, pagePartId, columnCollection){

        if(parentColumnId == 0){
            var pageTemplateColumnView = new PageTemplatePartView();
        }else{
            var pageTemplateColumnView = new PageTemplateColumnView({model: currentColumn});
        }
        pageTemplateColumnView.render();
        // 得到所有的子列
        var columns = columnCollection.where({parentColumnId:parentColumnId});
        // 得到最大行数

        // columns = columns.sortedIndex(function(column){column.get('columnPartId')});
        // columns = _.sortedIndex(columns, {}, 'columnPartId');
        // console.log(columns.sort(compare));
        // columns = columns.sort(compare);





        // console.log(columns);
        if(columns.length > 0){
            
            // 对这些列进行分组
            var group = [];
            var widthGroup = [];
            for(var key in columns){
                var column = columns[key];
                if(_.isUndefined(group[column.get('columnPartId')])){
                    group[column.get('columnPartId')] = [];
                    widthGroup[column.get('columnPartId')] = 0;
                }
                widthGroup[column.get('columnPartId')] += column.get('minWidth');
                group[column.get('columnPartId')].push(column);
            }


            for(var key in group){
                var row = group[key];
                // 创建一个行视图
                var templateRow = new PageTemplateRowView();
                templateRow.render();
                pageTemplateColumnView.$el.append(templateRow.$el);

                var totalWidth = widthGroup[key];
                for(var key in row){
                    var column = row[key];
                    // 设置宽度百分比
                    column.set('widthPercent', Math.floor((column.get('minWidth') * 100)/totalWidth) + '%');
                    templateRow.$el.append(renderTemplateColumn(column.get('id'), column, pagePartId, columnCollection));
                }
            }
        }
        // console.log('exit');
        return pageTemplateColumnView.$el;
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
                that.contentRegion.show(pageTemplateAddColumns);
                
                pageTemplateAddColumns.$('#template_header .page_part_area').append(renderTemplateColumn(0, {}, 1, columns));
                // pageTemplateAddColumns.$('#template_body .page_part_area').append(renderTemplateColumn(0, 2, columns));
                // pageTemplateAddColumns.$('#template_footer .page_part_area').append(renderTemplateColumn(0, 3, columns));


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