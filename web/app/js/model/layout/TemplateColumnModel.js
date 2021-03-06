define([
    'marionette',
], function(
    Marionette
){
    var templateColumnModel = Backbone.Model.extend({
        defaults: {
            pageTemplateId: 0,
            pagePartId: '',
            columnPartId: '',
            parentColumnId: '',
            isLiquid: false,
            canModify: false,
            minWidth: 0,
            maxWidth: 0,
            cssCode: '',
            widthPercent: '100%'
        },


        initialize: function(){
        },

        urlRoot: function(){
            var pageTemplateId = this.get('pageTemplateId');
            
            return 'api/layout/tempates/' + pageTemplateId + '/columns';
        },
    });

    return templateColumnModel;
});