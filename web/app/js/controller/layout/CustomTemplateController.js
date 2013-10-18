define([
    'marionette',
    'app',
    'vent',
    'controller/AppController',
    'view/layout/TemplateColumnEditView',
    'model/layout/TemplateColumnModel',
    'repository/layout/PageTemplateRepository',
    'repository/layout/TemplateColumnRepository',
    'repository/layout/BoxTypeRepository',
    'view/layout/PageTemplateAddColumnsView',
    'collection/layout/TemplateColumnCollection',
    'view/layout/PageTemplateRowView',
    'view/layout/PageTemplatePartView',
    'view/layout/PageTemplateColumnView',
    'view/layout/box/BoxTypeListView',
    'model/layout/TemplateColumnCollectionWrapper',
    'view/layout/TemplateColumnItemEditModalView',
    'view/layout/template/TemplateBoxView'
], function(
    Marionette,
    app,
    vent,
    AppController,
    TemplateColumnEditView,
    TemplateColumnModel,
    PageTemplateRepository,
    TemplateColumnRepository,
    BoxTypeRepository,
    PageTemplateAddColumnsView,
    TemplateColumnCollection,
    PageTemplateRowView,
    PageTemplatePartView,
    PageTemplateColumnView,
    BoxTypeListView,
    TemplateColumnCollectionWrapper,
    TemplateColumnItemEditModalView,
    TemplateBoxView
){
    function getColumnPartId(parentColumnId, pagePartId, columnCollection){
        // 获取新行索引
        var columns = columnCollection.where({parentColumnId:parentColumnId, pagePartId: pagePartId});
        var maxColumnPartId = 0;
        for(var key in columns){
            if(columns[key].get('columnPartId') > maxColumnPartId){
                maxColumnPartId = columns[key].get('columnPartId');
            }
        }
        return maxColumnPartId + 1;
    }


    function renderTemplateColumn(parentColumnId, currentColumn, pagePartId, columnCollection){
        if(parentColumnId == 0){
            var pageTemplateColumnView = new PageTemplatePartView();
        }else{
            var pageTemplateColumnView = new PageTemplateColumnView({model: currentColumn});
        }
        pageTemplateColumnView.render();
        // 得到所有的子列
        var columns = columnCollection.where({parentColumnId:parentColumnId, pagePartId: pagePartId});
        if(columns.length > 0){
            
            // 将上面得到的列按columnPartId分组，即行，并得到每行的总宽度
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
                key = parseInt(key);
                // 如果是0,创建行视图，带工具栏
                // if(parentColumnId == 0){
                    var templateRow = new PageTemplateRowView({columnPartId: key, pagePartId: pagePartId, parentColumnId: parentColumnId});
                    templateRow.render();
                    pageTemplateColumnView.$el.append(templateRow.$el);
                // }
                var totalWidth = widthGroup[key];
                for(var key in row){
                    var column = row[key];
                    // 设置宽度百分比
                    column.set('widthPercent', Math.floor((column.get('minWidth') * 100)/totalWidth) + '%');
                    // 如果当前的列是新的
                    if(column.isNew()){
                        var pid = column.cid;
                    }else{
                        var pid = column.get('id');
                    }
                    // 
                    // if(parentColumnId == 0){
                        templateRow.$el.children('.template_row_body').append(renderTemplateColumn(pid, column, pagePartId, columnCollection));  
                    // }else{
                        // pageTemplateColumnView.$('.template_column_body').append(renderTemplateColumn(pid, column, pagePartId, columnCollection));
                    // }
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
            _.bindAll(this, 'editRow', 'submitRow', 'saveTemplate', 'addColumnToRow', 'saveColumn');
            vent.on('CustomTemplateController:editRow', this.editRow);
            vent.on('CustomTemplateController:submitRow', this.submitRow);
            vent.on('CustomTemplateController:saveTemplate', this.saveTemplate);
            vent.on('CustomTemplateController:addColumnToRow', this.addColumnToRow);
            vent.on('CustomTemplateController:saveColumn', this.saveColumn);

            // vent.on('pageTemplateController:saveColumn', this.saveColumn);
        },

        

        addColumnsToPageTemplate: function(id){            
            id = parseInt(id);
            var that = this;
            // create repository
            this.pageTemplateId = id;
            var pageTemplateRepository = new PageTemplateRepository();
            var customTemplateRepository = new TemplateColumnRepository();
            var boxTypeRepository = new BoxTypeRepository();
            var callback = function(pageTemplate, columns, boxTypes){
                var pageTemplateAddColumns = new PageTemplateAddColumnsView({model: pageTemplate});
                that.contentRegion.show(pageTemplateAddColumns);
                that.columnCollection = columns;
                that.pageTemplateAddColumns = pageTemplateAddColumns;

                pageTemplateAddColumns.$('#template_header .page_part_area').html(renderTemplateColumn(0, {}, 1, columns));
                pageTemplateAddColumns.$('#template_body .page_part_area').html(renderTemplateColumn(0, {}, 2, columns));
                pageTemplateAddColumns.$('#template_footer .page_part_area').html(renderTemplateColumn(0, {}, 3, columns));

                // 插入工具栏
                var boxTypeListView = new BoxTypeListView({boxTypes: boxTypes});
                boxTypeListView.render();
                that.pageTemplateAddColumns.$el.append(boxTypeListView);
                that.fixPositionBoxesBar();
                $(window).scroll(function(){that.fixPositionBoxesBar();});
                that.pageTemplateAddColumns.$('.draggable-box').draggable({revert: true, helper: "clone"});
                that.pageTemplateAddColumns.$('.droppable-boxes').droppable({
                    greedy: true,
                    activeClass: "template-box-hover",
                    hoverClass: "template-box-active",
                    drop: function( event, ui ) {
                        var templateBoxView = new TemplateBoxView();
                        templateBoxView.render();
                        $(this).append(templateBoxView.$el);
                    }
                });

                that.pageTemplateAddColumns.$('.template_column_body').sortable({revert: true});
                that.pageTemplateAddColumns.$('.template_column_body').disableSelection();
                that.endLoading();
            };
            that.startLoading();
            $.when(pageTemplateRepository.getPageTemplate(id), customTemplateRepository.getTemplateColumns(id), boxTypeRepository.getBoxTypes()).then(callback);
            // alert(123);
        },

        fixPositionBoxesBar: function(){
            var vScrollPosition = $(document).scrollTop(); //retrieve the document scroll ToP position
            var bottomPart = this.pageTemplateAddColumns.$("#wn").height();
            this.pageTemplateAddColumns.$("#wn").stop().animate({"top": (($(window).height()-bottomPart+vScrollPosition- 90) + "px")}, "slow" );
        },

        // 添加一个区块视图
        addTemplateBox: function(){

        },

        // 提交添加行的表单
        submitRow: function(options){
            // 得到所有的行视图
            var rowViews = options.rowViews;
            var pagePartId = options.pagePartId;
            var parentColumnId = options.parentColumnId;
            // 得到columnPartId
            // 如果parentColumnId是零，则是头部添加行，否则是列添加行
            // if(parentColumnId == 0){
                var columnPartId = getColumnPartId(parentColumnId, pagePartId, this.columnCollection);
            // }
            for(var i = 0, length = rowViews.length; i < length; i ++){
                var child = rowViews[i];
                var childModel = child.model;
                // if(parentColumnId != 0){
                //     var columnPartId = getColumnPartId(parentColumnId, pagePartId, this.columnCollection); 
                // }
                childModel.set('minWidth', parseInt(child.$('.min_width_option').val()));
                childModel.set('canModify', child.$('.can_modify_option').val());
                childModel.set('cssCode', child.$('.css_code_option').val());
                childModel.set('columnPartId', columnPartId);

                console.log(childModel);
                // 添加进collection
                this.columnCollection.add(childModel);
            }

            console.log(this.columnCollection);

            // 重新渲染这部分的
            this.renderPagePart(pagePartId);
            this.closeModal();
        },

        // 保存页面模板
        saveTemplate: function(){
            var templateColumnCollectionWrapper = new TemplateColumnCollectionWrapper({columns: this.columnCollection});
            // 
            var that = this;
            this.startLoading();
            templateColumnCollectionWrapper.on('sync', function(model, response){
                // 同步collection
                that.columnCollection = new TemplateColumnCollection(response);
                that.endLoading();
                $.gritter.add({
                    // (string | mandatory) the heading of the notification
                    title: '保存页面模板成功!',
                    // (string | mandatory) the text inside the notification
                    text: '',
                    class_name: 'gritter-success'
                });

            });
            // 保存所有的列
            templateColumnCollectionWrapper.save();
            // 
        },

        // 添加列到行
        addColumnToRow: function(options){
            console.log(options);
            var newColumn = new TemplateColumnModel();
            newColumn.set('pageTemplateId', this.pageTemplateId);
            newColumn.set('pagePartId', options.pagePartId);
            newColumn.set('columnPartId', options.columnPartId);
            newColumn.set('parentColumnId', options.parentColumnId);

            var templateColumnItemEditModalView = new TemplateColumnItemEditModalView({model: newColumn});
            this.loadModal(templateColumnItemEditModalView);

        },

        // 顶级添加行
        editRow: function(options){
            //
            var templateColumnEditView = new TemplateColumnEditView(options);
            this.loadModal(templateColumnEditView);
            
        },


        saveColumn: function(options){
            // 添加到本地的
            console.log(options);
            this.columnCollection.add(options.model);
            this.renderPagePart(options.model.get('pagePartId'));
            this.closeModal();

        },

        renderPagePart: function(pagePartId){
            console.log(this.columnCollection);
            if(pagePartId == 1){
                this.pageTemplateAddColumns.$('#template_header .page_part_area').html(renderTemplateColumn(0, {}, pagePartId, this.columnCollection));

            }else if(pagePartId == 2){
                this.pageTemplateAddColumns.$('#template_body .page_part_area').html(renderTemplateColumn(0, {}, pagePartId, this.columnCollection));

            }else{
                this.pageTemplateAddColumns.$('#template_footer .page_part_area').html(renderTemplateColumn(0, {}, pagePartId, this.columnCollection));
                
            }
        },

        onClose: function(){
            vent.off('CustomTemplateController:editRow');
            vent.off('CustomTemplateController:submitRow');
            vent.off('CustomTemplateController:saveTemplate');
            vent.off('CustomTemplateController:saveColumn');
        }



    });
});