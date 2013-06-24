define([
    'marionette',
    'app',  
], function(
    Marionette,
    app
){
    return Marionette.Controller.extend({
        
        constructor: function(options){
            options = options || {};

            //
            // this.headerRegion = app.headerRegion;
            // this.navRegion = app.navRegion;
            this.contentRegion = app.contentRegion;

            Marionette.Controller.prototype.constructor.call(this, options);
        },

    });
});