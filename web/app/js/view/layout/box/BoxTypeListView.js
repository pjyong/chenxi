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
        },

        render: function(){
            this.$el.html(this.template({}));
        },
    });
});