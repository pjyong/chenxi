define([
    'marionette', 
    'vent',
    'view/layout/TemplateColumnItemEditView',
    'text!template/layout/TemplateColumnEdit.html',
    'collection/layout/TemplateColumnCollection',
    'model/layout/TemplateColumnModel',
    'view/layout/TemplateColumnItemEditView'
], function(
    Marionette,
    vent, 
    TemplateColumnItemEditView,
    TemplateColumnEdit,
    TemplateColumnCollection,
    TemplateColumnModel,
    TemplateColumnItemEditView
){

    return Marionette.ItemView.extend({

        // tagName: 'li',
        

        template: function(data){
            return _.template(TemplateColumnEdit, data, {variable: 'args'});
        },

        events: {
            'click .btn-next': 'goNextStep',
            'click .btn-prev': 'goLastStep'
        },

        initialize: function(){
            _.bindAll(this, 'goNextStep', 'goLastStep');

            this.readySubmit = false;
            this.columnCollection = new TemplateColumnCollection();
            this.childViews = [];
            // _.bind(this.editImage, this);
            // console.log(this.model);
            // this.listenTo(this.options.model, 'destroy', this.destroyView);
        },

        render: function(){
            this.$el.html(this.template({}));
        },

        goNextStep: function(){
            // 
            if(this.readySubmit){
                // submit
                this.submit();
            }else{
                var columnsNum = this.$('#template_columns_num').val();
                if(columnsNum != this.childViews.length){
                    this.renderStep2(columnsNum);
                }
                this.$('#step1').removeClass('active');
                this.$('#step2').addClass('active');
                this.$('.btn-prev').attr('disabled', false);
                this.$('#step1_title').removeClass('active');
                this.$('#step2_title').addClass('active');
                this.readySubmit = true;
            }
        },

        goLastStep: function(){
            this.$('#step2').removeClass('active');
            this.$('#step1').addClass('active');
            this.$('.btn-prev').attr('disabled', true);
            this.$('#step2_title').removeClass('active');
            this.$('#step1_title').addClass('active');
            this.readySubmit = false;
        },

        renderStep2: function(num){
            // 如果列的值超过先前，就添加一个视图
            if(num > this.childViews.length){
                var addNum = num - this.childViews.length;
                for(var i = 0; i < addNum; i++){
                    var templateColumnModel = new TemplateColumnModel();
                    var templateColumnItemEditView = new TemplateColumnItemEditView({model: templateColumnModel});
                    this.$('#step2').append(templateColumnItemEditView.$el);
                    templateColumnItemEditView.render();
                    this.childViews.push(templateColumnItemEditView);
                    // this.columnCollection.add(templateColumnModel);
                }
            }else{
                var reduceNum = this.childViews.length - num;
                for(var i = 0; i < reduceNum; i++){
                    var lastChild = this.childViews.pop();
                    lastChild.close();
                }
            }

            // 渲染columnCollection的视图
            // var templateColumnCollectionView = new TemplateColumnCollectionView({collection: this.columnCollection});
            // templateColumnCollectionView.render();
            // this.$('#step2').html(templateColumnCollectionView.$el);
        },

        submit: function(){
            alert('fuck');
            // 
            for(var i = 0, length = this.childViews.length; i < length; i ++){
                var child = this.childViews[i];
                var childModel = child.model;
                childModel.set('minWidth', child.$('.min_width_option').val());
                childModel.set('canModify', child.$('.can_modify_option').val());
                childModel.set('cssCode', child.$('.css_code_option').val());
                this.columnCollection.add(childModel);
            }
            console.log(this.columnCollection);
            // sync 所有创建的列
            this.columnCollection.sync();
        },



    });
});