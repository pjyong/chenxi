define([
    'marionette',
    'collection/layout/TemplateColumnCollection'
], function(
    Marionette,
    TemplateColumnCollection
){
    return Backbone.Model.extend({
        
        defaults: {
            columns: []
        },

        url: 'api/layout/columnswrapper',

        toJSON: function(){
            // 将cid变成他的属性提交到服务器
            this.get('columns').each(function(column, key, list){
                column.set('cid', column.cid);
            });
            return this.get('columns').toJSON();
        }
    });

});