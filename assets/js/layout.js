
var Layout = function(){

    var sideNavBar = function(){
            $(".button-collapse.left").sideNav({
                menuWidth: 300, // Default is 240
                edge: 'left', // Choose the horizontal origin
                closeOnClick: true
            });
            $(".button-collapse.right").sideNav({
                menuWidth: 300, // Default is 240
                edge: 'right', // Choose the horizontal origin
                closeOnClick: true
            });
    };
    var dropdownMenu = function(){
            $(".dropdown-button").dropdown();
    };
    var slimScroll = function () {
        Layout.initSlimScroll('.scroller');
    };
    var isotopeGrid = function () {
        var grid = $('.grid');
        grid.isotope({
            // options
            itemSelector: '.grid-item',
            layoutMode: 'fitRows'
        });
    };
    var collapsible = function () {
        $('.collapsible').collapsible({
            accordion : false
            // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        });
    };
    var tabViews = function(){
        $('ul.tabs').tabs();

        $('ul.tabs a').on('click', function () {
            setTimeout(function () {
                Layout.initIsotopeGrid();
            },50);

        })
    };


    return{
        initSideNavBar: function () {
            sideNavBar();
        },
        initDropdownMenu: function () {
            dropdownMenu();
        },
        initSlimScroll: function (el) {
            $(el).each(function() {
                if ($(this).attr("data-initialized")) {
                    return; // exit
                }

                var height;

                if ($(this).attr("data-height")) {
                    height = $(this).attr("data-height");
                } else {
                    height = $(this).css('height');
                }

                $(this).slimScroll({
                    allowPageScroll: true, // allow page scroll when the element scroll is ended
                    size: '7px',
                    color: ($(this).attr("data-handle-color") ? $(this).attr("data-handle-color") : '#bbb'),
                    wrapperClass: ($(this).attr("data-wrapper-class") ? $(this).attr("data-wrapper-class") : 'slimScrollDiv'),
                    railColor: ($(this).attr("data-rail-color") ? $(this).attr("data-rail-color") : '#eaeaea'),
                    position : 'right',
                    height: height,
                    alwaysVisible: ($(this).attr("data-always-visible") == "1" ? true : false),
                    railVisible: ($(this).attr("data-rail-visible") == "1" ? true : false),
                    disableFadeOut: true
                });

                $(this).attr("data-initialized", "1");
            });
        },
        initIsotopeGrid:function(){
            isotopeGrid();
        },

        init: function () {
            sideNavBar();
            dropdownMenu();
            slimScroll();
            isotopeGrid();
            collapsible();
            tabViews();
        },
        initComponents: function () {
            this.initSideNavBar();
            this.initDropdownMenu();
            this.initIsotopeGrid();
        }
    }

}(jQuery);




