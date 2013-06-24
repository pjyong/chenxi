define([
    'marionette',
], function(
    Marionette
){
    return Marionette.Region.extend({

        show: function(view){

            this.ensureEl();

            // keep all child views
            this.childViews = this.childViews || [];
            if(_.indexOf(this.childViews, view) === -1){
                this.childViews.push(view);
                this.$el.append(view.el);
                view.$el.hide();
            }

            Marionette.Region.prototype.show.call(this, view);
        },

        open: function(view){
            // console.log(this.$el);
            // this.$el.empty().append(view.el);
            view.$el.show();
            // Marionette.Region.prototype.open.call(this, view);
        },

        close: function(){
            // hide all child views first
            _.each(this.childViews, function(element){
                element.$el.hide();
            });
        },

        closeAll: function(){
            _.each(this.childViews, function(element){
                element.close();
            });

            Marionette.triggerMethod.call(this, "close");

            delete this.childViews;

        },
        // show: function(viewIndex){
        // 	var view = this.childViews[viewIndex];
        // 	// console.log(view.$el);
        // 	$(this.el).append(view.$el);
        	
        // },

        // close: function(){

        // },


    });
});