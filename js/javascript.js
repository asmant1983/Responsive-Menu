(function($) {
    'use strict';

    $.fn.responsiveMenu = function(options) {
        // --- 1. CONFIGURATION ---
        const s = $.extend({
            resizeWidth: 799,
            speed: 400,
            accordionExpandAll: false
        }, options);

        const $menu = $(this);
        const $toggleBtn = $('.menu-toggle');
        const $btn = $('#menu-btn');
        
        const menuType = $menu.attr('data-menu-style');
        const isMega = menuType === 'megamenu';
        const isAccordion = menuType === 'accordion';

        // --- 2. FUNCTIONS ---

        // Show/hide submenu (Mobile & Accordion)
        const toggleItem = ($el, open) => {
            const $li = $el.parent();
            const $sub = $el.siblings('.sub-menu');
            if (!$sub.length) return;

            if (open === undefined) open = !$li.hasClass('menu-active');

            if (open) {
                if (!s.accordionExpandAll) {
                    $li.siblings('.menu-active').removeClass('menu-active').find('> .sub-menu').slideUp(s.speed);
                }
                $li.addClass('menu-active');
                $sub.slideDown(s.speed);
            } else {
                $li.removeClass('menu-active');
                $sub.slideUp(s.speed);
            }
        };

        // Update viewport state
        const updateView = () => {
            const isMobile = $(window).innerWidth() <= s.resizeWidth;
            
            if (isMobile) {
                if ($menu.attr('data-menu-style')) {
                    $menu.removeAttr('data-menu-style').addClass('collapse').hide();
                    $toggleBtn.show();
                    $btn.removeClass('open').attr('aria-expanded', 'false');
                    $menu.find('.menu-active').removeClass('menu-active').find('> .sub-menu').hide();
                }
            } else {
                if (!$menu.attr('data-menu-style')) {
                    $menu.attr('data-menu-style', menuType).removeClass('collapse').show();
                    $toggleBtn.hide();
                    $menu.find('.menu-active').removeClass('menu-active').find('> .sub-menu').hide();
                }
            }
        };

        // --- 3. EVENTS ---

        // Click logic (Mobile & Accordion)
        $menu.on('click', 'li > a', function(e) {
            if ($menu.hasClass('collapse') || isAccordion) {
                const $sub = $(this).siblings('.sub-menu');
                if ($sub.length) {
                    e.preventDefault();
                    toggleItem($(this));
                }
            }
        });

        // Hover logic (Desktop: Dropdown, Vertical, Megamenu)
        $menu.on('mouseenter mouseleave', 'li', function(e) {
            if ($menu.hasClass('collapse') || isAccordion) return;

            const $li = $(this);
            const $sub = $li.children('.sub-menu');
            const isTop = $li.parent().is($menu);
            const isEnter = e.type === 'mouseenter';

            $li.toggleClass('menu-active', isEnter);

            if ($sub.length) {
                // Megamenu fix: Only the top level receives the JS animation
                if (isMega && !isTop) return; 

                if (isEnter) {
                    const display = (isMega && isTop) ? 'flex' : 'block';
                    $sub.stop(true, true).css({ display, opacity: 0 }).animate({ opacity: 1 }, s.speed);
                } else {
                    $sub.stop(true, true).fadeOut(s.speed);
                }
            }
        });

        // Hamburger toggle
        $btn.on('click', function(e) {
            e.preventDefault();
            $menu.stop(true, true).slideToggle(s.speed);
            
            const isOpen = $(this).toggleClass('open').hasClass('open');
            $(this).attr('aria-expanded', isOpen); // Informs screen readers of the state
        });

        // Debounced resize event to improve performance
        let resizeTimer;
        $(window).on('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(updateView, 150);
        });

        // --- 4. INITIALIZATION ---
        $menu.find('ul').addClass('sub-menu');
        $menu.find('li:has(ul) > a').append('<span class="arrow"></span>');
        updateView();

        return this;
    };

    $(document).ready(() => $('#respMenu').responsiveMenu());

})(jQuery);