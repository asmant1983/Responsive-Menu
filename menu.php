<?php

/* Wordpress template integration */

echo '

<nav class="nav1" aria-label="Main navigation">
        <div class="navbar">   

        <section class="menu-toggle">

            <h3>Menu</h3> 
            
                <button id="menu-btn" class="menu-toggle-btn" aria-label="Menu openen/sluiten">';

                $count = 3;

                for ($i = 0; $i < $count; $i++) {
                echo "<span></span>";
                }

                echo '</button>
                      
        </section>
        </div>';

        if ( has_nav_menu( 'my-custom-menu' ) ) {

        /*
        Enter the menu type between the quotation marks for the data-menu-style attribute:
        'horizontal' = Horizontal dropdown (Most commonly used)
        'vertical'   = Vertical flyout menu
        'accordion'  = Accordion menu
        'megamenu'   = Megamenu (Common for e-commerce and large-scale websites)
        */

        echo '<ul id="respMenu" class="Versatile_Resp_Menu" data-menu-style="horizontal">';

        /*
        
        -- Optional -- 

        Use the Advanced Custom Fields (Pro) or Secure Custom Fields plugin
        to use the script below. This script allows admins to choose a menu 
        type in the backend and automatically appends the correct attributes 
        to the <ul id="respMenu"> tag. This pairs perfectly with the Canvas 
        JavaScript, which reacts to the dynamically placed data-menu-style 
        attribute! To create the menu choice:

        - Click on 'Add Field'
        - Under 'Field Type' choose 'Select' 
        - Under 'Field Name' enter field name of your choice (like 'menu_options')
        - Under choices enter the following label and value:
        
                horizontal - Horizontal dropdown (Most commonly used)
                vertical   - Vertical flyout menu
                accordion  - Accordion menu
                megamenu   - Megamenu (Common for e-commerce and large-scale websites)
        
        - Return Format on 'Value'

        To visualize, see the included screenshots ACF_01.png and ACF_02.png

        */

        /*
                $menu_options = get_field('menu_options', 'option');
                echo '<ul id="respMenu" class="Versatile_Resp_Menu" data-menu-style="';

                $menu_type = [        
                'horizontal',
                'vertical',
                'accordion',
                'megamenu',
                ];

                $menu_style = in_array($menu_options, $menu_type) ? $menu_options : 'horizontal';

                echo esc_attr($menu_style);

        */
                
        echo '">';        
        wp_nav_menu(
                array(
                'theme_location' => 'my-custom-menu',
                'depth' => 3,      /* One main level and two sublevels. Important note: More than three levels are unrecommended. */
                'container' => false,
                'items_wrap' => '%3$s',
                ),
        );
        echo '</ul>';
        }
echo '</nav>';
