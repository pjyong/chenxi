define([
    'marionette', 
], function(
    Marionette
){

    return Marionette.ItemView.extend({

        template: function(){
            return;
        },

        events: {
            'click #sidebar-collapse': 'toggleSidebar',
            'click .nav-list': 'collapseMenu'
        },

        ui: {
            shortcut: '#sidebar-shortcuts',
            submenu: '.open > .submenu',
            collapse: '#sidebar-collapse i',
            allLi: 'li',
        },

        initialize: function(){
            _.bindAll(this, 'toggleSidebar', 'collapseMenu');
            // toggle = true, the sidebar is open
            this.toggle = true;

            // console.log(this.ui)
            this.render();

            // this.activeNav('');
        },

        toggleSidebar: function(){
            this.toggle = !this.toggle;
            this.$el.toggleClass('menu-min');
            // this.ui.shortcut.toggleClass('icon-double-angle-right');
            if(!this.toggle){
                // change the button
                this.ui.collapse.attr('class', 'icon-double-angle-right');
                this.ui.submenu.removeClass('open');
            }else{
                this.ui.collapse.attr('class', 'icon-double-angle-left');
            }
        },

        activeNav: function(args){
            // this.ui.allLi.removeClass('active');
            this.removeAll();
            var parentLi = this.$('[href="' + args.nav + '"]').closest('li');
            parentLi.addClass('active');
            
            // if the nav is sub nav
            if(parentLi.closest('ul').hasClass('submenu')){
                parentLi.parents('li').addClass('open').addClass('active');
            }
        },

        removeAll: function(){
            this.ui.allLi.removeClass('open').removeClass('active');
        },

        collapseMenu: function(e){
            if(!this.toggle){return;}
            var c = $(e.target).closest(".dropdown-toggle");
            if (c && c.length > 0) {
                var b = c.next().get(0);
                if (!$(b).is(":visible")) {
                    this.ui.submenu.each(function () {
                            if (this != b && !$(this.parentNode).hasClass("active")) {
                                $(this).slideUp(200).parent().removeClass("open");
                            }
                        })
                }
                $(b).slideToggle(200).parent().toggleClass("open");
                return false;
            }
        },

        _collapseMenu: function(target){


        },

    });
});