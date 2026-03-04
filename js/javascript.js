(function($) {
    'use strict';

    $.fn.responsiveMenu = function(opties) {
        // --- 1. CONFIGURATIE ---
        const s = $.extend({
            resizeWidth: 799,
            speed: 400,
            accordionExpandAll: false
        }, opties);

        const $menu = $(this);
        const $toggleBtn = $('.menu-toggle');
        const $btn = $('#menu-btn');
        
        const menuType = $menu.attr('data-menu-style');
        const isMega = menuType === 'megamenu';
        const isAccordion = menuType === 'accordion';

        // --- 2. FUNCTIES ---

        // Submenu tonen/verbergen (Mobiel & Accordion)
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

        // Viewport status bijwerken
        const updateView = () => {
            const mobiel = $(window).innerWidth() <= s.resizeWidth;
            
            if (mobiel) {
                if ($menu.attr('data-menu-style')) {
                    $menu.removeAttr('data-menu-style').addClass('collapse').hide();
                    $toggleBtn.show();
                    $btn.removeClass('open');
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

        // Klik-logica (Mobiel & Accordion)
        $menu.on('click', 'li > a', function(e) {
            if ($menu.hasClass('collapse') || isAccordion) {
                const $sub = $(this).siblings('.sub-menu');
                if ($sub.length) {
                    e.preventDefault();
                    toggleItem($(this));
                }
            }
        });

        // Hover-logica (Desktop: Dropdown, Vertical, Megamenu)
        $menu.on('mouseenter mouseleave', 'li', function(e) {
            if ($menu.hasClass('collapse') || isAccordion) return;

            const $li = $(this);
            const $sub = $li.children('.sub-menu');
            const isTop = $li.parent().is($menu);
            const isEnter = e.type === 'mouseenter';

            $li.toggleClass('menu-active', isEnter);

            if ($sub.length) {
                // Megamenu fix: Alleen het bovenste niveau krijgt JS-animatie
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
            $(this).toggleClass('open');
        });

        $(window).on('resize', updateView);

        // --- 4. INIT ---
        $menu.find('ul').addClass('sub-menu');
        $menu.find('li:has(ul) > a').append('<span class="arrow"></span>');
        updateView();

        return this;
    };

    $(document).ready(() => $('#respMenu').responsiveMenu());

})(jQuery);