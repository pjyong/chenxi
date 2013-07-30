define([
    'marionette',
    'vent',
    'controller/AppController',
    'view/config/WebsiteEditView',
    'model/config/WebsiteModel',
    'repository/config/WebsiteRepository'
], function(
    Marionette,
    vent,
    AppController,
    WebsiteEditView,
    WebsiteModel,
    WebsiteRepository
){
    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    return AppController.extend({

        initialize: function(){
            _.bindAll(this, 'submitWebsite');
            vent.on('websiteController:submitWebsite', this.submitWebsite);
        },

        editWebsite: function(){
            var that = this;
            // create repository
            var websiteRepository = new WebsiteRepository();
            var callback = function(website){
                var websiteEditView = new WebsiteEditView({model: website});
                that.contentRegion.show(websiteEditView);
                that.endLoading();
            };
            that.startLoading();
            $.when(websiteRepository.getWebsite()).then(callback);
        },

        submitWebsite: function(options){
            var that = this;
            var websiteRepository = new WebsiteRepository();
            // console.log('start');
            var callback = function(website){
                that.endLoading();
                $.gritter.add({
                    // (string | mandatory) the heading of the notification
                    title: '修改配置成功!',
                    // (string | mandatory) the text inside the notification
                    text: '',
                    class_name: 'gritter-success'
                });
            };
            that.startLoading();

            $.when(websiteRepository.createWebsite(options.model)).then(callback);
        },

        onClose: function(){
            vent.off('websiteController:submitWebsite');
            
        },

    });
});