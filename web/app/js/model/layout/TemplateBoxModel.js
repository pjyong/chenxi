define([
    'marionette',
], function(
    Marionette
){
    return Backbone.Model.extend({

        defaults: {
            positionId: '',
            cssCode: '',
            boxTypeId: '',
            columnTemplateId: '',
            // 区块设置所得的表单
            responseStr: ''
        },

        initialize: function(){
        },

        urlRoot: 'api/layout/templateboxes',
    });
});