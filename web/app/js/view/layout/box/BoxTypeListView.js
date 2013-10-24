define([
    'marionette', 
    'vent',
    'text!template/layout/box/BoxTypeList.html',
], function(
    Marionette,
    vent,
    BoxTypeList
){

    return Marionette.ItemView.extend({

        // tagName: 'li',
        id: 'wn',
        
        template: function(data){
            return _.template(BoxTypeList, data, {variable: 'args'});
        },
        

        events: {
        },

        initialize: function(){
            var boxTypes = this.options.boxTypes;

            this.categoryArr = {};

            this.categoryArr.content = {};
            this.categoryArr.content.label = '内容';
            this.categoryArr.content.boxTypes = [];

            this.categoryArr.blog = {};
            this.categoryArr.blog.label = '博客';
            this.categoryArr.blog.boxTypes = [];

            this.categoryArr.widget = {};
            this.categoryArr.widget.label = '挂件';
            this.categoryArr.widget.boxTypes = [];

            var that = this;
            boxTypes.each(function(model){
                that.categoryArr[model.get('categoryLabel')].boxTypes.push(model.toJSON());
            });
        },

        render: function(){
            this.$el.html(this.template({categoryArr: this.categoryArr}));
        },
    });
});