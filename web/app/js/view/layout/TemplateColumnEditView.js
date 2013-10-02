define([
    'marionette', 
    'vent',
    'view/layout/TemplateColumnItemEditView',
    'text!template/layout/TemplateColumnEdit.html',
    'collection/layout/TemplateColumnCollection',
    'model/layout/TemplateColumnModel',
    'view/layout/TemplateColumnCollectionView'
], function(
    Marionette,
    vent, 
    TemplateColumnItemEditView,
    TemplateColumnEdit,
    TemplateColumnCollection,
    TemplateColumnModel,
    TemplateColumnCollectionView
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

            this.step = 1;
            this.columnCollection = new TemplateColumnCollection();
            // _.bind(this.editImage, this);
            // console.log(this.model);
            // this.listenTo(this.options.model, 'destroy', this.destroyView);
        },

        render: function(){
            this.$el.html(this.template({}));
        },

        goNextStep: function(){
            // 
            if(this.step == 1){

                var columnsNum = this.$('#template_columns_num').val();
                if(columnsNum != this.columnCollection.length){
                    this.renderStep2(columnsNum);
                }
                this.$('#step1').removeClass('active');
                this.$('#step2').addClass('active');
                this.$('.btn-prev').attr('disabled', false);
                this.$('#step1_title').removeClass('active');
                this.$('#step2_title').addClass('active');
            }
        },

        goLastStep: function(){
            this.$('#step2').removeClass('active');
            this.$('#step1').addClass('active');
            this.$('.btn-prev').attr('disabled', true);
            this.$('#step2_title').removeClass('active');
            this.$('#step1_title').addClass('active');
        },

        renderStep2: function(num){
            // 如果列的值超过先前，就添加一个视图
            if(num > this.columnCollection.length){
                var addNum = num - this.columnCollection.length;
                for(var i = 0; i < addNum; i++){
                    var templateColumnModel = new TemplateColumnModel();
                    this.columnCollection.add(templateColumnModel);
                }
            }else{
                var reduceNum = this.columnCollection.length - num;
                for(var i = 0; i < reduceNum; i++){
                    this.columnCollection.pop();
                }
            }

            // 渲染columnCollection的视图
            var templateColumnCollectionView = new TemplateColumnCollectionView({collection: this.columnCollection});
            templateColumnCollectionView.render();
            console.log(this.columnCollection);
            this.$('#step2').html(templateColumnCollectionView.$el);


        }




        // savePageTemplate: function(){
        //     // var imageName = this.$('#image_name').val();
        //     var pageTemplateName = this.$('#page_template_name').val();
        //     var contentType = this.$('#content_type_option').val();
        //     var isPrimary = this.$('.is_primary_option:checked').val() == '1' ? true : false;
        //     this.model.set('name', pageTemplateName);
        //     this.model.set('contentType', contentType);
        //     this.model.set('isPrimary', isPrimary);
        //     vent.trigger('pageTemplateController:savePageTemplate', {model: this.model});
            
        // }



    });
});