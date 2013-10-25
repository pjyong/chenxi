define([
    'marionette',
    'app',
    'vent',
    'controller/AppController',

    'model/layout/TemplateBoxModel',
    'model/layout/TemplateColumnModel',
    'model/layout/TemplateColumnCollectionWrapper',
    
    'collection/layout/TemplateColumnCollection',

    'repository/layout/PageTemplateRepository',
    'repository/layout/TemplateColumnRepository',
    'repository/layout/TemplateBoxRepository',
    'repository/layout/BoxTypeRepository',
    
    'view/layout/TemplateColumnEditView',
    'view/layout/PageTemplateRowView',
    'view/layout/PageTemplatePartView',
    'view/layout/PageTemplateColumnView',
    'view/layout/box/BoxTypeListView',
    'view/layout/template/TemplateBoxView',
    'view/layout/PageTemplateAddColumnsView',
    'view/layout/template/TemplateBoxSettingView',
    'view/layout/TemplateColumnItemEditModalView',
], function(
    Marionette,
    app,
    vent,
    AppController,

    TemplateBoxModel,
    TemplateColumnModel,
    TemplateColumnCollectionWrapper,

    TemplateColumnCollection,

    PageTemplateRepository,
    TemplateColumnRepository,
    TemplateBoxRepository,
    BoxTypeRepository,

    TemplateColumnEditView,
    PageTemplateRowView,
    PageTemplatePartView,
    PageTemplateColumnView,
    BoxTypeListView,
    TemplateBoxView,
    PageTemplateAddColumnsView,
    TemplateBoxSettingView,
    TemplateColumnItemEditModalView
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


    function renderTemplateColumn(parentColumnId, currentColumn, pagePartId, columnCollection, boxCollection, boxTypeCollection){
        if(parentColumnId == 0){
            var pageTemplateColumnView = new PageTemplatePartView();
            pageTemplateColumnView.render();
        }else{
            var pageTemplateColumnView = new PageTemplateColumnView({model: currentColumn});
            pageTemplateColumnView.render();
            // 如果该列有区块
            var boxes = boxCollection.where({columnTemplateId: currentColumn.get('id')});
            for(var key in boxes){
                // 
                var templateBox = boxes[key];
                templateBox.set('boxType', boxTypeCollection.findWhere({id: templateBox.get('boxTypeId')}));
                var templateBoxView = new TemplateBoxView({model: boxes[key]});

                templateBoxView.render();
                pageTemplateColumnView.$('.droppable-boxes').append(templateBoxView.$el);
            }
        }
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
                        templateRow.$el.children('.template_row_body').append(renderTemplateColumn(pid, column, pagePartId, columnCollection, boxCollection, boxTypeCollection));  
                    // }else{
                        // pageTemplateColumnView.$('.template_column_body').append(renderTemplateColumn(pid, column, pagePartId, columnCollection));
                    // }
                }
            }
        }
        return pageTemplateColumnView.$el;
    }

    return AppController.extend({

        initialize: function(){
            _.bindAll(this, 'editRow', 'submitRow', 'saveTemplate', 'addColumnToRow', 'saveColumn', 'editBoxSetting', 'saveBoxSetting');
            vent.on('CustomTemplateController:editRow', this.editRow);
            vent.on('CustomTemplateController:submitRow', this.submitRow);
            vent.on('CustomTemplateController:saveTemplate', this.saveTemplate);
            vent.on('CustomTemplateController:addColumnToRow', this.addColumnToRow);
            vent.on('CustomTemplateController:saveColumn', this.saveColumn);
            vent.on('CustomTemplateController:editBoxSetting', this.editBoxSetting);
            vent.on('CustomTemplateController:saveBoxSetting', this.saveBoxSetting);

            // vent.on('pageTemplateController:saveColumn', this.saveColumn);
        },

        
        // 编辑页面模板
        addColumnsToPageTemplate: function(id){            
            id = parseInt(id);
            var that = this;
            // create repository
            this.pageTemplateId = id;
            var pageTemplateRepository = new PageTemplateRepository();
            var customTemplateRepository = new TemplateColumnRepository();
            var boxTypeRepository = new BoxTypeRepository();
            var templateBoxRepository = new TemplateBoxRepository();
            var callback = function(pageTemplate, columns, boxTypes){
                var pageTemplateAddColumns = new PageTemplateAddColumnsView({model: pageTemplate});
                that.contentRegion.show(pageTemplateAddColumns);

                // 存储所有的区块
                that.boxCollection = columns.templateBoxCollection;
                delete columns.templateBoxCollection;
                // 存储所有的模板列
                that.columnCollection = columns;
                // 存储所有的区块类型
                that.boxTypeCollection = boxTypes;
                

                that.pageTemplateAddColumns = pageTemplateAddColumns;

                // 插入工具栏
                var boxTypeListView = new BoxTypeListView({boxTypes: boxTypes});
                boxTypeListView.render();
                that.pageTemplateAddColumns.$el.append(boxTypeListView.$el);
                that.fixPositionBoxesBar();
                $(window).scroll(function(){that.fixPositionBoxesBar();});

                that.renderPagePart(1);
                that.renderPagePart(2);
                that.renderPagePart(3);
                
                // 初始化页面的drag和drop
                that.initDrag();
                
                that.endLoading();
            };
            that.startLoading();
            $.when(pageTemplateRepository.getPageTemplate(id), customTemplateRepository.getTemplateColumns(id), boxTypeRepository.getBoxTypes()).then(callback);
        },

        initDrag: function(){
            this.pageTemplateAddColumns.$('.draggable-box').draggable({revert: true, helper: "clone"});
        },

        initDrop: function(jqObj){
            var that = this;
            jqObj.find('.droppable-boxes').droppable({
                greedy: true,
                accept: '.draggable-box',
                activeClass: "template-box-hover",
                hoverClass: "template-box-active",
                drop: function( event, ui ) {
                    // 如果该模板中有未保存的列，则提示用户先保存模板，然后再添加列
                    var showMsg = false;
                    var currentColumnUI = $(this);
                    var templateColumnId = currentColumnUI.attr('templatecolumnid');
                    if(templateColumnId == ''){
                        showMsg = true;
                    }
                    if(showMsg){
                        $.gritter.add({
                            // (string | mandatory) the heading of the notification
                            title: '',
                            // (string | mandatory) the text inside the notification
                            text: '请先保存模板，再添加区块。',
                            class_name: 'gritter-warning',
                        });
                    }else{
                        // 获得列的ID
                        // 如果拖动的是列里的区块，那么不要再创建区块
                        // if(_.isUndefined(ui.draggable.parent().attr('templatecolumnid'))){
                            // 生成templateBox视图
                            var boxTypeId = parseInt(ui.draggable.attr('boxtypeid'));
                            var templateBox = new TemplateBoxModel();
                            // 添加到本地变量
                            that.boxCollection.add(templateBox);
                            templateBox.set('columnTemplateId', templateColumnId);
                            templateBox.set('boxTypeId', boxTypeId);
                            // var boxTypeRepository = new BoxTypeRepository();
                            // var callback2 = function(boxType){

                            var boxType = that.boxTypeCollection.findWhere({id: boxTypeId});
                            // console.log(that.boxTypeCollection);
                            // console.log(boxType);

                            templateBox.set({boxType: boxType});
                            templateBox.set('formStr', boxType.get('formStr'));
                            var templateBoxView = new TemplateBoxView({model: templateBox});
                            templateBoxView.render();
                            currentColumnUI.append(templateBoxView.$el);
                            // 弹出区块配置
                            that.editBoxSetting({templateBox: templateBox});
                        // }
                        // };
                        // $.when(boxTypeRepository.getBoxType(boxTypeId)).then(callback2);
                    }
                }
            });

            jqObj.find('.template_column_body').sortable().disableSelection();
        },

        // 修正区块工具栏的页面位置
        fixPositionBoxesBar: function(){
            var vScrollPosition = $(document).scrollTop(); //retrieve the document scroll ToP position
            var bottomPart = this.pageTemplateAddColumns.$("#wn").height();
            this.pageTemplateAddColumns.$("#wn").stop().animate({"top": (($(window).height()-bottomPart+vScrollPosition- 90) + "px")}, "slow" );
        },

        // 添加一个区块视图
        addTemplateBox: function(){

        },

        // 保存行到本地，并重新渲染该行所属的部分(页头/页体/页尾)
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

                // 添加进collection
                this.columnCollection.add(childModel);
            }

            // 重新渲染这部分的
            this.renderPagePart(pagePartId);
            this.closeModal();
        },

        // 保存模板，并同步到服务器
        saveTemplate: function(){
            var templateColumnCollectionWrapper = new TemplateColumnCollectionWrapper({columns: this.columnCollection, /*boxes: this.boxCollection*/});
            // 
            var that = this;
            this.startLoading();
            templateColumnCollectionWrapper.on('sync', function(model, response){
                // 同步collection
                // that.columnCollection = new TemplateColumnCollection(response);
                that.addColumnsToPageTemplate(response.pageTemplateId);
                // that.endLoading();
                $.gritter.add({
                    // (string | mandatory) the heading of the notification
                    title: '',
                    // (string | mandatory) the text inside the notification
                    text: '模板保存成功。',
                    class_name: 'gritter-success'
                });

            });
            // 保存所有的列
            templateColumnCollectionWrapper.save();

        },

        // 添加列给行，加载视图
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

        // 添加行给页头/页体/页尾，加载视图
        editRow: function(options){
            var templateColumnEditView = new TemplateColumnEditView(options);
            this.loadModal(templateColumnEditView);
            
        },

        // 保存列到本地，并刷新该列所属的部分(页头/页体/页尾)
        saveColumn: function(options){
            // 添加到本地的
            this.columnCollection.add(options.model);
            this.renderPagePart(options.model.get('pagePartId'));
            this.closeModal();

        },

        // 渲染页面
        renderPagePart: function(pagePartId){
            if(pagePartId == 1){
                var page_part_area = this.pageTemplateAddColumns.$('#template_header .page_part_area');
            }else if(pagePartId == 2){
                var page_part_area = this.pageTemplateAddColumns.$('#template_body .page_part_area');
            }else{
                var page_part_area = this.pageTemplateAddColumns.$('#template_footer .page_part_area');
            }
            page_part_area.html(renderTemplateColumn(0, {}, pagePartId, this.columnCollection, this.boxCollection, this.boxTypeCollection));
            this.initDrop(page_part_area);
        },

        // 编辑模板区块设置，加载视图
        editBoxSetting: function(options){
            var templateBox = options.templateBox;
            var templateBoxSettingView = new TemplateBoxSettingView({model: templateBox});
            this.loadModal(templateBoxSettingView);
        },

        // 保存区块到服务器
        saveBoxSetting: function(options){
            var that = this;
            var templateBox = options.templateBox;
            var templateBoxRepository = new TemplateBoxRepository();
            var callback = function(model){
                that.endLoading();
                that.closeModal();
                templateBox.set('id', model.get('id'));
                templateBox.set('formStr', model.get('formStr'));
                $.gritter.add({
                    title: '',
                    text: '保存区块成功。',
                    class_name: 'gritter-success'
                });
            };
            that.startLoading();
            $.when(templateBoxRepository.createTemplateBox(templateBox)).then(callback);
        },

        // 
        onClose: function(){
            vent.off('CustomTemplateController:editRow');
            vent.off('CustomTemplateController:submitRow');
            vent.off('CustomTemplateController:saveTemplate');
            vent.off('CustomTemplateController:saveColumn');
            vent.off('CustomTemplateController:editBoxSetting');
        }
    });
});