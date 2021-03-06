define([
    'marionette',
    'app',  
    'view/common/LoadingView'
], function(
    Marionette,
    app,
    LoadingView
){
    return Marionette.Controller.extend({
        
        constructor: function(options){
            options = options || {};

            //
            // this.headerRegion = app.headerRegion;
            // this.navRegion = app.navRegion;
            this.contentRegion = app.contentRegion;
            this.modalRegion = app.modalRegion;
            Marionette.Controller.prototype.constructor.call(this, options);
        },

        startLoading: function(){
            if(_.isUndefined(app.loadingView)){
                app.loadingView = new LoadingView();
            }
            app.loadingView.show();
        },

        endLoading: function(){
            app.loadingView.hide();
        },

        loadModal: function(view){
            this.modalRegion.show(view);
        },

        closeModal: function(){
            this.modalRegion.close();
        }

    });
});