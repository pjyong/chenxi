define([
    'marionette', 
    'vent',
    'text!template/config/website/WebsiteEdit.html',
], function(
    Marionette,
    vent,
    WebsiteEdit
){

    return Marionette.ItemView.extend({


        className: 'row-fluid',

        template: function(data){
            return _.template(WebsiteEdit, data, {variable: 'args'});
        },

        events: {
            'click .submit': 'submitWebsite'
        },

        initialize: function(){
            _.bindAll(this, 'submitWebsite');
        },

        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
        },

        submitWebsite: function(){
            this.model.set('website', this.$('#website').val());
            this.model.set('title', this.$('#title').val());
            this.model.set('url', this.$('#url').val());

            vent.trigger('websiteController:submitWebsite', {model: this.model});
        }

    });
});